import React from "react";
import { ActionIcon, Avatar, Group, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";

interface DashboardTopbarProps {
  sidebarCollapsed?: boolean;
  handleSidebarCollapse?: () => void;
}

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

      {/* Avatar */}
      <Avatar
        size="md"
        radius="sm"
        src={
          auth?.avatarUrl ||
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        }
        alt={auth?.name || "User"}
      />
    </Group>
  );
};

export default DashboardTopbar;
