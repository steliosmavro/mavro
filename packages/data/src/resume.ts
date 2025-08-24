import type { Resume } from './types';
import { personalInfo } from './personal';
import { summary } from './personal';
import { projects } from './projects';
import { contributions } from './contributions';
import { experience } from './experience';
import { education } from './education';
import { skills } from './skills';
import { testimonials } from './testimonials';
import { faqs } from './faqs';
import { contactMethods } from './contact';
import { homepage } from './homepage';

export const resumeData: Resume = {
    personal: personalInfo,
    summary,
    projects,
    contributions,
    experience,
    education,
    skills,
    testimonials,
    faqs,
    contactMethods,
    homepage,
};
