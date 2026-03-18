import React from "react";
import { Avatar, Group, Text, Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "../config/navigationLinks";
import UserMenu from "../components/UserMenu";

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

      {/* Center Navigation */}
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
      <UserMenu />
    </Group>
  );
};

export default DashboardTopbar;
