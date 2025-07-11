// EXAMPLE: How to update your homepage hero section

import { resumeData } from '@repo/data';
import {
    getHeroContent,
    getExperienceDuration,
    getFullBio,
} from '@/lib/resumeHelpers';

// ❌ BEFORE (Inconsistent):
export function HeroBefore() {
    return (
        <div>
            <h1>Stelios Mavro</h1>
            <p>
                Building AI-powered applications and developer tools since 2020
            </p>
            {/* This implies AI experience since 2020, which is incorrect */}
        </div>
    );
}

// ✅ AFTER (Using single source of truth):
export function HeroAfter() {
    const hero = getHeroContent();
    const { personal, summary } = resumeData;

    return (
        <div>
            <h1>{personal.name}</h1>

            {/* Option 1: Accurate and specific */}
            <p>{hero.tagline}</p>
            {/* Output: "Full-stack engineer with 5+ years of experience" */}

            {/* Option 2: Use the bio directly */}
            <p>{summary.bio}</p>
            {/* Output: "Full-stack engineer since 2020, specializing in AI integrations..." */}

            {/* Option 2.1: Use the full expanded bio */}
            <p>{getFullBio()}</p>
            {/* Output: "Full-stack engineer since 2020... Built MavroChat (ChatGPT clone for developers)..." */}

            {/* Option 3: Custom but accurate */}
            <p>
                Building exceptional software since {summary.startYear}. Now
                specializing in AI integrations and developer tooling.
            </p>

            {/* Option 4: Focus on achievements */}
            <p>{hero.alternativeTaglines[2]}</p>
            {/* Output: "From crypto bots to AI chat platforms" */}
        </div>
    );
}

// For Projects Section:
export function ProjectsSection() {
    const featuredProjects = resumeData.projects.filter((p) => p.featured);

    return (
        <div>
            {featuredProjects.map((project) => (
                <div key={project.slug}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {/* Always consistent with resume */}
                </div>
            ))}
        </div>
    );
}

// For any "years of experience" references:
export function ExperienceDisplay() {
    const duration = getExperienceDuration(resumeData.summary.startYear);

    return (
        <p>
            {duration} of full-stack development experience
            {/* Output: "5+ years of full-stack development experience" */}
        </p>
    );
}
