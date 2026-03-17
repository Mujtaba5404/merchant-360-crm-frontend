import React from "react";
import { Paper, Text } from "@mantine/core";

interface PlaceholderProps {
  title?: string;
  icon?: React.ReactNode;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title = "", icon }) => {
  return (
    <Paper p="md" withBorder ta="center" c="dimmed">
      {icon}
      <Text size="lg">{title}</Text>
    </Paper>
  );
};

export default Placeholder;