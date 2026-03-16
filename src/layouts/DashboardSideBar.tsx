import React from "react";
import { Stack, Button } from "@mantine/core";
import {
  IconTargetArrow,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import CanAccess from "../components/CanAccess";
import DashboardSidebarLink from "./DashboardSideBarLink";

interface SidebarLink {
  title: string;
  path: string;
  resource: string;
  icon: React.ReactNode;
  indicator?: {
    queryKey: string;
  };
}

interface DashboardSidebarProps {
  sidebarCollapsed?: boolean;
}

const links: SidebarLink[] = [
  {
    title: "Merchants",
    path: "/merchant",
    resource: "merchant",
    icon: <IconTargetArrow size={20} />,
  },
  {
    title: "Users",
    path: "/users",
    resource: "users",
    icon: <IconUsersGroup size={18} />,
    indicator: { queryKey: "users" },
  },
  {
    title: "Role's",
    path: "/role",
    resource: "role",
    icon: <IconUsers size={18} />,
  },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebarCollapsed = false,
}) => {
  const indicators: Record<string, number> = {
    boxSpecifications: 3,
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <Stack justify="space-between" style={{ height: "100%" }}>
      <Stack>
        {links.map((link, index) => (
          <CanAccess key={index} modelName={link.resource} action="get">
            <DashboardSidebarLink
              link={link}
              indicatorCount={
                link.indicator ? indicators[link.indicator.queryKey] : undefined
              }
              sidebarCollapsed={sidebarCollapsed}
            />
          </CanAccess>
        ))}
      </Stack>

      <Stack gap="xs">
        <Button variant="subtle" fullWidth>
          Change Password
        </Button>

        <Button fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default DashboardSidebar;
