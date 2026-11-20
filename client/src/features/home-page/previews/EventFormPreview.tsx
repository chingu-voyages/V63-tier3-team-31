
interface PreviewFieldProps {
    label: string;
    value: string;
}

function PreviewField({
    label,
    value,
}: PreviewFieldProps) {
    return (
        <div>
            <p className="caption-text text-muted-foreground">
                {label}
            </p>

            <div className="mt-1 rounded-sm border bg-muted px-3 py-2 text-xs">
                {value}
            </div>
        </div>
    );
}


export default function EventFormPreview() {
    return (
        <div className="preview-container">
            <div className="preview-card">

                <div className="flex items-center justify-between border-b pb-3">
                    <p className="body-medium">
                        New Event Form
                    </p>

                    <span className="caption-text text-primary">
                        Step 1 of 2
                    </span>
                </div>

                <div className="mt-4 space-y-4">

                    <PreviewField
                        label="Event Title"
                        value="Community Demo Night #12"
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                        <PreviewField
                            label="Date & Time"
                            value="Nov 14, 2026 • 6:30 PM"
                        />

                        <PreviewField
                            label="Capacity"
                            value="85 attendees"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}