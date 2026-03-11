import React, { useEffect } from "react";
import { AppShell } from "@mantine/core";
import {
  useDebouncedValue,
  useLocalStorage,
  useViewportSize,
} from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSideBar";
import DashboardTopbar from "./DashboardTopBar";

const DashboardLayout: React.FC = () => {
  const { width } = useViewportSize();
  const [debouncedWidth] = useDebouncedValue(width, 250);

  // Sidebar collapsed state stored in localStorage
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage<boolean>({
    key: "sidebar-collapsed",
    defaultValue: true,
    getInitialValueInEffect: false,
  });

  const sidebarWidth = sidebarCollapsed ? 60 : 225;

  const handleSidebarCollapse = () => setSidebarCollapsed((prev) => !prev);
  useEffect(() => {
    if (debouncedWidth < 992 && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [debouncedWidth, sidebarCollapsed]);

  return (
    <AppShell
      padding="md"
      styles={{ navbar: { transition: "width 200ms" } }}
      navbar={{ width: sidebarWidth }}
      header={{ height: 60 }}
    >
      <AppShell.Navbar px="sm" py="md">
        <DashboardSidebar sidebarCollapsed={sidebarCollapsed} />
      </AppShell.Navbar>

      <AppShell.Header px="md">
        <DashboardTopbar
          sidebarCollapsed={sidebarCollapsed}
          handleSidebarCollapse={handleSidebarCollapse}
        />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
