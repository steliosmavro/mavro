import React from 'react';
import ReactPDF, {
    Document,
    Page,
    Text,
    View,
    Link,
    Image,
    StyleSheet,
    Font,
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

// Register custom fonts for a professional look
Font.register({
    family: 'Inter',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff',
            fontWeight: 400,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff',
            fontWeight: 500,
        },
        {
            src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff',
            fontWeight: 700,
        },
    ],
});

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

// Modern color palette
const colors = {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#dbeafe',
    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',
    background: '#ffffff',
    backgroundLight: '#f8fafc',
    backgroundAccent: '#f1f5f9',
    border: '#e2e8f0',
    success: '#10b981',
    successLight: '#d1fae5',
    accent: '#8b5cf6',
    accentLight: '#ede9fe',
};

// Create modern styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 45,
        paddingHorizontal: 45,
        fontSize: 10,
        fontFamily: 'Inter',
        backgroundColor: colors.background,
        color: colors.text,
        lineHeight: 1.5,
    },
    // Header with profile image
    header: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'flex-start',
    },
    profileImageContainer: {
        marginRight: 20,
        width: 90,
        height: 90,
        borderRadius: 45,
        border: `3 solid ${colors.primaryLight}`,
        backgroundColor: colors.background,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 45,
        objectFit: 'contain',
        objectPosition: 'center bottom',
        transform: 'scale(1.2) translateY(5px)',
    },
    headerContent: {
        flex: 1,
    },
    name: {
        fontSize: 26,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 8,
        letterSpacing: -0.5,
        lineHeight: 1,
    },
    title: {
        fontSize: 13,
        color: colors.primary,
        fontWeight: 600,
        marginBottom: 10,
        lineHeight: 1.2,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 9.5,
    },
    contactItem: {
        color: colors.textLight,
    },
    contactDivider: {
        color: colors.border,
    },
    link: {
        color: colors.primary,
        textDecoration: 'none',
        fontWeight: 500,
    },
    // Metrics bar
    metricsBar: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundAccent,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 20,
    },
    metric: {
        flex: 1,
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.primary,
        marginBottom: 4,
        lineHeight: 1,
    },
    metricLabel: {
        fontSize: 9,
        color: colors.textLight,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        lineHeight: 1,
    },
    metricDivider: {
        width: 1,
        backgroundColor: colors.border,
        marginHorizontal: 10,
    },
    // Sections
    section: {
        marginBottom: 22,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 12,
        paddingBottom: 6,
        borderBottomWidth: 2,
        borderBottomColor: colors.primaryLight,
    },
    // Summary
    summaryText: {
        fontSize: 10.5,
        lineHeight: 1.7,
        color: colors.textLight,
    },
    // Experience
    experienceItem: {
        marginBottom: 18,
        paddingLeft: 16,
        borderLeftWidth: 3,
        borderLeftColor: colors.primaryLight,
    },
    experienceHeader: {
        marginBottom: 6,
    },
    experienceTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    experienceTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.text,
    },
    experiencePeriod: {
        fontSize: 9,
        color: colors.primary,
        fontWeight: 600,
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 8,
        paddingTop: 3,
        paddingBottom: 4,
        borderRadius: 4,
        lineHeight: 1,
    },
    experienceCompany: {
        fontSize: 11,
        color: colors.textLight,
        fontWeight: 500,
    },
    experienceDescription: {
        fontSize: 10,
        color: colors.textLight,
        marginBottom: 8,
        lineHeight: 1.5,
    },
    impactStatement: {
        fontSize: 10.5,
        fontStyle: 'italic',
        color: colors.primary,
        marginBottom: 8,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: colors.accentLight,
    },
    projectName: {
        fontSize: 11,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 4,
    },
    highlight: {
        fontSize: 9.5,
        color: colors.text,
        marginBottom: 3,
        paddingLeft: 16,
        lineHeight: 1.5,
    },
    bulletPoint: {
        color: colors.primary,
        fontWeight: 700,
    },
    techStack: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 8,
        marginBottom: 0,
    },
    techBadge: {
        fontSize: 8.5,
        color: '#475569',
        backgroundColor: '#e7ecf1',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: colors.border,
        lineHeight: 1,
    },
    // Projects
    projectGroup: {
        marginBottom: 16,
    },
    projectGroupTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 10,
        paddingLeft: 8,
        paddingVertical: 4,
        backgroundColor: colors.accentLight,
        borderRadius: 4,
    },
    projectItem: {
        marginBottom: 12,
        paddingLeft: 16,
        borderLeftWidth: 2,
        borderLeftColor: colors.border,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 600,
        color: colors.text,
    },
    projectMetric: {
        fontSize: 9,
        color: colors.success,
        fontWeight: 600,
        backgroundColor: colors.successLight,
        paddingHorizontal: 6,
        paddingTop: 3,
        paddingBottom: 4,
        borderRadius: 4,
        lineHeight: 1,
    },
    projectDescription: {
        fontSize: 9.5,
        color: colors.textLight,
        marginBottom: 6,
        lineHeight: 1.5,
    },
    // Skills
    skillsContainer: {
        gap: 10,
    },
    skillsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 600,
        width: 100,
        color: colors.text,
    },
    skillItems: {
        fontSize: 9.5,
        flex: 1,
        color: colors.textLight,
        lineHeight: 1.6,
    },
    primarySkill: {
        fontWeight: 500,
        color: colors.text,
    },
    // Education
    educationItem: {
        backgroundColor: colors.backgroundLight,
        padding: 12,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: colors.primaryLight,
    },
    educationDegree: {
        fontSize: 11,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 2,
    },
    educationDetails: {
        fontSize: 9.5,
        color: colors.textLight,
        lineHeight: 1.5,
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
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.usersImpacted}</Text>
            <Text style={styles.metricLabel}>Users</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
            <Text style={styles.metricValue}>{metrics.projectsDelivered}+</Text>
            <Text style={styles.metricLabel}>Projects</Text>
        </View>
        <View style={styles.metricDivider} />
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

    // Get avatar path - using the new business photo
    const avatarPath = path.join(
        __dirname,
        '..',
        'public',
        'business-transparent-bg-extra-space.png',
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header with profile image */}
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <Image style={styles.profileImage} src={avatarPath} />
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.name}>
                            {resumeData.personal.name}
                        </Text>
                        <Text style={styles.title}>
                            {resumeData.personal.title}
                        </Text>
                        <View style={styles.contactRow}>
                            <Text style={styles.contactItem}>
                                {resumeData.personal.location}
                            </Text>
                            <Text style={styles.contactDivider}>•</Text>
                            <Link
                                style={[styles.contactItem, styles.link]}
                                src={`mailto:${resumeData.personal.email}`}
                            >
                                {resumeData.personal.email}
                            </Link>
                            <Text style={styles.contactDivider}>•</Text>
                            <Link
                                style={[styles.contactItem, styles.link]}
                                src={resumeData.personal.github}
                            >
                                GitHub
                            </Link>
                            <Text style={styles.contactDivider}>•</Text>
                            <Link
                                style={[styles.contactItem, styles.link]}
                                src={resumeData.personal.linkedin}
                            >
                                LinkedIn
                            </Link>
                            {mode !== 'concise' && (
                                <>
                                    <Text style={styles.contactDivider}>•</Text>
                                    <Link
                                        style={[
                                            styles.contactItem,
                                            styles.link,
                                        ]}
                                        src={resumeData.personal.website}
                                    >
                                        mavro.dev
                                    </Link>
                                </>
                            )}
                        </View>
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
                                <View style={styles.experienceTitleRow}>
                                    <Text style={styles.experienceTitle}>
                                        {exp.role}
                                    </Text>
                                    <Text style={styles.experiencePeriod}>
                                        {formatPeriod(exp.period, exp.current)}
                                    </Text>
                                </View>
                                <Text style={styles.experienceCompany}>
                                    {exp.website ? (
                                        <Link
                                            src={exp.website}
                                            style={styles.link}
                                        >
                                            {exp.company}
                                        </Link>
                                    ) : (
                                        exp.company
                                    )}
                                    {exp.location && ` • ${exp.location}`}
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
                                            <Text style={styles.projectName}>
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
                                                <Text
                                                    style={styles.bulletPoint}
                                                >
                                                    •
                                                </Text>{' '}
                                                {highlight}
                                            </Text>
                                        ))}
                                    </View>
                                ))}

                            {mode !== 'concise' && exp.technologies.backend && (
                                <View style={styles.techStack}>
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
                                    ].map((tech, tIndex) => (
                                        <Text
                                            key={tIndex}
                                            style={styles.techBadge}
                                        >
                                            {tech}
                                        </Text>
                                    ))}
                                </View>
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
                                            {project.live || project.github ? (
                                                <Link
                                                    src={
                                                        project.live ||
                                                        project.github ||
                                                        ''
                                                    }
                                                    style={[
                                                        styles.projectTitle,
                                                        styles.link,
                                                    ]}
                                                >
                                                    {project.name}
                                                </Link>
                                            ) : (
                                                <Text
                                                    style={styles.projectTitle}
                                                >
                                                    {project.name}
                                                </Text>
                                            )}
                                            {project.metrics?.users && (
                                                <Text
                                                    style={styles.projectMetric}
                                                >
                                                    {project.metrics.users}
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
                                                <Text
                                                    style={styles.bulletPoint}
                                                >
                                                    •
                                                </Text>{' '}
                                                {highlight}
                                            </Text>
                                        ))}
                                        {mode !== 'concise' && (
                                            <View style={styles.techStack}>
                                                {project.primaryTech
                                                    .slice(0, 4)
                                                    .map((tech, tIndex) => (
                                                        <Text
                                                            key={tIndex}
                                                            style={
                                                                styles.techBadge
                                                            }
                                                        >
                                                            {tech}
                                                        </Text>
                                                    ))}
                                            </View>
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
                                            {project.live || project.github ? (
                                                <Link
                                                    src={
                                                        project.live ||
                                                        project.github ||
                                                        ''
                                                    }
                                                    style={[
                                                        styles.projectTitle,
                                                        styles.link,
                                                    ]}
                                                >
                                                    {project.name}
                                                </Link>
                                            ) : (
                                                <Text
                                                    style={styles.projectTitle}
                                                >
                                                    {project.name}
                                                </Text>
                                            )}
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
                                                <Text
                                                    style={styles.bulletPoint}
                                                >
                                                    •
                                                </Text>{' '}
                                                {highlight}
                                            </Text>
                                        ))}
                                        {mode !== 'concise' && (
                                            <View style={styles.techStack}>
                                                {project.primaryTech
                                                    .slice(0, 4)
                                                    .map((tech, tIndex) => (
                                                        <Text
                                                            key={tIndex}
                                                            style={
                                                                styles.techBadge
                                                            }
                                                        >
                                                            {tech}
                                                        </Text>
                                                    ))}
                                            </View>
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
                                            {project.live || project.github ? (
                                                <Link
                                                    src={
                                                        project.live ||
                                                        project.github ||
                                                        ''
                                                    }
                                                    style={[
                                                        styles.projectTitle,
                                                        styles.link,
                                                    ]}
                                                >
                                                    {project.name}
                                                </Link>
                                            ) : (
                                                <Text
                                                    style={styles.projectTitle}
                                                >
                                                    {project.name}
                                                </Text>
                                            )}
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
                                                    <Text
                                                        style={
                                                            styles.bulletPoint
                                                        }
                                                    >
                                                        •
                                                    </Text>{' '}
                                                    {highlight}
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
                    <View style={styles.skillsContainer}>
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
                                        {items.map((item, idx) => (
                                            <Text key={idx}>
                                                {idx > 0 && ', '}
                                                <Text
                                                    style={
                                                        isEnhancedSkill(
                                                            skill,
                                                        ) &&
                                                        idx <
                                                            skill.primary.length
                                                            ? styles.primarySkill
                                                            : {}
                                                    }
                                                >
                                                    {item}
                                                </Text>
                                            </Text>
                                        ))}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
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
        console.log(
            `🚀 Generating ${mode} resume PDF with beautiful styling...`,
        );

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
