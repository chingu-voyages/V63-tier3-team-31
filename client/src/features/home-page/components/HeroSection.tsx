import { Button } from "@/components/ui/button";
import DashboardPreview from "../previews/DashboardPreview";
import MobileDashboardPreview from "../previews/MobileDashboardPreview";

export default function HeroSection() {
    return (
        <section id="home" className="gray-container landing-section lg:border-b">
            <div className="landing-container text-center">

                <h1 className="hero-title mx-auto max-w-3xl">
                    Streamline your Corporate Events
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                    Make event planning easy with our
                    comprehensive platform. We streamline
                    the process from start to finish, and
                    offer dedicated support to make your
                    events a success.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <Button size="lg">
                        Get Started
                    </Button>

                    <Button size="lg" variant="outline">
                        Continue as Guest
                    </Button>
                </div>

                <p className="caption-text mt-3 text-muted-foreground">
                    No account needed to try it
                </p>
                <div className="hidden md:block">
                    <DashboardPreview />
                </div>

                <div className="md:hidden">
                    <MobileDashboardPreview />
                </div>
            </div>
        </section>
    );
}