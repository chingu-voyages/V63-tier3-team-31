
interface FooterLinkGroupProps {
    title: string;
    links: {
        label: string;
        href: string;
    }[];
    linkStyle?: string;
}

export default function FooterLinkGroup({ title, links, linkStyle }: FooterLinkGroupProps) {
    return (
        <nav aria-label={title}>
            <h3 className="body-medium uppercase tracking-wide">
                {title}
            </h3>

            <ul className="mt-4 space-y-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className={linkStyle}>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
