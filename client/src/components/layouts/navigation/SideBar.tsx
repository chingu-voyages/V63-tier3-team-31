import { NavLink } from "react-router";
import Logo from "@/components/common/Logo";
import { navigationItems } from "./navigation-items";

export default function Sidebar() {
    const mainItems = navigationItems.filter(
        (item) => item.path !== "/account",
    );
    const accountItem = navigationItems.find(
        (item) => item.path === "/account",
    );

    const linkClasses = (isActive: boolean) =>
        `flex h-12 items-center justify-center gap-4 rounded-xl px-4
     transition-colors lg:justify-start
     ${isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted"
        }`;

    const renderLink = ({
        label,
        path,
        icon: Icon,
    }: (typeof navigationItems)[number]) => (
        <NavLink
            key={path}
            to={path}
            end
            title={label}
            aria-label={label}
            className={({ isActive }) => linkClasses(isActive)}
        >
            <Icon className="size-5 shrink-0" strokeWidth={1.8} />
            <span className="hidden lg:inline">{label}</span>
        </NavLink>
    );

    return (
        <aside className="flex h-screen w-24 flex-col border-r border-border bg-white lg:w-72.5">
            {/* Logo */}
            <div className="flex h-18 items-center justify-center border-b border-border lg:justify-start lg:px-7">
                <div className="lg:hidden">
                    <Logo showText={false} />
                </div>

                <div className="hidden lg:block">
                    <Logo />
                </div>
            </div>

            {/* Main navigation */}
            <nav
                aria-label="Dashboard navigation"
                className="flex-1 space-y-2 px-3 py-5 lg:px-5"
            >
                {mainItems.map(renderLink)}
            </nav>

            {/* Account at the bottom */}
            <div className="border-t border-border px-3 py-4 lg:px-5">
                {accountItem && renderLink(accountItem)}
            </div>
        </aside>
    );
}