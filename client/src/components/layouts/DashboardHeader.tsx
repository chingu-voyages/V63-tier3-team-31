import Logo from "../common/Logo";

type DashboardHeaderProps = {
  userName?: string;
};

export default function DashboardHeader({
  userName = "Guest",
}: DashboardHeaderProps) {
  const initials =
    userName === "Guest"
      ? "G"
      : userName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((name) => name[0]?.toUpperCase())
        .join("");

  return (
    <header className="flex h-18 w-full shrink-0 items-center justify-between border-b border-border bg-white px-5 md:justify-end md:px-8">
      <div className="md:hidden">
        <Logo />
      </div>

      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-sm font-semibold text-primary">
        {initials}
      </div>
    </header>
  );
}