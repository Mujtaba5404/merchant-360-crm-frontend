import React from "react";
import { Avatar, Group, Text, Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "../config/navigationLinks";
import UserMenu from "../components/UserMenu";
import NotificationMenu from "../features/notification/NotificationMenu";

interface Auth {
  name?: string;
  avatarUrl?: string;
}

const DashboardTopbar: React.FC = () => {
  const { pathname } = useLocation();

  const [auth] = useLocalStorage<Auth | null>({
    key: "auth",
    getInitialValueInEffect: false,
  });

  return (
    <Group h="100%" justify="space-between" px="md">
      {/* Logo */}
      <Text fw={700} size="lg">
        LOGO
      </Text>

      <Group gap="md">
        {navigationLinks.map((link, index) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Button
              key={index}
              component={Link}
              to={link.path}
              variant={isActive ? "filled" : "subtle"}
              radius={"xl"}
            >
              {link.title}
            </Button>
          );
        })}
      </Group>

      <Group gap="sm" align="center">
        <Text tt="capitalize">👋 Hi, {auth?.name}!</Text>
      <NotificationMenu />
        <UserMenu />
      </Group>
    </Group>
  );
};

export default DashboardTopbar;
