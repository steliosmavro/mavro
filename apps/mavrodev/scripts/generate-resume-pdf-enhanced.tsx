import React from 'react';
import ReactPDF, {
    Document,
    Page,
    Text,
    View,
    Link,
    StyleSheet,
} from '@react-pdf/renderer';
import { resumeData } from '@repo/data';
import type {
    Project,
    Experience,
    ExperienceProject,
    SkillData,
    ResumeMode,
    HighlightGroup,
    Skill,
    EnhancedSkill,
} from '@repo/data';
import * as fs from 'fs';
import * as path from 'path';

// Type guards
const isHighlightGroup = (
    highlights: string[] | HighlightGroup,
): highlights is HighlightGroup => {
    return (
        highlights && typeof highlights === 'object' && 'primary' in highlights
    );
};

const isEnhancedSkill = (skill: SkillData): skill is EnhancedSkill => {
    return 'primary' in skill;
};

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        fontSize: 10,
        marginBottom: 10,
    },
    contactItem: {
        marginRight: 15,
    },
    link: {
        color: '#0000ee',
        textDecoration: 'none',
    },
    metricsBar: {
        flexDirection: 'row',
        borderTop: 1,
        borderBottom: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
        marginBottom: 15,
    },
    metric: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
    },
    metricValue: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    metricLabel: {
        color: '#666',
        fontSize: 9,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        borderBottom: 1,
        borderColor: '#eee',
        paddingBottom: 5,
    },
    summaryText: {
        fontSize: 11,
        lineHeight: 1.5,
        color: '#333',
    },
    experienceItem: {
        marginBottom: 15,
    },
    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    experienceTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    experienceCompany: {
        fontSize: 11,
        color: '#666',
    },
    experiencePeriod: {
        fontSize: 10,
        color: '#666',
    },
    impactStatement: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 5,
        color: '#444',
    },
    highlight: {
        fontSize: 10,
        marginBottom: 3,
        paddingLeft: 10,
    },
    techStack: {
        fontSize: 9,
        color: '#666',
        marginTop: 5,
    },
    projectGroup: {
        marginBottom: 15,
    },
    projectGroupTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    projectItem: {
        marginBottom: 12,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    projectMetric: {
        fontSize: 10,
        color: '#666',
        fontWeight: 'bold',
    },
    projectDescription: {
        fontSize: 10,
        marginBottom: 3,
        color: '#444',
    },
    skillsRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 120,
    },
    skillItems: {
        fontSize: 10,
        flex: 1,
    },
    educationItem: {
        marginBottom: 8,
    },
    educationDegree: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    educationDetails: {
        fontSize: 10,
        color: '#666',
    },
    experienceDescription: {
        fontSize: 10,
        marginBottom: 5,
        color: '#333',
    },
});

// Helper functions
const formatPeriod = (
    period: { start: Date; end?: Date },
    current?: boolean,
) => {
    const options = { year: 'numeric', month: 'short' };
    const start = period.start.toLocaleDateString('en-US', options as any);

    if (current) {
        return `${start} - Present`;
    }

    if (period.end) {
        const end = period.end.toLocaleDateString('en-US', options as any);
        return `${start} - ${end}`;
    }

    return `${start} - Present`;
};

const calculateMetrics = () => {
    const startYear = resumeData.summary.startYear;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;

    // Calculate total users from projects
    const totalUsers = resumeData.projects.reduce((sum, project) => {
        if (
            project.metrics?.users &&
            typeof project.metrics.users === 'string'
        ) {
            const userMatch = project.metrics.users.match(/(\d+\.?\d*)K?\+?/);
            if (userMatch && userMatch[1]) {
                const num = parseFloat(userMatch[1]);
                return (
                    sum +
                    (project.metrics.users.includes('K') ? num * 1000 : num)
                );
            }
        }
        return sum;
    }, 0);

    // Count projects
    const projectCount = resumeData.projects.length;

    // Count open source contributions
    const openSourcePRs = 10; // Conservative estimate based on actual contributions

    return {
        years,
        usersImpacted:
            totalUsers >= 1000
                ? `${(totalUsers / 1000).toFixed(1)}K+`
                : `${totalUsers}+`,
        projectsDelivered: projectCount,
        openSourcePRs,
    };
};

