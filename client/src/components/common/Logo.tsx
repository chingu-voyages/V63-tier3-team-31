
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router";

type LogoProps = {
    showText?: boolean;
    className?: string;
};

export default function Logo({
    showText = true,
    className = "",
}: LogoProps) {

    return (
        <Link
            to="/"
            aria-label="EventSphere AI home"
            className={`inline-flex items-center gap-3 ${className}`}
        >
            <div
                className="flex shrink-0 items-center justify-center bg-primary size-9 rounded-xl"
            >
                <CalendarCheck
                    size={18}
                    strokeWidth={1.8}
                    className="text-primary-foreground"
                />
            </div>

            {showText && (
                <span
                    className="font-bold tracking-tight text-foreground text-[22px]"
                >
                    EventSphere AI
                </span>
            )}
        </Link>
    );
}
