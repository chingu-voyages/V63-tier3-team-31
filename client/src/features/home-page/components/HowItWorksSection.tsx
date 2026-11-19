import SectionHeading from "./SectionHeading";

const steps = [
    {
        title: "Create your event",
        description:
            "Set your date, venue, and attendee limit in under two minutes.",
    },
    {
        title: "Add and check in guests",
        description:
            "Upload your guest list or share registration, then check in attendees at the door.",
    },
    {
        title: "Review your results",
        description:
            "See immediate check-in counts, revenue, and post-event attendance breakdowns.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="gray-container landing-section border-y">
            <div className="landing-container">

                <SectionHeading
                    title="How it works"
                    description="Start running smooth events in three simple steps."
                />

                <div className="grid gap-6 md:grid-cols-3">

                    {steps.map((step, index) => (
                        <article
                            key={step.title}
                            className="rounded-xl border bg-card p-6 shadow-sm"
                        >
                            <div className="mb-5 flex size-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                                {index + 1}
                            </div>

                            <h3>{step.title}</h3>

                            <p className="body-regular mt-3 leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
}