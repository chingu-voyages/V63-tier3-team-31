
interface SectionHeadingProps {
  title: string;
  description: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">
        {description}
      </p>
    </div>
  );
}