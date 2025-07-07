import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturedProjects } from '@/components/homepage/FeaturedProjects';
import { Testimonials } from '@/components/homepage/Testimonials';

export default function Home() {
    return (
        <main className="flex flex-col gap-32 2xl:gap-40 overflow-x-hidden">
            <HeroSection />
            <FeaturedProjects />
            <Testimonials />
        </main>
    );
}
