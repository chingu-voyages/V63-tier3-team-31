import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#home");

    function handleNavClick(href: string) {
        setActiveLink(href);
        setIsMenuOpen(false);
    }

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        function handleResize(event: MediaQueryListEvent) {
            if (event.matches) {
                setIsMenuOpen(false);
            }
        }

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b bg-background">

            <div className="landing-container flex min-h-16 items-center justify-between gap-6 md:justify-center lg:justify-between">

                {/* Logo and navigation */}
                <div className="flex items-center gap-6 lg:gap-8">

                    <a
                        href="#home"
                        onClick={() => handleNavClick("#home")}
                        className="flex shrink-0 items-center gap-3"
                    >
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <CalendarCheck size={22} />
                        </div>

                        <span className="text-xl font-semibold">
                            EventSphere AI
                        </span>
                    </a>

                    {/* Tablet & desktop navigation */}
                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-4 md:flex lg:gap-6"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={`body-medium whitespace-nowrap border-b-2 py-2 transition-colors hover:text-primary ${
                                    activeLink === link.href
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground"
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Tablet & desktop action buttons */}
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    <Button variant="outline">
                        Log in
                    </Button>

                    <Button>
                        Get Started
                    </Button>
                </div>

                {/* Mobile hamburger button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </Button>

            </div>

            {/* Full-screen mobile navigation */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-background p-6 md:hidden"
                >
                    <nav
                        aria-label="Mobile navigation"
                        className="flex flex-col gap-2"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={`rounded-lg px-4 py-4 text-lg font-medium transition-colors ${
                                    activeLink === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground hover:bg-muted"
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile action buttons */}
                    <div className="mt-8 flex flex-col gap-3 border-t pt-8">
                        <Button size="lg" variant="outline">
                            Log in
                        </Button>

                        <Button size="lg">
                            Get Started
                        </Button>
                    </div>
                </div>
            )}

        </header>
    );
}