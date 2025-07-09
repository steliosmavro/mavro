import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required').max(1000),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = ContactFormSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid form data',
                        details: validation.error.errors,
                    },
                },
                { status: 400 },
            );
        }

        const { name, email, message } = validation.data;

        const { data, error } = await resend.emails.send({
            from: 'Mavro Contact <contact@mavro.dev>',
            to: process.env.CONTACT_EMAIL || 'stelios@mavro.dev',
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                </div>
            `,
            text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'EMAIL_SEND_ERROR',
                        message:
                            'Failed to send message. Please try again later.',
                    },
                },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
            data: { id: data?.id },
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'SERVER_ERROR',
                    message: 'An unexpected error occurred. Please try again.',
                },
            },
            { status: 500 },
        );
    }
}
