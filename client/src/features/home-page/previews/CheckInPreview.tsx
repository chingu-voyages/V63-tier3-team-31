
export default function CheckInPreview() {
  return (
    <div className="preview-container">
      <div className="preview-card">

        <div className="flex items-center justify-between border-b pb-3">
          <p className="body-medium">
            Door Mode Active
          </p>

          <span className="flex items-center gap-1 text-xs text-status-ongoing-text">
            <span className="size-1.5 rounded-full bg-success" />
            Live Sync
          </span>
        </div>

        <div className="mt-3 space-y-2">

          <div className="flex items-center justify-between gap-2 rounded-md border border-status-ongoing-border bg-status-ongoing-bg p-3">
            <div>
              <p className="body-medium text-[#1F2937]">
                Alex Rodriguez
              </p>

              <p className="text-xs text-status-ongoing-text">
                Checked In • 6:44 PM
              </p>
            </div>

            <span className="rounded-sm border bg-white px-3 py-1 text-xs text-gray-500">
              Undo
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-md border p-3">
            <div>
              <p className="body-medium">
                Chloe Miller
              </p>

              <p className="text-xs text-muted-foreground">
                Ticket #084
              </p>
            </div>

            <span className="rounded-sm bg-primary px-3 py-1.5 text-xs text-primary-foreground">
              Check In
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}