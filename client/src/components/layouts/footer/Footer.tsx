import FooterLinkGroup from "./FooterLinkGroup";
import FooterLogo from "./FooterLogo";
import Copyright from "./Copyright";

const productLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
];

const accountLinks = [
    { label: "Home", href: "#home" },
    { label: "Log in", href: "/login" },
    { label: "Sign up", href: "/signup" },
    { label: "Guest Access", href: "/guest" },
];

const legalLinks = [
    { label: "Privacy Policy", shortLabel: "Privacy", href: "/privacy" },
    { label: "Terms of Service", shortLabel: "Terms", href: "/terms" },
];

const linkStyle =
    "body-regular text-muted-foreground transition-colors hover:text-primary";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="landing-container">

                {/* Desktop footer */}
                <div className="hidden py-12 md:block">

                    <div className="flex justify-between gap-12">

                        {/* Brand */}
                        <div className="max-w-sm">
                            <FooterLogo />

                            <p className="body-regular mt-3 leading-relaxed text-muted-foreground">
                                The modern simple event management platform
                                for creators and community hosts.
                            </p>
                        </div>

                        {/* Navigation columns */}
                        <div className="flex gap-16">
                            <FooterLinkGroup
                                title="Product"
                                links={productLinks}
                                linkStyle={linkStyle}
                            />

                            <FooterLinkGroup
                                title="Account"
                                links={accountLinks}
                            />
                        </div>

                    </div>

                    {/* Bottom section */}
                    <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">

                        <Copyright />

                        <nav
                            aria-label="Legal navigation"
                            className="flex items-center gap-6"
                        >
                            {legalLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={linkStyle}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                    </div>
                </div>

                {/* Tablet and mobile footer */}
                <div className="flex flex-col items-center gap-4 py-6 text-center md:hidden">

                    <FooterLogo />

                    <nav
                        aria-label="Footer navigation"
                        className="flex flex-wrap justify-center gap-x-4 gap-y-2"
                    >
                        {productLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={linkStyle}
                            >
                                {link.label}
                            </a>
                        ))}

                        {legalLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={linkStyle}
                            >
                                {link.shortLabel}
                            </a>
                        ))}
                    </nav>

                    <Copyright />

                </div>

            </div>
        </footer>
    );
}