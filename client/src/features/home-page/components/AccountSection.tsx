import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Guest",
    badge: "Quick Try",
    description:
      "Ideal for trying out the platform instantly with zero commitment.",
    features: [
      "Create and edit events",
      "Add attendees & manage list",
      "Check guests in live",
    ],
    buttonText: "Continue as Guest",
    highlighted: false,
  },
  {
    title: "Host Account",
    badge: "Registered",
    description:
      "For regular hosts and growing communities that want full superpowers.",
    features: [
      "Everything in Guest",
      "AI Analytics & Attendance Insights",
      "CSV Data Export & Cloud Backup",
      "Persistent multi-event dashboard",
    ],
    buttonText: "Create Free Account",
    highlighted: true,
  },
];

export default function AccountSection() {
  return (
    <section className="white-container landing-section">
      <div className="landing-container">

        <SectionHeading
          title="Start free, upgrade anytime"
          description="Choose how you want to experience EventFlow."
        />

        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">

          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`relative flex flex-col rounded-xl border p-6 ${plan.highlighted
                ? "border-primary bg-card shadow-sm"
                : "border-border bg-muted"
                }`}
            >

              {plan.highlighted && (
                <span className="caption-text absolute -top-3 right-5 rounded-full bg-primary px-3 py-1 uppercase tracking-wide text-primary-foreground">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-center justify-between gap-2">
                <h2>{plan.title}</h2>

                {!plan.highlighted && (
                  <span className="caption-text rounded-full bg-secondary px-2 py-1 text-secondary-foreground">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="body-regular mt-3 leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-success"
                      aria-hidden="true"
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  className="w-full"
                  variant={
                    plan.highlighted
                      ? "default"
                      : "outline"
                  }
                >
                  {plan.buttonText}
                </Button>
              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}