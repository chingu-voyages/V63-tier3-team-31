
export default function AnalyticsPreview() {
  return (
    <div className="preview-container">
      <div className="preview-card">

        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-sm bg-primary/10 text-xs font-semibold text-primary">
            AI
          </span>

          <p className="body-medium">
            Turnout &amp; Engagement Summary
          </p>
        </div>

        <blockquote className="mt-4 rounded-md border bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          “Peak arrival occurred between 6:30 and
          6:45 PM (68% of guests). 84% final turnout
          exceeded the category benchmark by 12%.”
        </blockquote>

        <div className="mt-3 grid grid-cols-2 gap-3">

          <div className="rounded-sm border bg-muted p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Retention Rate
            </p>

            <p className="mt-1 font-semibold">
              91.4%
            </p>
          </div>

          <div className="rounded-sm border bg-muted p-3 text-center">
            <p className="text-xs text-muted-foreground">
              No-show Rate
            </p>

            <p className="mt-1 font-semibold text-warning">
              8.6%
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}