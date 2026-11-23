export default function MobileDashboardPreview() {
    return (
        <div className="mx-auto mt-8 w-full max-w-sm rounded-[36px] border-[5px] border-foreground bg-card p-4 shadow-xl">

            <div className="mx-auto mb-4 h-4 w-32 rounded-full bg-foreground" />

            <div className="rounded-2xl bg-primary p-4 text-left text-primary-foreground">

                <div className="flex items-center justify-between gap-2">
                    <span className="body-medium uppercase tracking-wider opacity-75">
                        Active Event
                    </span>

                    <span className="caption-text rounded-md bg-white/20 px-2 py-1">
                        Live
                    </span>
                </div>

                <h3 className="mt-2 font-bold">
                    Design Systems Workshop
                </h3>

                <p className="body-regular mt-1 opacity-85">
                    Tomorrow · 42 Attending
                </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-left">

                <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <p className="body-regular text-muted-foreground">
                        Check-ins
                    </p>

                    <p className="mt-1 text-xl font-bold">
                        28 / 42
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-3 shadow-sm">
                    <p className="body-regular text-muted-foreground">
                        Turnout Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-primary">
                        67%
                    </p>
                </div>

            </div>
        </div>
    );
}