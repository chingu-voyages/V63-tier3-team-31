import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import { CalendarDays, ChartNoAxesColumn, SquareCheckBig, Users } from "lucide-react";
import EventFormPreview from "../previews/EventFormPreview";
import AttendeeListPreview from "../previews/AttendeeListPreview";
import CheckInPreview from "../previews/CheckInPreview";
import AnalyticsPreview from "../previews/AnalyticsPreview";

interface FeatureRowProps {
    icon: ReactNode;
    title: string;
    description: string;
    reversed?: boolean;
    children: ReactNode;
}

function FeatureRow({
    icon,
    title,
    description,
    reversed = false,
    children,
}: FeatureRowProps) {
    return (
        <article className="grid items-center gap-8 md:grid-cols-2">

            <div className={reversed ? "md:order-2" : ""}>
                <div className="feature-icon">
                    {icon}
                </div>

                <h3 className="feature-title">
                    {title}
                </h3>

                <p className="body-regular mt-3 leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </div>

            <div className={reversed ? "md:order-1" : ""}>
                {children}
            </div>

        </article>
    );
}

export default function FeaturesSection() {
    return (
        <section className="white-container landing-section">
            <div className="landing-container">

                <SectionHeading
                    title="Everything you need to run your event"
                    description="Built purposefully for meetups, mixers, and conferences with zero bloat."
                />

                <div className="space-y-12 md:space-y-16">

                    <FeatureRow
                        icon={<CalendarDays size={22} />}
                        title="Create Events"
                        description="Set up your event with dates, venue, ticket price and capacity in minutes."
                    >
                        <EventFormPreview />
                    </FeatureRow>

                    <FeatureRow
                        icon={<Users size={22} />}
                        title="Manage Attendees"
                        description="Add attendees, search the list and keep every registration in one place."
                        reversed
                    >
                        <AttendeeListPreview />
                    </FeatureRow>

                    <FeatureRow
                        icon={<SquareCheckBig size={22} />}
                        title="Live Check-in"
                        description="Check guests in at the door, prevent duplicates and undo mistakes."
                    >
                        <CheckInPreview />
                    </FeatureRow>

                    <FeatureRow
                        icon={<ChartNoAxesColumn size={22} />}
                        title="AI Analytics"
                        description="Get attendance charts and plain-language insights after your event."
                        reversed
                    >
                        <AnalyticsPreview />
                    </FeatureRow>

                </div>
            </div>
        </section>
    );
}