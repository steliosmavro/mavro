'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Briefcase,
    Calendar,
    MapPin,
    ChevronDown,
    ChevronUp,
    Code2,
} from 'lucide-react';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardContent,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    FilterBar,
    type FilterOption,
} from '@repo/ui/components';
import React from 'react';
import { resumeData } from '@repo/data';
import { getProjects } from '@/lib/resumeHelpers';
import type { Project, ProjectCategory, Experience } from '@/types/resume';
import { getCategoryLabel } from '@/lib/categories';
import { formatPeriod } from '@/lib/dateUtils';
import { ProjectCard } from '@/components/projects/ProjectCard';

type FilterType = ProjectCategory | 'all' | 'featured';
type TabType = 'personal' | 'professional';

export default function ProjectsPage() {
    const [selectedFilter, setSelectedFilter] =
        React.useState<FilterType>('all');
    const [expandedExperience, setExpandedExperience] = React.useState<
        Set<string>
    >(new Set());
    const [activeTab, setActiveTab] = React.useState<TabType>('personal');

    const allProjects = getProjects();
    const personalProjects = allProjects.filter((p) => p.type !== 'client');
    const clientProjects = allProjects.filter((p) => p.type === 'client');

    const toggleExperienceExpansion = (company: string) => {
        setExpandedExperience((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(company)) {
                newSet.delete(company);
            } else {
                newSet.add(company);
            }
            return newSet;
        });
    };

    // Get all unique categories from personal projects only
    const allCategories = React.useMemo(() => {
        const categories = new Set<ProjectCategory>();
        personalProjects.forEach((project) => {
            project.categories.forEach((cat: ProjectCategory) =>
                categories.add(cat),
            );
        });
        return Array.from(categories).sort();
    }, [personalProjects]);

    const filteredProjects =
        selectedFilter === 'all'
            ? personalProjects
            : selectedFilter === 'featured'
              ? personalProjects.filter((p) => p.featured)
              : personalProjects.filter((p) =>
                    p.categories.includes(selectedFilter as ProjectCategory),
                );

    // Distribute projects into columns
    const distributeIntoColumns = (
        projects: typeof filteredProjects,
        numColumns: number,
    ) => {
        const columns: (typeof projects)[] = Array.from(
            { length: numColumns },
            () => [],
        );
        projects.forEach((project, index) => {
            const columnIndex = index % numColumns;
            columns[columnIndex]?.push(project);
        });
        return columns;
    };

    const projectsByCategory = React.useMemo(() => {
        const grouped: Record<ProjectCategory | 'featured', Project[]> = {
            featured: [],
            'ai-ml': [],
            web3: [],
            'developer-tools': [],
            'open-source': [],
            automation: [],
            website: [],
            contributions: [],
        };

        personalProjects.forEach((project) => {
            if (project.featured) {
                grouped.featured.push(project);
            }
            project.categories.forEach((cat: ProjectCategory) => {
                if (cat in grouped) {
                    grouped[cat as keyof typeof grouped].push(project);
                }
            });
        });

        return grouped;
    }, [personalProjects]);

    const filterOptions = React.useMemo(() => {
        const options: FilterOption[] = [
            {
                value: 'featured',
                label: 'Featured',
                count: projectsByCategory.featured.length,
                icon: <Star className="h-4 w-4 mr-2" />,
            },
        ];

        allCategories.forEach((category) => {
            const count = projectsByCategory[category]?.length || 0;
            if (count > 0) {
                options.push({
                    value: category,
                    label: getCategoryLabel(category),
                    count,
                });
            }
        });

        return options;
    }, [projectsByCategory, allCategories]);

    const renderExperienceCard = (experience: Experience, index: number) => {
        const isExpanded = expandedExperience.has(experience.company);

        return (
            <motion.div
                key={experience.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                }}
                className=""
            >
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
                    <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {experience.website ? (
                                    <a
                                        href={experience.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-opacity hover:opacity-80"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {experience.logo ? (
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-border/50">
                                                <img
                                                    src={experience.logo}
                                                    alt={`${experience.company} logo`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                        )}
                                    </a>
                                ) : (
                                    <>
                                        {experience.logo ? (
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-border/50">
                                                <img
                                                    src={experience.logo}
                                                    alt={`${experience.company} logo`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                        )}
                                    </>
                                )}
                                <div className="flex flex-col gap-1">
                                    {experience.website ? (
                                        <a
                                            href={experience.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl font-bold hover:text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {experience.company}
                                        </a>
                                    ) : (
                                        <h3 className="text-xl font-bold">
                                            {experience.company}
                                        </h3>
                                    )}
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {experience.role}
                                    </span>
                                </div>
                            </div>
                            {experience.current && (
                                <Badge
                                    variant="secondary"
                                    className="bg-green-500/10 text-green-600"
                                >
                                    Current
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatPeriod(experience.period)}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>
                                    {experience.location ||
                                        experience.workModel}
                                </span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {experience.description}
                        </p>

                        {/* Client Projects */}
                        {clientProjects.filter((p) =>
                            experience.projects.some((ep) =>
                                ep.name.includes(p.name),
                            ),
                        ).length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-2">
                                    Related Projects:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {clientProjects
                                        .filter((p) =>
                                            experience.projects.some((ep) =>
                                                ep.name.includes(p.name),
                                            ),
                                        )
                                        .map((project) => (
                                            <Badge
                                                key={project.slug}
                                                variant="outline"
                                            >
                                                {project.name}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Show More Button */}
                        {experience.projects.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExperienceExpansion(
                                        experience.company,
                                    );
                                }}
                                className="inline-flex items-center gap-2 text-xs"
                            >
                                <span>Show {isExpanded ? 'less' : 'more'}</span>
                                {isExpanded ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </Button>
                        )}

                        {/* Expanded Section */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: 'auto',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className="mt-4 space-y-4"
                                >
                                    {/* Projects */}
                                    {experience.projects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className="border-l-2 border-primary/20 pl-4"
                                        >
                                            <h5 className="text-sm font-semibold mb-1">
                                                {project.name}
                                                {project.role && (
                                                    <span className="font-normal text-muted-foreground">
                                                        {' '}
                                                        - {project.role}
                                                    </span>
                                                )}
                                            </h5>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {project.description}
                                            </p>
                                            <ul className="space-y-1">
                                                {(Array.isArray(
                                                    project.highlights,
                                                )
                                                    ? project.highlights
                                                    : [
                                                          ...project.highlights
                                                              .primary,
                                                          ...(project.highlights
                                                              .secondary || []),
                                                      ]
                                                ).map((highlight, hidx) => (
                                                    <li
                                                        key={hidx}
                                                        className="text-sm text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-primary mt-1">
                                                            •
                                                        </span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    {/* Technologies */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold">
                                            Technologies used:
                                        </h4>
                                        <div className="space-y-1">
                                            {experience.technologies.frontend &&
                                                experience.technologies.frontend
                                                    .length > 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">
                                                            Frontend:
                                                        </span>{' '}
                                                        {experience.technologies.frontend.join(
                                                            ', ',
                                                        )}
                                                    </div>
                                                )}
                                            {experience.technologies.backend &&
                                                experience.technologies.backend
                                                    .length > 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">
                                                            Backend:
                                                        </span>{' '}
                                                        {experience.technologies.backend.join(
                                                            ', ',
                                                        )}
                                                    </div>
                                                )}
                                            {experience.technologies
                                                .databases &&
                                                experience.technologies
                                                    .databases.length > 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">
                                                            Databases:
                                                        </span>{' '}
                                                        {experience.technologies.databases.join(
                                                            ', ',
                                                        )}
                                                    </div>
                                                )}
                                            {experience.technologies.devops &&
                                                experience.technologies.devops
                                                    .length > 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">
                                                            DevOps:
                                                        </span>{' '}
                                                        {experience.technologies.devops.join(
                                                            ', ',
                                                        )}
                                                    </div>
                                                )}
                                            {experience.technologies.other &&
                                                experience.technologies.other
                                                    .length > 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">
                                                            Other:
                                                        </span>{' '}
                                                        {experience.technologies.other.join(
                                                            ', ',
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-[3.75rem] font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Projects & Experience
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {resumeData.summary.headline}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content with Tabs */}
            <section className="px-4 pb-24">
                <div className="max-w-6xl mx-auto">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) =>
                            setActiveTab(value as TabType)
                        }
                        className="w-full"
                    >
                        <TabsList className="grid w-full max-w-md mx-auto mb-12 mt-8 grid-cols-2 h-12 p-1 bg-muted/50 backdrop-blur-sm border border-border/50 shadow-sm">
                            <TabsTrigger
                                value="personal"
                                className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:shadow-sm"
                            >
                                Personal Projects
                            </TabsTrigger>
                            <TabsTrigger
                                value="professional"
                                className="data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:shadow-sm"
                            >
                                Work Experience
                            </TabsTrigger>
                        </TabsList>

                        {/* Personal Projects Tab */}
                        <TabsContent value="personal" className="mt-0">
                            {/* Filters */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-12"
                            >
                                <FilterBar
                                    options={filterOptions}
                                    selectedValue={
                                        selectedFilter === 'all'
                                            ? null
                                            : selectedFilter
                                    }
                                    onValueChange={(value) =>
                                        setSelectedFilter(
                                            (value || 'all') as FilterType,
                                        )
                                    }
                                    allLabel="All Projects"
                                    allIcon={<Code2 className="h-4 w-4" />}
                                    allCount={personalProjects.length}
                                    showCounts={true}
                                />
                            </motion.div>

                            {/* Projects Grid */}
                            {/* Desktop XL: 3 columns */}
                            <div className="hidden xl:flex flex-row gap-6">
                                {distributeIntoColumns(filteredProjects, 3).map(
                                    (column, columnIndex) => (
                                        <div
                                            key={columnIndex}
                                            className="flex-1 flex flex-col gap-6"
                                        >
                                            {column.map((project, index) => (
                                                <ProjectCard
                                                    key={project.slug}
                                                    project={project}
                                                    index={
                                                        columnIndex *
                                                            Math.ceil(
                                                                filteredProjects.length /
                                                                    3,
                                                            ) +
                                                        index
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Desktop MD-LG: 2 columns */}
                            <div className="hidden md:flex xl:hidden flex-row gap-6">
                                {distributeIntoColumns(filteredProjects, 2).map(
                                    (column, columnIndex) => (
                                        <div
                                            key={columnIndex}
                                            className="flex-1 flex flex-col gap-6"
                                        >
                                            {column.map((project, index) => (
                                                <ProjectCard
                                                    key={project.slug}
                                                    project={project}
                                                    index={
                                                        columnIndex *
                                                            Math.ceil(
                                                                filteredProjects.length /
                                                                    2,
                                                            ) +
                                                        index
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Tablet & Mobile: Single column */}
                            <div className="flex md:hidden flex-col gap-6">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.slug}
                                        project={project}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {filteredProjects.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <p className="text-muted-foreground">
                                        No projects found in this category.
                                    </p>
                                </motion.div>
                            )}
                        </TabsContent>

                        {/* Professional Work Tab */}
                        <TabsContent value="professional" className="mt-0">
                            <div className="space-y-6">
                                {resumeData.experience.map((exp, index) =>
                                    renderExperienceCard(exp, index),
                                )}

                                {clientProjects.length > 0 && (
                                    <>
                                        <div className="text-center my-8">
                                            <h3 className="text-2xl font-bold">
                                                Client Projects
                                            </h3>
                                            <p className="text-muted-foreground mt-2">
                                                Projects delivered for clients
                                            </p>
                                        </div>

                                        {/* Client Projects Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {clientProjects.map(
                                                (project, index) => (
                                                    <ProjectCard
                                                        key={project.slug}
                                                        project={project}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-primary/20"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Let&apos;s Build Something Together
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        {resumeData.summary.availability}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild size="lg">
                            <a href="/contact">Get in Touch</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a
                                href={resumeData.personal.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <Code2 className="h-5 w-5" />
                                Follow on GitHub
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
