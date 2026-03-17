import { Box, Paper } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardTopbar from "./DashboardTopBar";

const DashboardLayout: React.FC = () => {
  return (
    <>
      <Paper radius={0} py={"md"}>
        <DashboardTopbar />
      </Paper>

      <Box p={"md"}>
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
