import {
  LayoutGrid,
  CalendarDays,
  ClipboardCheck,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

export const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { label: "Events", path: "/events", icon: CalendarDays },
  { label: "Check-in", path: "/check-in", icon: ClipboardCheck },
  { label: "Analytics", path: "/analytics", icon: ChartNoAxesColumn },
  { label: "Account", path: "/account", icon: UserRound },
];