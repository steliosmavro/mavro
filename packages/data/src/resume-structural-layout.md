# Resume Structural Layout Design

## Component Hierarchy

```
ResumePDF
├── Page
│   ├── Header
│   │   ├── PersonalInfo
│   │   │   ├── Name
│   │   │   ├── Title
│   │   │   └── ContactBar
│   │   └── MetricsBar (NEW)
│   │       ├── YearsMetric
│   │       ├── UsersMetric
│   │       ├── ProjectsMetric
│   │       └── ContributionsMetric
│   │
│   ├── Summary
│   │   ├── Headline
│   │   ├── CoreStatement
│   │   └── Availability
│   │
│   ├── Experience
│   │   └── ExperienceItem[]
│   │       ├── RoleHeader
│   │       │   ├── RoleTitle
│   │       │   ├── Company
│   │       │   └── Period
│   │       ├── ImpactStatement
│   │       ├── Highlights
│   │       └── TechStack
│   │
│   ├── Projects
│   │   └── ProjectGroup[]
│   │       ├── GroupTitle
│   │       └── ProjectItem[]
│   │           ├── ProjectHeader
│   │           ├── ImpactMetric
│   │           ├── Highlights
│   │           └── TechBadges
│   │
│   ├── Skills
│   │   └── SkillGroup[]
│   │       ├── CategoryName
│   │       ├── PrimarySkills
│   │       └── SecondarySkills
│   │
│   └── Education
│       └── EducationItem
```

## Section Specifications

### 1. Header Section

```typescript
interface HeaderProps {
    mode: ResumeMode;
    personal: PersonalInfo;
    metrics: {
        years: number;
        usersImpacted: string;
        projectsDelivered: number;
        openSourcePRs: number;
    };
}

// Layout:
// [Name]                    [Email] [GitHub] [LinkedIn]
// [Title]                   [Location]
// ─────────────────────────────────────────────────
// [5+ Years] [5K+ Users] [15+ Projects] [10+ PRs]
```

### 2. Summary Section

```typescript
interface SummaryProps {
    mode: ResumeMode;
    summary: Summary;
}

// Concise: 2-3 lines
// Standard: 3-4 lines
// Comprehensive: Full paragraph
```

### 3. Experience Section

```typescript
interface ExperienceProps {
    mode: ResumeMode;
    experiences: Experience[];
    maxItems: number; // Based on mode
}

// Item Layout:
// [Role Title] @ [Company]          [Period]
// [Impact Statement - one line]
// • Primary highlight with metric
// • Primary highlight with impact
// • Secondary highlight (if mode allows)
// Tech: [React] [Node.js] [PostgreSQL]
```

### 4. Projects Section

```typescript
interface ProjectsProps {
    mode: ResumeMode;
    projects: Project[];
    groupByImpact: boolean;
}

// Groups:
// - Successful Exits
// - Open Source Impact
// - Technical Excellence

// Item Layout:
// [Project Name] - [Type]           [Metric]
// [One-line description]
// • Key achievement
// • Technical highlight
// Stack: [Primary techs only]
```

### 5. Skills Section

```typescript
interface SkillsProps {
    mode: ResumeMode;
    skills: SkillData[];
}

// Concise Layout:
// Languages: JavaScript, TypeScript, Python
// Frameworks: React, Next.js, Node.js

// Standard/Comprehensive:
// Languages:
//   Primary: JavaScript, TypeScript, Python
//   Also: Go, Rust
```

## Layout Rules by Mode

### Concise Mode (1 page)

- Header: Minimal contact (email, github, linkedin)
- Metrics: Show only top 3
- Experience: 3 roles, 2 highlights each
- Projects: 3-4 featured, grouped
- Skills: Primary only, inline
- Education: Single line

### Standard Mode (1.5-2 pages)

- Header: Full contact info
- Metrics: All 4 metrics
- Experience: 4-5 roles, 3-4 highlights
- Projects: 5-6 projects, by category
- Skills: Primary + relevant secondary
- Education: With description

### Comprehensive Mode (2+ pages)

- Header: Full details + availability
- Metrics: Detailed breakdown
- Experience: All roles, all highlights
- Projects: All significant projects
- Skills: Complete inventory
- Education: Full details
- Additional: Testimonials, FAQs

## Space Optimization Techniques

### Dynamic Spacing

```typescript
const spacing = {
    concise: {
        section: 15,
        item: 10,
        line: 1.2,
    },
    standard: {
        section: 20,
        item: 15,
        line: 1.4,
    },
    comprehensive: {
        section: 25,
        item: 20,
        line: 1.6,
    },
};
```

### Content Prioritization Algorithm

```typescript
function selectContent(mode: ResumeMode) {
    const limits = {
        concise: {
            experiences: 3,
            projects: 4,
            highlightsPerItem: 2,
            skillsPerCategory: 5,
        },
        standard: {
            experiences: 5,
            projects: 6,
            highlightsPerItem: 4,
            skillsPerCategory: 8,
        },
        comprehensive: {
            experiences: Infinity,
            projects: Infinity,
            highlightsPerItem: Infinity,
            skillsPerCategory: Infinity,
        },
    };

    return limits[mode];
}
```

### Smart Truncation

- Use "..." for descriptions exceeding limits
- Show "(+X more)" for hidden items
- Prioritize metrics over descriptions
- Keep action verbs and numbers

## Component Implementation Guide

### Base Components

1. **Section**: Wrapper with consistent spacing
2. **SectionTitle**: Consistent typography
3. **ItemGroup**: Handles item spacing
4. **Metric**: Formatted number display
5. **TechBadge**: Inline tech display
6. **HighlightList**: Bullet point manager

### Smart Components

1. **ContentSelector**: Filters by mode
2. **HighlightPrioritizer**: Sorts by impact
3. **SpaceOptimizer**: Adjusts spacing
4. **MetricCalculator**: Aggregates data

## Responsive Design Patterns

### Page Breaks

- Never break experience items
- Allow project groups to split
- Keep skills categories together
- Smart widow/orphan control

### Visual Hierarchy

1. Name (largest)
2. Section Titles
3. Role/Project Titles
4. Regular Text
5. Supplementary Info (smallest)

### Color Usage (Minimal)

- Black: Primary text
- Dark Gray: Titles, important
- Medium Gray: Secondary info
- Light Gray: Supplementary
- Accent: Links only (blue)
