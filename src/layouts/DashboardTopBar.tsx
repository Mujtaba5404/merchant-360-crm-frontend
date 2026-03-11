import React from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";

// Props interface
interface DashboardTopbarProps {
  sidebarCollapsed?: boolean;
  handleSidebarCollapse?: () => void;
}

// Auth type
interface Auth {
  name?: string;
  [key: string]: any;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  sidebarCollapsed = false,
  handleSidebarCollapse = () => {},
}) => {
  const [auth] = useLocalStorage<Auth | null>({
    key: "auth",
    getInitialValueInEffect: false,
  });

  return (
    <Group h="100%" justify="flex-end">
      
      {/* <Logo h={36} /> */}

      {/* Sidebar toggle button */}
      <ActionIcon
        title="Toggle sidebar"
        variant="light"
        size="lg"
        onClick={handleSidebarCollapse}
        mr="auto"
      >
        {sidebarCollapsed ? (
          <IconLayoutSidebarLeftExpand />
        ) : (
          <IconLayoutSidebarLeftCollapse />
        )}
      </ActionIcon>

      {/* Greeting text */}
      <Text tt="capitalize" visibleFrom="sm">
        👋 Hi, {auth?.name || "User"}!
      </Text>
    </Group>
  );
};

export default DashboardTopbar;