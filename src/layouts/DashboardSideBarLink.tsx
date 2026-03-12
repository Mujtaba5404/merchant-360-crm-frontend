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

const IndicatorWrapper: React.FC<{ enabled: boolean; children: ReactNode }> = ({
  enabled,
  children,
}) =>
  enabled ? (
    <Indicator size={10} offset={2} processing withBorder>
      {children}
    </Indicator>
  ) : (
    <>{children}</>
  );

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
        <Tooltip label={link.title} position="right" withArrow>
          <ActionIcon
            h={36}
            size="lg"
            variant={variant}
            component={Link}
            to={link.path}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
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
      justify="flex-start"
      px={12}
      py={6}
      leftSection={<span>{link.icon}</span>}
      rightSection={
        indicatorCount > 0 && (
          <Badge w={24} circle color={isActive ? "white" : "orange"}>
            {indicatorCount > 9 ? "9+" : indicatorCount}
          </Badge>
        )
      }
      component={Link}
      to={link.path}
    >
      {link.title}
    </Button>
  );
};

export default DashboardSidebarLink;
