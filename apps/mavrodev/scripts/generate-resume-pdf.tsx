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
    SkillData,
    Skill,
    EnhancedSkill,
} from '@repo/data';
import * as fs from 'fs';
import * as path from 'path';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
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
    },
    contactItem: {
        marginRight: 15,
    },
    link: {
        color: '#0000ee',
        textDecoration: 'none',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
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
    experienceDescription: {
        fontSize: 10,
        lineHeight: 1.4,
    },
    projectItem: {
        marginBottom: 12,
    },
    projectTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    projectTech: {
        fontSize: 9,
        color: '#666',
        marginBottom: 2,
    },
    projectDescription: {
        fontSize: 10,
        lineHeight: 1.4,
    },
    skillsRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 100,
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
});

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

const ResumePDF = () => {
    const featuredProjects = resumeData.projects
        .filter((project: Project) => project.featured)
        .slice(0, 3);

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
                            src={resumeData.personal.website}
                        >
                            mavro.dev
                        </Link>
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
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Professional Summary
                    </Text>
                    <Text>{resumeData.summary.bio}</Text>
                </View>

                {/* Experience */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {resumeData.experience
                        .slice(0, 3)
                        .map((exp: Experience, index: number) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.experienceHeader}>
                                    <View>
                                        <Text style={styles.experienceTitle}>
                                            {exp.role}
                                        </Text>
                                        <Text style={styles.experienceCompany}>
                                            {exp.company}
                                        </Text>
                                    </View>
                                    <Text style={styles.experiencePeriod}>
                                        {formatPeriod(exp.period, exp.current)}
                                    </Text>
                                </View>
                                <Text style={styles.experienceDescription}>
                                    {exp.description}
                                </Text>
                            </View>
                        ))}
                </View>

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Projects</Text>
                    {featuredProjects.map((project: Project, index: number) => (
                        <View key={index} style={styles.projectItem}>
                            <Text style={styles.projectTitle}>
                                {project.name}
                            </Text>
                            <Text style={styles.projectTech}>
                                {project.primaryTech.join(' • ')}
                            </Text>
                            <Text style={styles.projectDescription}>
                                {project.description}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    {resumeData.skills.map((skillGroup: SkillData, index) => {
                        const items =
                            'items' in skillGroup
                                ? skillGroup.items
                                : [
                                      ...skillGroup.primary,
                                      ...(skillGroup.secondary || []),
                                  ];
                        return (
                            <View key={index} style={styles.skillsRow}>
                                <Text style={styles.skillCategory}>
                                    {skillGroup.category}:
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
                        </View>
                    ))}
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