const getContentLimits = (mode: ResumeMode) => {
    const limits = {
        concise: {
            experiences: 3,
            projects: 4,
            highlightsPerItem: 2,
            skillsPerCategory: 5,
            projectsPerGroup: 2,
        },
        standard: {
            experiences: 5,
            projects: 6,
            highlightsPerItem: 4,
            skillsPerCategory: 8,
            projectsPerGroup: 3,
        },
        comprehensive: {
            experiences: Infinity,
            projects: Infinity,
            highlightsPerItem: Infinity,
            skillsPerCategory: Infinity,
            projectsPerGroup: Infinity,
        },
    };

    return limits[mode];
};

const getHighlights = (
    highlights: string[] | HighlightGroup,
    limit: number,
    mode: ResumeMode,
): string[] => {
    if (isHighlightGroup(highlights)) {
        const primary = highlights.primary.slice(
            0,
            Math.min(limit, highlights.primary.length),
        );
        const remaining = limit - primary.length;

        if (remaining > 0 && highlights.secondary && mode !== 'concise') {
            return [...primary, ...highlights.secondary.slice(0, remaining)];
        }

        return primary;
    }

    return highlights.slice(0, limit);
};

const groupProjectsByImpact = (projects: Project[]) => {
    const groups = {
        exits: [] as Project[],
        openSource: [] as Project[],
        technical: [] as Project[],
    };

    projects.forEach((project) => {
        if (project.acquired) {
            groups.exits.push(project);
        } else if (
            project.type === 'open-source' ||
            project.categories.includes('open-source')
        ) {
            groups.openSource.push(project);
        } else {
            groups.technical.push(project);
        }
    });

    return groups;
};

// Components
const MetricsBar = ({
    metrics,
}: {
    metrics: ReturnType<typeof calculateMetrics>;
}) => (
    <View style={styles.metricsBar}>
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.years}+</Text>
            <Text style={styles.metricLabel}>Years</Text>
        </View>
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.usersImpacted}</Text>
            <Text style={styles.metricLabel}>Users</Text>
        </View>
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.projectsDelivered}+</Text>
            <Text style={styles.metricLabel}>Projects</Text>
        </View>
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.openSourcePRs}+</Text>
            <Text style={styles.metricLabel}>OS PRs</Text>
        </View>
    </View>
);

