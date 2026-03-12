import React from "react";
import { Checkbox, Chip, Group, Stack, Text } from "@mantine/core";

interface Action {
  method: string;
  title: string;
}

interface Model {
  model: string;
  actions: Action[];
  modelUpdateFields: string[];
}

interface Permission {
  model: string;
  actions: string[];
  modelUpdateFields: string[];
}

interface PermissionCheckboxesProps {
  model: Model;
  permissionValues?: Permission[];
  onActionsChange: (payload: { model: string; actions: string[] }) => void;
  onUpdateFieldsChange: (payload: { model: string; fields: string[] }) => void;
}

const PermissionCheckboxes: React.FC<PermissionCheckboxesProps> = ({
  model,
  permissionValues = [],
  onActionsChange,
  onUpdateFieldsChange,
}) => {
  const permission = permissionValues.find(
    (p) => p.model?.toLowerCase() === model.model.toLowerCase(),
  );

  const permissionActions = permission?.actions || [];
  const permissionUpdateFields = permission?.modelUpdateFields || [];

  const canEdit = permissionActions.some((action) =>
    ["PATCH", "PUT"].includes(action.toUpperCase()),
  );

  const handleActionsChange = (actions: string[]) =>
    onActionsChange({ model: model.model, actions });

  const handleUpdateFieldsChange = (fields: string[]) =>
    onUpdateFieldsChange({ model: model.model, fields });

  return (
    <>
      <Checkbox.Group
        label={model.model}
        value={permissionActions}
        onChange={handleActionsChange}
      >
        <Group mt="xs">
          {model.actions.map((action) => (
            <Checkbox
              key={action.method}
              label={action.title}
              value={action.method}
            />
          ))}
        </Group>
      </Checkbox.Group>

      {canEdit && (
        <Stack gap={4}>
          <Text size="sm" fw={500}>
            Select fields:
          </Text>
          <Chip.Group
            multiple
            value={permissionUpdateFields}
            onChange={handleUpdateFieldsChange}
          >
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
