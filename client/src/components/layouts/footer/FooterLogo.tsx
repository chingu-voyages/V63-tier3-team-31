import { CalendarCheck } from "lucide-react";

export default function FooterLogo() {
    return (
        <a
            href="#home"
            className="inline-flex items-center gap-3"
        >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CalendarCheck size={22} />
            </div>

            <span className="text-xl font-semibold">
                EventSphere AI
            </span>
        </a>
    );
}