const ResumePDF = ({ mode = 'standard' }: { mode?: ResumeMode }) => {
    const limits = getContentLimits(mode);
    const metrics = calculateMetrics();

    // Get limited experiences
    const experiences = resumeData.experience.slice(0, limits.experiences);

    // Get and group projects
    const featuredProjects = resumeData.projects.filter((p) => p.featured);
    const projectGroups = groupProjectsByImpact(featuredProjects);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{resumeData.personal.name}</Text>
                    <Text style={styles.title}>
                        {resumeData.personal.title}
                    </Text>
                    <View style={styles.contactRow}>
                        <Text style={styles.contactItem}>
                            {resumeData.personal.location}
                        </Text>
                        <Link
                            style={[styles.contactItem, styles.link]}
                            src={`mailto:${resumeData.personal.email}`}
                        >
                            {resumeData.personal.email}
                        </Link>
                        <Link
                            style={[styles.contactItem, styles.link]}
                            src={resumeData.personal.github}
                        >
                            GitHub
                        </Link>
                        <Link
                            style={[styles.contactItem, styles.link]}
                            src={resumeData.personal.linkedin}
                        >
                            LinkedIn
                        </Link>
                        {mode !== 'concise' && (
                            <Link
                                style={[styles.contactItem, styles.link]}
                                src={resumeData.personal.website}
                            >
                                mavro.dev
                            </Link>
                        )}
                    </View>
                </View>

                {/* Metrics Bar */}
                <MetricsBar metrics={metrics} />

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Professional Summary
                    </Text>
                    <Text style={styles.summaryText}>
                        {resumeData.summary.bio}
                        {mode !== 'concise' &&
                            ` ${resumeData.summary.bioExtension}`}
                        {mode === 'comprehensive' &&
                            ` ${resumeData.summary.availability}`}
                    </Text>
                </View>

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {experiences.map((exp: Experience, index: number) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.experienceHeader}>
                                <View>
                                    <Text style={styles.experienceTitle}>
                                        {exp.role}
                                    </Text>
                                    <Text style={styles.experienceCompany}>
                                        {exp.company}{' '}
                                        {exp.location && `• ${exp.location}`}
                                    </Text>
                                </View>
                                <Text style={styles.experiencePeriod}>
                                    {formatPeriod(exp.period, exp.current)}
                                </Text>
                            </View>
                            {exp.roleImpact && (
                                <Text style={styles.impactStatement}>
                                    {exp.roleImpact}
                                </Text>
                            )}
                            <Text style={styles.experienceDescription}>
                                {exp.description}
                            </Text>

                            {/* Show key project highlights */}
                            {exp.projects
                                .slice(0, mode === 'concise' ? 1 : 2)
                                .map((project, pIndex) => (
                                    <View key={pIndex}>
                                        {mode !== 'concise' && (
                                            <Text style={styles.projectTitle}>
                                                {project.name}
                                            </Text>
                                        )}
                                        {getHighlights(
                                            project.highlights,
                                            limits.highlightsPerItem,
                                            mode,
                                        ).map((highlight, hIndex) => (
                                            <Text
                                                key={hIndex}
                                                style={styles.highlight}
                                            >
                                                • {highlight}
                                            </Text>
                                        ))}
                                    </View>
                                ))}

                            {mode !== 'concise' && exp.technologies.backend && (
                                <Text style={styles.techStack}>
                                    Tech:{' '}
                                    {[
                                        ...(
                                            exp.technologies.backend || []
                                        ).slice(0, 3),
                                        ...(
                                            exp.technologies.frontend || []
                                        ).slice(0, 2),
                                        ...(
                                            exp.technologies.databases || []
                                        ).slice(0, 1),
                                    ].join(', ')}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Projects</Text>

                    {/* Group: Successful Exits */}
                    {projectGroups.exits.length > 0 && (
                        <View style={styles.projectGroup}>
                            <Text style={styles.projectGroupTitle}>
                                Successful Exits
                            </Text>
                            {projectGroups.exits
                                .slice(0, limits.projectsPerGroup)
                                .map((project, index) => (
                                    <View
                                        key={index}
                                        style={styles.projectItem}
                                    >
                                        <View style={styles.projectHeader}>
                                            <Text style={styles.projectTitle}>
                                                {project.name}
                                            </Text>
                                            {project.metrics?.users && (
                                                <Text
                                                    style={styles.projectMetric}
                                                >
                                                    {project.metrics.users}{' '}
                                                    users
                                                </Text>
                                            )}
                                        </View>
                                        <Text style={styles.projectDescription}>
                                            {project.description}
                                        </Text>
                                        {project.acquired && (
                                            <Text
                                                style={
                                                    styles.projectDescription
                                                }
                                            >
                                                Acquired by{' '}
                                                {project.acquired.by}
                                            </Text>
                                        )}
                                        {getHighlights(
                                            project.highlights,
                                            limits.highlightsPerItem,
                                            mode,
                                        ).map((highlight, hIndex) => (
                                            <Text
                                                key={hIndex}
                                                style={styles.highlight}
                                            >
                                                • {highlight}
                                            </Text>
                                        ))}
                                        {mode !== 'concise' && (
                                            <Text style={styles.techStack}>
                                                Stack:{' '}
                                                {project.primaryTech
                                                    .slice(0, 4)
                                                    .join(', ')}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                        </View>
                    )}

                    {/* Group: Open Source Impact */}
                    {projectGroups.openSource.length > 0 && (
                        <View style={styles.projectGroup}>
                            <Text style={styles.projectGroupTitle}>
                                Open Source Impact
                            </Text>
                            {projectGroups.openSource
                                .slice(0, limits.projectsPerGroup)
                                .map((project, index) => (
                                    <View
                                        key={index}
                                        style={styles.projectItem}
                                    >
                                        <View style={styles.projectHeader}>
                                            <Text style={styles.projectTitle}>
                                                {project.name}
                                            </Text>
                                            {project.impact && (
                                                <Text
                                                    style={styles.projectMetric}
                                                >
                                                    {project.impact}
                                                </Text>
                                            )}
                                        </View>
                                        <Text style={styles.projectDescription}>
                                            {project.description}
                                        </Text>
                                        {getHighlights(
                                            project.highlights,
                                            limits.highlightsPerItem,
                                            mode,
                                        ).map((highlight, hIndex) => (
                                            <Text
                                                key={hIndex}
                                                style={styles.highlight}
                                            >
                                                • {highlight}
                                            </Text>
                                        ))}
                                        {mode !== 'concise' && (
                                            <Text style={styles.techStack}>
                                                Stack:{' '}
                                                {project.primaryTech
                                                    .slice(0, 4)
                                                    .join(', ')}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                        </View>
                    )}

                    {/* Group: Technical Excellence */}
                    {mode !== 'concise' &&
                        projectGroups.technical.length > 0 && (
                            <View style={styles.projectGroup}>
                                <Text style={styles.projectGroupTitle}>
                                    Technical Excellence
                                </Text>
                                {projectGroups.technical
                                    .slice(0, limits.projectsPerGroup)
                                    .map((project, index) => (
                                        <View
                                            key={index}
                                            style={styles.projectItem}
                                        >
                                            <Text style={styles.projectTitle}>
                                                {project.name}
                                            </Text>
                                            <Text
                                                style={
                                                    styles.projectDescription
                                                }
                                            >
                                                {project.description}
                                            </Text>
                                            {getHighlights(
                                                project.highlights,
                                                2,
                                                mode,
                                            ).map((highlight, hIndex) => (
                                                <Text
                                                    key={hIndex}
                                                    style={styles.highlight}
                                                >
                                                    • {highlight}
                                                </Text>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        )}
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    {resumeData.skills.map((skill, index) => {
                        let items: string[] = [];

                        if (isEnhancedSkill(skill)) {
                            items =
                                mode === 'concise'
                                    ? skill.primary.slice(
                                          0,
                                          limits.skillsPerCategory,
                                      )
                                    : [
                                          ...skill.primary,
                                          ...(skill.secondary || []),
                                      ].slice(0, limits.skillsPerCategory);
                        } else {
                            items = skill.items.slice(
                                0,
                                limits.skillsPerCategory,
                            );
                        }

                        return (
                            <View key={index} style={styles.skillsRow}>
                                <Text style={styles.skillCategory}>
                                    {skill.category}:
                                </Text>
                                <Text style={styles.skillItems}>
                                    {items.join(', ')}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Education */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {resumeData.education.map((edu, index) => (
                        <View key={index} style={styles.educationItem}>
                            <Text style={styles.educationDegree}>
                                {edu.degree}
                            </Text>
                            <Text style={styles.educationDetails}>
                                {edu.period} • {edu.grade}
                            </Text>
                            {mode !== 'concise' && (
                                <Text style={styles.educationDetails}>
                                    {edu.description}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

const generatePDF = async (mode: ResumeMode = 'standard') => {
    try {
        console.log(`🚀 Generating ${mode} resume PDF...`);

        const pdfStream = await ReactPDF.renderToStream(
            <ResumePDF mode={mode} />,
        );
        const outputPath = path.join(
            __dirname,
            '..',
            'public',
            `resume-${mode}.pdf`,
        );

        const writeStream = fs.createWriteStream(outputPath);
        pdfStream.pipe(writeStream);

        await new Promise<void>((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        console.log(`✅ ${mode} resume PDF generated successfully!`);
        console.log('📄 Location:', outputPath);
    } catch (error) {
        console.error(`❌ Error generating ${mode} PDF:`, error);
        process.exit(1);
    }
};

// Generate all three versions
const generateAllVersions = async () => {
    await generatePDF('concise');
    await generatePDF('standard');
    await generatePDF('comprehensive');
};

// Check command line argument
const mode = process.argv[2] as ResumeMode;
if (mode && ['concise', 'standard', 'comprehensive'].includes(mode)) {
    generatePDF(mode);
} else {
    generateAllVersions();
}
