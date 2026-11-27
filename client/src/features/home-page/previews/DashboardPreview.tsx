
interface StatCardProps {
  label: string;
  value: string;
  description: string;
  valueClass?: string;
  descriptionClass?: string;
}

function StatCard({
  label,
  value,
  description,
  valueClass = "text-foreground",
  descriptionClass = "text-muted-foreground",
}: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="caption-text text-muted-foreground">
        {label}
      </p>

      <p className={`mt-1 text-2xl font-bold ${valueClass}`}>
        {value}
      </p>

      <p className={`mt-1 text-xs ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border bg-card text-left shadow-xl">

      {/* Browser header */}
      <div className="relative flex items-center border-b bg-muted px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-error/80" />
          <span className="size-3 rounded-full bg-warning" />
          <span className="size-3 rounded-full bg-success" />
        </div>

        <div className="mx-auto w-1/3 rounded-sm border bg-background px-2 py-1 text-center text-[10px] text-muted-foreground">
          app.eventsphere.io/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="bg-muted/40 p-4 sm:p-6 md:p-8">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h3>Upcoming Events</h3>

            <p className="caption-text text-muted-foreground">
              Real-time status across your gatherings
            </p>
          </div>

          <span className="caption-text whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-primary">
            3 Active
          </span>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Registered"
            value="248"
            description="+18% this month"
            descriptionClass="text-status-ongoing-text"
          />

          <StatCard
            label="Checked In Today"
            value="94%"
            description="142 of 150 guests"
            valueClass="text-primary"
          />

          <StatCard
            label="Avg. Arrival Time"
            value="6:42 PM"
            description="On schedule"
            descriptionClass="text-status-ongoing-text"
          />
        </div>

        {/* Events table */}
        <div className="mt-6 overflow-x-auto rounded-lg border bg-card">
          <table className="w-full whitespace-nowrap text-left">

            <thead className="border-b">
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="p-4 font-medium">
                  Event
                </th>

                <th scope="col" className="p-4 font-medium">
                  Date
                </th>

                <th scope="col" className="p-4 font-medium">
                  Capacity
                </th>

                <th scope="col" className="p-4 text-right font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="body-regular">
              <tr className="border-b">
                <td className="p-4 font-medium">
                  Design Systems Meetup #4
                </td>

                <td className="p-4 text-muted-foreground">
                  Oct 24, 6:00 PM
                </td>

                <td className="p-4">
                  120 / 120
                </td>

                <td className="p-4 text-right">
                  <span className="caption-text rounded bg-status-ongoing-bg px-2 py-1 text-status-ongoing-text">
                    Live Now
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-medium">
                  Founders &amp; Builders Dinner
                </td>

                <td className="p-4 text-muted-foreground">
                  Nov 02, 7:30 PM
                </td>

                <td className="p-4">
                  28 / 30
                </td>

                <td className="p-4 text-right">
                  <span className="caption-text rounded bg-status-upcoming-bg px-2 py-1 text-status-upcoming-text">
                    Upcoming
                  </span>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}