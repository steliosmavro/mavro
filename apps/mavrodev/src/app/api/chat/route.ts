import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { personalInfo, projects, experience, skills } from '@repo/data';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { GoogleCalendarService } from '@/lib/google-calendar';

const systemPrompt = `You are an AI assistant representing ${personalInfo.name}, a ${personalInfo.title}. You help visitors learn about ${personalInfo.name.split(' ')[0]}'s experience and schedule meetings with him. Be friendly, professional, and helpful.

IMPORTANT: Today's date is ${new Date().toISOString().split('T')[0]} (${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}).

About me:
- Stelios is based in ${personalInfo.location}
- He's a ${personalInfo.title} with deep expertise in AI integrations and developer tools
- Email: ${personalInfo.email}
- GitHub: ${personalInfo.github}
- LinkedIn: ${personalInfo.linkedin}

Important context about my experience:
- While my professional experience shows from 2020, I've worked double shifts and countless side projects
- I have significantly more hands-on coding hours than typical mid-senior developers
- I position myself as a Senior developer based on my actual experience and capabilities
- I've successfully built and sold products, contributed to major open-source projects, and worked with cutting-edge tech

I have:
- ${projects.length} notable projects showcasing AI integrations, developer tools, and open-source contributions
- ${experience.length} professional experiences at companies like MicroPump, InstaShop, and Mind Alliance
- ${skills.flatMap((s) => s.items).length} technical skills across ${skills.length} categories
- Proven track record of building production systems serving thousands of users

Meeting availability:
- I'm available for meetings Monday through Saturday, 8 AM to 8 PM Athens time (Europe/Athens)
- You can check my calendar availability and schedule meetings directly through this chat
- All meetings include a Google Meet link

Guidelines:
- When discussing Stelios's work, speak clearly about his accomplishments ("Stelios built...", "He worked on...", "His experience includes...")
- Be confident about Stelios's Senior-level expertise
- Share specific examples from his projects when relevant
- Be enthusiastic about AI, developer tools, and open source
- If asked about opportunities, mention Stelios is open to discussing interesting projects
- IMPORTANT: Throughout the conversation, keep track of whether the user has provided their name and email. Don't assume you have this information unless it was explicitly provided in the current conversation
- When someone wants to schedule a meeting, use the calendar tools to check availability and book it
- For calendar operations: always use YYYY-MM-DD format for dates (e.g., tomorrow would be ${new Date(Date.now() + 86400000).toISOString().split('T')[0]})
- When someone asks about availability without specifying a date, assume they mean tomorrow or the next few days and use checkCalendarAvailability
- When someone mentions scheduling or availability, ALWAYS use the calendar tools (checkCalendarAvailability or scheduleMeeting), NOT scheduleContact
- CRITICAL SCHEDULING RULE: When someone asks to schedule a meeting at a specific time (e.g., "schedule a meeting for tomorrow 12:00"), you MUST:
  1. First check if you have their name and email from the conversation
  2. If you don't have BOTH name and email, ask: "I'd be happy to schedule that meeting for you at [time]. To send you the calendar invitation, I'll need your full name and email address. Could you please provide those?"
  3. NEVER attempt to call scheduleMeeting without both name and email
  4. Once you have both, then call scheduleMeeting with all required parameters
- When scheduling meetings, you MUST get the person's name and email BEFORE attempting to book. Never use placeholder values like "user@example.com"
- If someone tries to schedule without providing their name and email, politely ask for these details first
- Keep responses conversational but professional`;

// Create a singleton calendar service
let calendarService: GoogleCalendarService | null = null;

function getCalendarService() {
    if (!calendarService) {
        calendarService = new GoogleCalendarService();
    }
    return calendarService;
}

