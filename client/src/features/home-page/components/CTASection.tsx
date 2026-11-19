import { Button } from "@/components/ui/button";

export default function CTASection() {
    return (
        <section className="bg-primary px-6 py-16 text-center text-primary-foreground">

            <div className="mx-auto max-w-3xl">

                <h2 className="section-title">
                    Ready to run your next event?
                </h2>

                <p className="mt-4 text-sm text-primary-foreground/80">
                    Get started in seconds — no account
                    required to explore.
                </p>

                <Button
                    size="lg"
                    className="mt-8 bg-background text-primary hover:bg-background/90"
                >
                    Get Started
                </Button>

            </div>
        </section>
    );
}