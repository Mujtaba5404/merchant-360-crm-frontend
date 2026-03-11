import React, { ReactNode } from "react";
import { ActionIcon, Badge, Button, Indicator, Tooltip } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

interface SidebarLink {
  title: string;
  path: string;
  icon: ReactNode;
}

interface DashboardSidebarLinkProps {
  link: SidebarLink;
  indicatorCount?: number;
  sidebarCollapsed?: boolean;
}

// Indicator wrapper
const IndicatorWrapper: React.FC<{ enabled: boolean; children: ReactNode }> = ({ enabled, children }) => {
  if (!enabled) return <>{children}</>;
  return (
    <Indicator size={10} offset={2} processing withBorder>
      {children}
    </Indicator>
  );
};

const DashboardSidebarLink: React.FC<DashboardSidebarLinkProps> = ({
  link,
  indicatorCount = 0,
  sidebarCollapsed = false,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(link.path);
  const variant: "filled" | "subtle" = isActive ? "filled" : "subtle";

  if (sidebarCollapsed) {
    return (
      <IndicatorWrapper enabled={indicatorCount > 0}>
        <Tooltip label={link.title} tt="capitalize" position="right" withArrow>
          <ActionIcon
            h={36}
            size="lg"
            variant={variant}
            component={Link}
            to={link.path}
          >
            {link.icon}
          </ActionIcon>
        </Tooltip>
      </IndicatorWrapper>
    );
  }

  return (
    <Button
      variant={variant}
      tt="capitalize"
      justify="flex-start"
      px={4}
      leftSection={link.icon}
      rightSection={
        indicatorCount > 0 && (
          <Badge
            w={24}
            circle
            color={variant === "filled" ? "white" : undefined}
          >
            {indicatorCount > 9 ? "9+" : indicatorCount}
          </Badge>
        )
      }
      component={Link}
      to={link.path}
      styles={{ label: { flex: 1 } }}
    >
      {link.title}
    </Button>
  );
};

export default DashboardSidebarLink;