export async function POST(req: Request) {
    try {
        // Get IP address for rate limiting
        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

        // Check rate limit (10 requests per minute)
        const rateLimitKey = `chat:${ip}`;
        const allowed = rateLimit(rateLimitKey, 10, 60000);
        const rateLimitHeaders = getRateLimitHeaders(rateLimitKey, 10, 60000);

        if (!allowed) {
            return Response.json(
                {
                    success: false,
                    error: {
                        code: 'RATE_LIMIT_EXCEEDED',
                        message: 'Too many requests. Please try again later.',
                    },
                },
                { status: 429, headers: rateLimitHeaders },
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return Response.json(
                {
                    success: false,
                    error: {
                        code: 'CONFIG_ERROR',
                        message:
                            'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.',
                    },
                },
                { status: 500, headers: rateLimitHeaders },
            );
        }

        const { messages } = await req.json();

        const result = streamText({
            model: openai('gpt-3.5-turbo'),
            system: systemPrompt,
            messages,
            tools: {
                getProjects: tool({
                    description:
                        'Get information about projects, optionally filtered by tags',
                    parameters: z.object({
                        tags: z
                            .array(z.string())
                            .optional()
                            .describe(
                                'Filter projects by tags like "ai", "open-source", "developer-tools"',
                            ),
                        limit: z
                            .number()
                            .optional()
                            .default(3)
                            .describe('Number of projects to return'),
                    }),
                    execute: async ({ tags, limit }) => {
                        let filtered = projects;

                        if (tags && tags.length > 0) {
                            filtered = projects.filter((project) => {
                                // Filter by primary and secondary tech
                                const techStack = [
                                    ...(project.primaryTech || []),
                                    ...(project.secondaryTech || []),
                                ];
                                return tags.some((tag) =>
                                    techStack.some((tech) =>
                                        tech
                                            .toLowerCase()
                                            .includes(tag.toLowerCase()),
                                    ),
                                );
                            });
                        }

                        return filtered.slice(0, limit).map((project) => ({
                            name: project.name,
                            description: project.description,
                            primaryTech: project.primaryTech,
                            secondaryTech: project.secondaryTech,
                            highlights: project.highlights,
                            live: project.live,
                            github: project.github,
                            period: project.period,
                        }));
                    },
                }),
                getExperience: tool({
                    description: 'Get work experience information',
                    parameters: z.object({
                        company: z
                            .string()
                            .optional()
                            .describe('Filter by company name'),
                    }),
                    execute: async ({ company }) => {
                        if (company) {
                            const exp = experience.find((e) =>
                                e.company
                                    .toLowerCase()
                                    .includes(company.toLowerCase()),
                            );
                            return exp ? [exp] : [];
                        }
                        return experience.map((exp) => ({
                            role: exp.role,
                            company: exp.company,
                            period: exp.period,
                            description: exp.description,
                            projects: exp.projects,
                            technologies: exp.technologies,
                        }));
                    },
                }),
                getSkills: tool({
                    description: 'Get skills by category',
                    parameters: z.object({
                        category: z
                            .string()
                            .optional()
                            .describe(
                                'Category like "frontend", "backend", "ai", etc.',
                            ),
                    }),
                    execute: async ({ category }) => {
                        if (category) {
                            const skillCategory = skills.find((s) =>
                                s.category
                                    .toLowerCase()
                                    .includes(category.toLowerCase()),
                            );
                            return skillCategory ? skillCategory.items : [];
                        }
                        return skills.map((s) => ({
                            category: s.category,
                            skills: s.items,
                        }));
                    },
                }),
                checkCalendarAvailability: tool({
                    description:
                        'Check my calendar availability for a specific date. Use this when someone asks about availability, free time, or when I can meet. Always use YYYY-MM-DD format.',
                    parameters: z.object({
                        date: z.string().describe('Date in YYYY-MM-DD format'),
                        durationMinutes: z
                            .number()
                            .optional()
                            .default(30)
                            .describe('Meeting duration in minutes'),
                    }),
                    execute: async ({ date, durationMinutes }) => {
                        try {
                            console.log('Checking calendar for date:', date);
                            const calendar = getCalendarService();
                            const slots = await calendar.getAvailableSlots(
                                date,
                                durationMinutes,
                            );

                            if (slots.length === 0) {
                                return {
                                    available: false,
                                    message: `I don't have any available ${durationMinutes}-minute slots on ${date}. Would you like to check another date?`,
                                };
                            }

                            return {
                                available: true,
                                date,
                                slots,
                                message: `I have ${slots.length} available ${durationMinutes}-minute slots on ${date}. Available times: ${slots.slice(0, 5).join(', ')}${slots.length > 5 ? ', and more' : ''}. Which time works best for you?`,
                            };
                        } catch (error) {
                            console.error('Calendar check error:', error);
                            return {
                                error: true,
                                message: `Sorry, I had trouble checking my calendar. Please try again or email me directly at ${personalInfo.email}`,
                            };
                        }
                    },
                }),
                scheduleMeeting: tool({
                    description: 'Schedule a meeting on my calendar',
                    parameters: z.object({
                        name: z
                            .string()
                            .min(2, 'Name must be at least 2 characters')
                            .describe("The person's full name"),
                        email: z
                            .string()
                            .email('Must be a valid email address')
                            .refine(
                                (email) => !email.includes('example.com'),
                                'Please provide a real email address',
                            )
                            .describe(
                                "The person's email address for calendar invitation",
                            ),
                        date: z.string().describe('Date in YYYY-MM-DD format'),
                        time: z
                            .string()
                            .describe('Time in HH:MM format (24-hour)'),
                        durationMinutes: z
                            .number()
                            .optional()
                            .default(30)
                            .describe('Meeting duration in minutes'),
                        description: z
                            .string()
                            .optional()
                            .describe('What would you like to discuss?'),
                    }),
                    execute: async ({
                        name,
                        email,
                        date,
                        time,
                        durationMinutes,
                        description,
                    }) => {
                        try {
                            // Extra validation to ensure we never use placeholder values
                            if (
                                !name ||
                                name.length < 2 ||
                                email.includes('example.com')
                            ) {
                                return {
                                    success: false,
                                    message:
                                        'I need your full name and email address to schedule the meeting. Could you please provide those details?',
                                };
                            }

                            const calendar = getCalendarService();
                            const result = await calendar.scheduleMeeting({
                                name,
                                email,
                                date,
                                time,
                                durationMinutes,
                                description,
                            });

                            return {
                                success: true,
                                message: `Perfect! I've scheduled our ${durationMinutes}-minute meeting for ${date} at ${time} Athens time. You'll receive a calendar invitation at ${email} with a Google Meet link. Looking forward to our conversation!`,
                                details: {
                                    meetLink: result.meetLink,
                                    calendarLink: result.htmlLink,
                                },
                            };
                        } catch (error) {
                            console.error('Scheduling error:', error);

                            // Check if it's a time conflict error
                            if (
                                error instanceof Error &&
                                error.message.includes('already booked')
                            ) {
                                return {
                                    success: false,
                                    message: `I'm sorry, but I already have a meeting scheduled at ${time} on ${date}. Would you like to check my availability for that day and pick a different time?`,
                                };
                            }

                            return {
                                success: false,
                                message: `I couldn't schedule the meeting automatically. Please email me at ${personalInfo.email} and we'll coordinate a time that works for both of us.`,
                            };
                        }
                    },
                }),
                scheduleContact: tool({
                    description:
                        'ONLY use this for general contact information requests, NOT for scheduling meetings or checking availability',
                    parameters: z.object({
                        purpose: z
                            .string()
                            .describe(
                                'Purpose of contact like "interview", "collaboration", "project discussion"',
                            ),
                    }),
                    execute: async ({ purpose }) => {
                        return {
                            email: personalInfo.email,
                            message: `Feel free to reach out at ${personalInfo.email} for ${purpose}. You can also connect on LinkedIn at ${personalInfo.linkedin}`,
                            calendlyHint:
                                'For scheduling calls, mention your interest in a brief email and we can coordinate timing.',
                        };
                    },
                }),
            },
            maxSteps: 5,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        return Response.json(
            {
                success: false,
                error: {
                    code: 'CHAT_ERROR',
                    message: 'Failed to process chat request',
                },
            },
            { status: 500 },
        );
    }
}
