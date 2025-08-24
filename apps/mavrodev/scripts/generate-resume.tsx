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
    Experience,
    SkillData,
    EnhancedSkill,
    HighlightGroup,
    Project,
} from '@repo/data';
import * as fs from 'fs';
import * as path from 'path';

// Register custom fonts
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

// Color palette
const colors = {
    primary: '#2563eb',
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

// Styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        paddingBottom: 35,
        paddingHorizontal: 40,
        fontSize: 10,
        fontFamily: 'Inter',
        backgroundColor: colors.background,
        color: colors.text,
        lineHeight: 1.5,
    },
    // Header with profile image
    header: {
        flexDirection: 'row',
        marginBottom: 20, // Reduced
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
        marginBottom: 14,
        letterSpacing: -0.5,
        lineHeight: 1,
    },
    title: {
        fontSize: 13,
        color: colors.primary,
        fontWeight: 600,
        marginBottom: 16,
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
    // Metrics bar - Made smaller
    metricsBar: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundAccent,
        borderRadius: 8,
        paddingVertical: 10, // More compact
        paddingHorizontal: 16,
        marginBottom: 20, // Reduced gap
        gap: 16,
    },
    metric: {
        flex: 1,
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 16, // Reduced from 18
        fontWeight: 700,
        color: colors.primary,
        marginBottom: 3, // Reduced from 4
        lineHeight: 1,
    },
    metricLabel: {
        fontSize: 7.5, // Further reduced to fit CONTRIBUTIONS
        color: colors.textLight,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: 0.2, // Further reduced
        lineHeight: 1,
    },
    metricDivider: {
        width: 1,
        backgroundColor: colors.border,
        marginHorizontal: 8, // Reduced from 10
    },
    // Sections
    section: {
        marginBottom: 16, // More compact
    },
    lastSection: {
        marginBottom: 18,
        marginTop: 20, // Reduced spacing before Education
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 10,
        // Removed borderBottomWidth and borderBottomColor
    },
    // Summary
    summaryText: {
        fontSize: 10,
        lineHeight: 1.5,
        color: colors.textLight,
    },
    // Experience
    experienceItem: {
        marginBottom: 18, // More compact
        paddingLeft: 14,
        borderLeftWidth: 2,
        borderLeftColor: colors.border,
    },
    experienceHeader: {
        marginBottom: 4, // Reduced gap
    },
    experienceCompanyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2, // Reduced gap before description
    },
    experienceCompanyLeft: {
        flex: 1,
    },
    experienceCompanyName: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.text,
    },
    experienceLocation: {
        fontSize: 9,
        color: colors.textMuted,
        marginTop: 2,
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
    experienceRole: {
        fontSize: 11,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 1,
    },
    experienceCompany: {
        fontSize: 9,
        color: colors.textMuted,
        fontWeight: 500,
    },
    experienceDescription: {
        fontSize: 9.5,
        color: colors.textLight,
        marginBottom: 6,
        lineHeight: 1.4,
    },
    projectSubtitle: {
        fontSize: 9.5,
        fontWeight: 400,
        color: colors.textLight,
        marginBottom: 3,
        marginTop: 3,
    },
    highlight: {
        fontSize: 9,
        color: colors.textLight,
        marginBottom: 2,
        paddingLeft: 10,
        lineHeight: 1.4,
    },
    bulletPoint: {
        color: colors.textLight, // Changed from primary to textLight
        fontWeight: 700,
    },
    techStack: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 6,
        marginBottom: 0,
    },
    techBadge: {
        fontSize: 8,
        color: '#475569',
        backgroundColor: '#e7ecf1',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: colors.border,
        lineHeight: 1,
    },
    // Contributions
    contributionItem: {
        marginBottom: 10,
        paddingLeft: 0, // No border for contributions
        // Removed borders
    },
    contributionTitle: {
        fontSize: 10,
        fontWeight: 600,
        color: colors.primary,
        marginBottom: 3,
    },
    contributionDescription: {
        fontSize: 9,
        color: colors.textLight,
        marginBottom: 4,
        lineHeight: 1.4,
    },
    // Projects
    projectItem: {
        marginBottom: 12, // More compact
        paddingLeft: 0, // No border for projects
        // Removed borders
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    projectTitle: {
        fontSize: 10,
        fontWeight: 600,
        color: colors.primary,
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
        fontSize: 9,
        color: colors.textLight,
        marginBottom: 4,
        lineHeight: 1.4,
    },
    // Skills
    skillsContainer: {
        gap: 8,
    },
    skillsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    skillCategory: {
        fontSize: 9,
        fontWeight: 600,
        width: 90,
        color: colors.text,
    },
    skillItems: {
        fontSize: 9,
        flex: 1,
        color: colors.textLight,
        lineHeight: 1.5,
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
        borderLeftWidth: 2,
        borderLeftColor: colors.border,
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

    const projectCount = resumeData.projects.length;
    const openSourcePRs = 10;

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

const getHighlights = (
    highlights: string[] | HighlightGroup,
    limit?: number,
): string[] => {
    if (isHighlightGroup(highlights)) {
        // If no limit, return all primary and secondary highlights
        if (!limit) {
            return [...highlights.primary, ...(highlights.secondary || [])];
        }
        
        const primary = highlights.primary.slice(
            0,
            Math.min(limit, highlights.primary.length),
        );
        const remaining = limit - primary.length;

        if (remaining > 0 && highlights.secondary) {
            return [...primary, ...highlights.secondary.slice(0, remaining)];
        }

        return primary;
    }

    // If no limit, return all highlights
    if (!limit) {
        return highlights;
    }
    
    return highlights.slice(0, limit);
};

const ResumePDF = () => {
    const metrics = calculateMetrics();
    // Sort experiences: current ones first, then by start date (most recent first)
    const sortedExperiences = [...resumeData.experience].sort((a, b) => {
        // Current jobs come first
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;

        // Then sort by start date (most recent first)
        return b.period.start.getTime() - a.period.start.getTime();
    });
    const experiences = sortedExperiences.slice(0, 4); // Show top 4 experiences
    const ezPumpProject = resumeData.projects.find(
        (p) => p.name === 'EzPump',
    );
    const nangoContribution = resumeData.contributions.find(
        (c) => c.featured,
    );

    // Get other featured projects in specific order: MavroChat first, then MavroDev, then Next.js Auth Template
    const mavrochatProject = resumeData.projects.find(
        (p) => p.name === 'MavroChat',
    );
    const mavrodevProject = resumeData.projects.find(
        (p) => p.name === 'MavroDev',
    );
    const nextAuthProject = resumeData.projects.find(
        (p) => p.name === 'Next.js Auth Template',
    );

    const otherProjects = [
        mavrochatProject,
        mavrodevProject,
        nextAuthProject,
    ].filter((p): p is Project => p !== undefined);

    // Get avatar path
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
                                src={resumeData.personal.website}
                            >
                                mavro.dev
                            </Link>
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
                        </View>
                    </View>
                </View>

                {/* Metrics Bar - Smaller with fixed text */}
                <View style={styles.metricsBar}>
                    <View style={styles.metric}>
                        <Text style={styles.metricValue}>{metrics.years}+</Text>
                        <Text style={styles.metricLabel}>Years</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metric}>
                        <Text style={styles.metricValue}>
                            {metrics.usersImpacted}
                        </Text>
                        <Text style={styles.metricLabel}>Users</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metric}>
                        <Text style={styles.metricValue}>
                            {metrics.projectsDelivered}+
                        </Text>
                        <Text style={styles.metricLabel}>Projects</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metric}>
                        <Text style={styles.metricValue}>
                            {metrics.openSourcePRs}+
                        </Text>
                        <Text style={styles.metricLabel}>Contributions</Text>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.summaryText}>
                        {resumeData.summary.bio}{' '}
                        {resumeData.summary.bioExtension}
                    </Text>
                </View>

                {/* Experience Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {experiences.map((exp: Experience, index: number) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.experienceHeader}>
                                <View style={styles.experienceCompanyRow}>
                                    <View style={styles.experienceCompanyLeft}>
                                        <Text style={styles.experienceRole}>
                                            {exp.role}
                                        </Text>
                                        {exp.company && (
                                            <Text
                                                style={styles.experienceCompany}
                                            >
                                                at{' '}
                                                {exp.website ? (
                                                    <Link
                                                        src={exp.website}
                                                        style={[
                                                            styles.experienceCompany,
                                                            styles.link,
                                                        ]}
                                                    >
                                                        {exp.company}
                                                    </Link>
                                                ) : (
                                                    exp.company
                                                )}
                                                {exp.location &&
                                                    ` • ${exp.location}`}
                                            </Text>
                                        )}
                                        {!exp.company && exp.location && (
                                            <Text
                                                style={styles.experienceCompany}
                                            >
                                                {exp.location}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.experiencePeriod}>
                                        {formatPeriod(exp.period, exp.current)}
                                    </Text>
                                </View>
                            </View>

                            {exp.roleImpact && (
                                <Text style={styles.experienceDescription}>
                                    {exp.roleImpact}
                                </Text>
                            )}

                            <Text style={styles.experienceDescription}>
                                {exp.description}
                            </Text>

                            {/* Handle MicroPump differently - no subtitle */}
                            {exp.company === 'MicroPump' ? (
                                <>
                                    {getHighlights(
                                        exp.projects[0]?.highlights || [],
                                    ).map((highlight, hIndex) => (
                                        <Text
                                            key={hIndex}
                                            style={styles.highlight}
                                        >
                                            <Text style={styles.bulletPoint}>
                                                •
                                            </Text>{' '}
                                            {highlight}
                                        </Text>
                                    ))}
                                </>
                            ) : (
                                /* For other experiences */
                                exp.projects
                                    .slice(0, 2)
                                    .map((project, pIndex) => (
                                        <View key={pIndex}>
                                            {/* Only show project name if there are multiple projects */}
                                            {exp.projects.length > 1 && (
                                                <Text
                                                    style={styles.projectSubtitle}
                                                >
                                                    {project.name}
                                                </Text>
                                            )}
                                            {getHighlights(
                                                project.highlights,
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
                                    ))
                            )}

                            {exp.technologies.backend && (
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

                {/* Contributions Section - Only Nango */}
                <View style={[styles.section, { marginTop: 20, breakBefore: 'page' }] as any}>
                    <Text style={styles.sectionTitle}>Contributions</Text>

                    {nangoContribution && (
                        <View style={styles.contributionItem}>
                            <Link
                                src={
                                    nangoContribution.github ||
                                    nangoContribution.live ||
                                    ''
                                }
                                style={[styles.contributionTitle, styles.link]}
                            >
                                {nangoContribution.name}
                                {nangoContribution.descriptor && ` - ${nangoContribution.descriptor}`}
                            </Link>
                            <Text style={styles.contributionDescription}>
                                {nangoContribution.longDescription}
                            </Text>
                            {getHighlights(nangoContribution.highlights).map(
                                (highlight, hIndex) => (
                                    <Text key={hIndex} style={styles.highlight}>
                                        <Text style={styles.bulletPoint}>
                                            •
                                        </Text>{' '}
                                        {highlight}
                                    </Text>
                                ),
                            )}
                        </View>
                    )}
                </View>

                {/* Projects Section */}
                <View
                    style={
                        [styles.section, { breakInside: 'avoid-page' }] as any
                    }
                >
                    <Text style={styles.sectionTitle}>Projects</Text>

                    {/* EzPump as a featured project */}
                    {ezPumpProject && (
                        <View style={styles.projectItem}>
                            <View style={styles.projectHeader}>
                                <Link
                                    src={
                                        ezPumpProject.live ||
                                        ezPumpProject.github ||
                                        ''
                                    }
                                    style={[styles.projectTitle, styles.link]}
                                >
                                    EzPump
                                </Link>
                                {ezPumpProject.metrics?.users && (
                                    <Text style={styles.projectMetric}>
                                        {ezPumpProject.metrics.users}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.projectDescription}>
                                {ezPumpProject.longDescription}
                            </Text>
                            {ezPumpProject.acquired && (
                                <Text style={styles.projectDescription}>
                                    {ezPumpProject.acquired.details ||
                                        `Acquired by ${ezPumpProject.acquired.by}`}
                                </Text>
                            )}
                            {getHighlights(ezPumpProject.highlights).map(
                                (highlight, hIndex) => (
                                    <Text key={hIndex} style={styles.highlight}>
                                        <Text style={styles.bulletPoint}>
                                            •
                                        </Text>{' '}
                                        {highlight}
                                    </Text>
                                ),
                            )}
                            <View style={styles.techStack}>
                                {ezPumpProject.primaryTech
                                    .slice(0, 4)
                                    .map((tech: string, tIndex: number) => (
                                        <Text
                                            key={tIndex}
                                            style={styles.techBadge}
                                        >
                                            {tech}
                                        </Text>
                                    ))}
                            </View>
                        </View>
                    )}

                    {/* Other featured projects */}
                    {otherProjects.map((project, index) => (
                        <View key={index} style={styles.projectItem}>
                            <View style={styles.projectHeader}>
                                {project.live || project.github ? (
                                    <Link
                                        src={
                                            project.live || project.github || ''
                                        }
                                        style={[
                                            styles.projectTitle,
                                            styles.link,
                                        ]}
                                    >
                                        {project.name}
                                    </Link>
                                ) : (
                                    <Text style={styles.projectTitle}>
                                        {project.name}
                                    </Text>
                                )}
                                {(project.metrics?.users || project.impact) && (
                                    <Text style={styles.projectMetric}>
                                        {project.metrics?.users ||
                                            project.impact}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.projectDescription}>
                                {project.longDescription || project.description}
                            </Text>
                            {getHighlights(project.highlights).map(
                                (highlight, hIndex) => (
                                    <Text key={hIndex} style={styles.highlight}>
                                        <Text style={styles.bulletPoint}>
                                            •
                                        </Text>{' '}
                                        {highlight}
                                    </Text>
                                ),
                            )}
                            <View style={styles.techStack}>
                                {project.primaryTech
                                    .slice(0, 4)
                                    .map((tech: string, tIndex: number) => (
                                        <Text
                                            key={tIndex}
                                            style={styles.techBadge}
                                        >
                                            {tech}
                                        </Text>
                                    ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Technical Skills */}
                <View style={[styles.section, { breakInside: 'avoid' }] as any}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    <View style={styles.skillsContainer}>
                        {resumeData.skills.map((skill, index) => {
                            let items: string[] = [];

                            if (isEnhancedSkill(skill)) {
                                items = [
                                    ...skill.primary,
                                    ...(skill.secondary || []),
                                ].slice(0, 8);
                            } else {
                                items = skill.items.slice(0, 8);
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

                {/* Education - With extra spacing */}
                <View style={styles.lastSection}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View style={styles.educationItem}>
                        <Text style={styles.educationDegree}>
                            {resumeData.education[0]?.degree}
                        </Text>
                        <Text style={styles.educationDetails}>
                            {resumeData.education[0]?.period} •{' '}
                            {resumeData.education[0]?.grade}
                        </Text>
                        <Text style={styles.educationDetails}>
                            {resumeData.education[0]?.description}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const generatePDF = async () => {
    try {
        console.log('🚀 Generating resume PDF...');

        const pdfStream = await ReactPDF.renderToStream(<ResumePDF />);
        const outputPath = path.join(__dirname, '..', 'public', 'resume.pdf');

        const writeStream = fs.createWriteStream(outputPath);
        pdfStream.pipe(writeStream);

        await new Promise<void>((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        console.log('✅ Resume PDF generated successfully!');
        console.log('📄 Location:', outputPath);
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    }
};

generatePDF();
