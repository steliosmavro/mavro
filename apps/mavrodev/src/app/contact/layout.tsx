import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Stelios Mavro',
    description:
        'Get in touch with Stelios Mavro for freelance projects, collaborations, or technical consulting.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
