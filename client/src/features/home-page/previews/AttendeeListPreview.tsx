
const previewAttendees = [
  {
    name: "Sarah Jenkins",
    id: "REG-4019",
    confirmed: true,
  },
  {
    name: "Marcus Wong",
    id: "REG-4020",
    confirmed: true,
  },
  {
    name: "Elena Rostova",
    id: "REG-4021",
    confirmed: false,
  },
];

export default function AttendeeListPreview() {
  return (
    <div className="preview-container">
      <div className="preview-card">

        <div className="flex items-center justify-between border-b pb-3">
          <p className="body-medium">
            Guest List (124 Registered)
          </p>

          <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
            Search...
          </span>
        </div>

        <div className="mt-3 space-y-2">

          {previewAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className="grid grid-cols-[1.3fr_1fr_auto] items-center gap-2 rounded-sm bg-muted p-3 text-xs"
            >
              <span className="font-medium">
                {attendee.name}
              </span>

              <span className="text-muted-foreground">
                {attendee.id}
              </span>

              <span
                className={`rounded px-2 py-1 font-medium ${attendee.confirmed
                  ? "bg-status-ongoing-bg text-status-ongoing-text"
                  : "bg-warning/15 text-amber-800 dark:text-amber-300"
                  }`}
              >
                {attendee.confirmed
                  ? "Confirmed"
                  : "Pending"}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}