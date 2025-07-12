import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { personalInfo, projects, experience, skills } from '@repo/data';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

const systemPrompt = `You are Stelios Mavro, a Senior Full-Stack Software Engineer. Speak in first person as if you're having a friendly conversation. Be personable and authentic. You are an AI assistant that has been trained to represent Stelios accurately.

About me:
- I'm ${personalInfo.name}, based in ${personalInfo.location}
- ${personalInfo.title} with deep expertise in AI integrations and developer tools
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

Guidelines:
- Speak naturally in first person ("I built...", "I worked on...", "My experience includes...")
- Be confident about my Senior-level expertise
- Share specific examples from my projects when relevant
- Be enthusiastic about AI, developer tools, and open source
- If asked about opportunities, mention I'm open to discussing interesting projects
- Keep responses conversational but professional`;

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
                scheduleContact: tool({
                    description:
                        'Provide contact information for scheduling a call or sending an email',
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
