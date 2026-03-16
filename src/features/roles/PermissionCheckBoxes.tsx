import React from "react";
import { Checkbox, Chip, Group, Stack, Text } from "@mantine/core";

interface Action {
  method: string;
  title: string;
}

interface Model {
  model?: string;
  actions?: Action[];
  modelUpdateFields?: string[];
}

interface PermissionCheckboxesProps {
  model?: Model;
}

const PermissionCheckboxes: React.FC<PermissionCheckboxesProps> = ({
  model,
}) => {
  if (!model) return null;

  return (
    <>
      <Checkbox.Group label={model.model || "Permissions"}>
        <Group mt="xs">
          {Array.isArray(model.actions) &&
            model.actions.map((action) => (
              <Checkbox
                key={action.method}
                label={action.title}
                value={action.method}
              />
            ))}
        </Group>
      </Checkbox.Group>

      {Array.isArray(model.modelUpdateFields) &&
        model.modelUpdateFields.length > 0 && (
          <Stack gap={4} mt="sm">
            <Text size="sm" fw={500}>
              Select fields:
            </Text>

            <Chip.Group multiple>
              <Group gap="xs">
                {model.modelUpdateFields.map((field) => (
                  <Chip key={field} size="xs" value={field}>
                    {field}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Stack>
        )}
    </>
  );
};

export default PermissionCheckboxes;
