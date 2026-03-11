import React from "react";
import { Stack } from "@mantine/core";
import {
  IconCoin,
  IconListCheck,
  IconPackage,
  IconTargetArrow,
  IconUsers,
} from "@tabler/icons-react";
import CanAccess from "../components/CanAccess";
import DashboardSidebarLink from "./DashboardSideBarLink";

// Define the link type
interface SidebarLink {
  title: string;
  path: string;
  resource: string;
  icon: React.ReactNode;
  indicator?: {
    queryKey: string;
  };
}

// Props type
interface DashboardSidebarProps {
  sidebarCollapsed?: boolean;
}

// Static links
const links: SidebarLink[] = [
  { title: "leads", path: "/leads", resource: "lead", icon: <IconTargetArrow size={20} /> },
  { title: "box specifications", path: "/box-specifications", resource: "boxSpecification", icon: <IconPackage size={20} />, indicator: { queryKey: "boxSpecifications" } },
  { title: "deals", path: "/deals", resource: "deal", icon: <IconUsers size={20} /> },
  { title: "orders", path: "/orders", resource: "order", icon: <IconCoin size={20} /> },
  { title: "tasks", path: "/tasks", resource: "task", icon: <IconListCheck size={20} /> },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ sidebarCollapsed = false }) => {
  // Placeholder indicators (since API removed)
  const indicators: Record<string, number> = {
    boxSpecifications: 3, // example static count
  };

  return (
    <Stack>
      {links.map((link, index) => (
        <CanAccess key={index} modelName={link.resource} action="get">
          <DashboardSidebarLink
            link={link}
            indicatorCount={link.indicator ? indicators[link.indicator.queryKey] : undefined}
            sidebarCollapsed={sidebarCollapsed}
          />
        </CanAccess>
      ))}
    </Stack>
  );
};

export default DashboardSidebar;