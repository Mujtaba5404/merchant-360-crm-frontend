import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import DeleteRoleButton from "./DeleteRoleButton";
import EditRoleModalButton from "./EditRoleModalButton";

const RolesList: React.FC<any> = ({ roles = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {roles.map((role: any) => (
        <Paper key={role._id} p="sm" withBorder>
          <Group gap="sm" justify="space-between">
            <Text fw={500} tt="capitalize" mr="auto">
              {role.title}
            </Text>

            <EditRoleModalButton role={role} />

            <DeleteRoleButton roleId={role._id} />
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
};

export default RolesList;
