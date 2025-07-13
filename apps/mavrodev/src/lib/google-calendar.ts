import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { format, parse, addMinutes, setHours, setMinutes } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { personalInfo } from '@repo/data';

// const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TIMEZONE = process.env.TIMEZONE || 'Europe/Athens';
const WORKING_HOURS = {
    start: parseInt(process.env.WORKING_HOURS_START || '8', 10),
    end: parseInt(process.env.WORKING_HOURS_END || '20', 10),
};

export class GoogleCalendarService {
    private auth: OAuth2Client | null = null;

    constructor() {
        // Check for required environment variables
        const required = [
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'GOOGLE_REFRESH_TOKEN',
        ];

        const missing = required.filter((key) => !process.env[key]);
        if (missing.length > 0) {
            throw new Error(
                `Missing required environment variables: ${missing.join(', ')}`,
            );
        }
    }

    async getAvailableSlots(
        date: string,
        durationMinutes: number = 30,
    ): Promise<string[]> {
        const auth = await this.authorize();
        const calendar = google.calendar({ version: 'v3', auth });

        // Parse the date and set to Athens timezone
        const startOfDay = parse(date, 'yyyy-MM-dd', new Date());
        const athensDate = toZonedTime(startOfDay, TIMEZONE);

        // Set working hours in Athens time
        const workStart = setHours(
            setMinutes(athensDate, 0),
            WORKING_HOURS.start,
        );
        const workEnd = setHours(setMinutes(athensDate, 0), WORKING_HOURS.end);

        // Convert to UTC for API calls
        const startTimeUTC = fromZonedTime(workStart, TIMEZONE);
        const endTimeUTC = fromZonedTime(workEnd, TIMEZONE);

        // Get busy times
        const freeBusyResponse = await calendar.freebusy.query({
            requestBody: {
                timeMin: startTimeUTC.toISOString(),
                timeMax: endTimeUTC.toISOString(),
                items: [{ id: 'primary' }],
                timeZone: TIMEZONE,
            },
        });

        // Generate all possible slots
        const availableSlots: string[] = [];
        const busySlots = freeBusyResponse.data.calendars?.primary?.busy || [];
        const slotInterval = 30; // 30-minute slots

        let currentSlot = new Date(workStart);

        while (currentSlot < workEnd) {
            const slotEnd = addMinutes(currentSlot, durationMinutes);

            // Check if slot end exceeds working hours
            if (slotEnd > workEnd) break;

            // Check if slot conflicts with busy times
            const isAvailable = !busySlots.some((busy) => {
                if (!busy.start || !busy.end) return false;

                const busyStart = new Date(busy.start);
                const busyEnd = new Date(busy.end);

                // Convert busy times to Athens timezone for comparison
                const busyStartAthens = toZonedTime(busyStart, TIMEZONE);
                const busyEndAthens = toZonedTime(busyEnd, TIMEZONE);

                // Check for overlap
                return (
                    (currentSlot >= busyStartAthens &&
                        currentSlot < busyEndAthens) ||
                    (slotEnd > busyStartAthens && slotEnd <= busyEndAthens) ||
                    (currentSlot <= busyStartAthens && slotEnd >= busyEndAthens)
                );
            });

            if (isAvailable) {
                availableSlots.push(format(currentSlot, 'HH:mm'));
            }

            currentSlot = addMinutes(currentSlot, slotInterval);
        }

        return availableSlots;
    }

    async scheduleMeeting(details: {
        name: string;
        email: string;
        date: string;
        time: string;
        durationMinutes: number;
        description?: string;
    }) {
        const auth = await this.authorize();
        const calendar = google.calendar({ version: 'v3', auth });

        // Parse date and time
        const meetingDate = parse(details.date, 'yyyy-MM-dd', new Date());
        const timeParts = details.time.split(':');
        const hours = parseInt(timeParts[0] || '0', 10);
        const minutes = parseInt(timeParts[1] || '0', 10);

        // Create start time in Athens timezone
        const startTimeAthens = setHours(
            setMinutes(meetingDate, minutes),
            hours,
        );
        const endTimeAthens = addMinutes(
            startTimeAthens,
            details.durationMinutes,
        );

        // Check if the time slot is available
        const startTimeUTC = fromZonedTime(startTimeAthens, TIMEZONE);
        const endTimeUTC = fromZonedTime(endTimeAthens, TIMEZONE);

        const freeBusyResponse = await calendar.freebusy.query({
            requestBody: {
                timeMin: startTimeUTC.toISOString(),
                timeMax: endTimeUTC.toISOString(),
                items: [{ id: 'primary' }],
                timeZone: TIMEZONE,
            },
        });

        const busySlots = freeBusyResponse.data.calendars?.primary?.busy || [];

        // Check if there's a conflict
        const hasConflict = busySlots.some((busy) => {
            if (!busy.start || !busy.end) return false;

            const busyStart = new Date(busy.start);
            const busyEnd = new Date(busy.end);

            // Check for any overlap
            return (
                (startTimeUTC >= busyStart && startTimeUTC < busyEnd) ||
                (endTimeUTC > busyStart && endTimeUTC <= busyEnd) ||
                (startTimeUTC <= busyStart && endTimeUTC >= busyEnd)
            );
        });

        if (hasConflict) {
            throw new Error(
                `Time slot ${details.time} on ${details.date} is already booked`,
            );
        }

        // Times are already converted above during availability check

        // Create the event
        const event = {
            summary: `${details.name} / ${personalInfo.name}`,
            description:
                details.description ||
                `Meeting scheduled via mavro.dev AI assistant`,
            start: {
                dateTime: startTimeUTC.toISOString(),
                timeZone: TIMEZONE,
            },
            end: {
                dateTime: endTimeUTC.toISOString(),
                timeZone: TIMEZONE,
            },
            attendees: [
                { email: details.email, responseStatus: 'needsAction' },
            ],
            conferenceData: {
                createRequest: {
                    requestId: `mavro-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 }, // 30 minutes before
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
            sendUpdates: 'all', // Send invitations to attendees
        });

        return {
            eventId: response.data.id,
            htmlLink: response.data.htmlLink,
            meetLink: response.data.hangoutLink,
            startTime: format(startTimeAthens, 'HH:mm'),
            date: details.date,
        };
    }

    private async authorize(): Promise<OAuth2Client> {
        if (this.auth) return this.auth;

        // Create OAuth2 client from environment variables
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:3000/callback', // Must match the OAuth client redirect URI
        );

        // Set the refresh token to get new access tokens automatically
        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        this.auth = oauth2Client;
        return oauth2Client;
    }
}
