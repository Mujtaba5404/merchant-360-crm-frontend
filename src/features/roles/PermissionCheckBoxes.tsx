import { Checkbox, Chip, Group, Stack, Text } from "@mantine/core";

const PermissionCheckboxes = ({ model, permissionValues = [], onActionsChange, onUpdateFieldsChange }) => {
  const modelIndex = permissionValues.findIndex((permission) => permission.model.toLowerCase() === model.model.toLowerCase());

  const permissionActions = permissionValues[modelIndex]?.actions || [];
  const permissionUpdateFields = permissionValues[modelIndex]?.modelUpdateFields || [];

  const canEdit = ["PATCH", "PUT"].some((method) => permissionActions.includes(method.toUpperCase()));

  const handleActionsChange = (actions) => onActionsChange({ model: model.model, actions });
  const handleUpdateFieldsChange = (fields) => onUpdateFieldsChange({ model: model.model, fields });

  return (
    <>
      <Checkbox.Group label={model.model} value={permissionActions} onChange={handleActionsChange}>
        <Group mt={"xs"}>
          {model.actions.map((action, index) => {
            return <Checkbox key={index} label={action.title} value={action.method} />;
          })}
        </Group>
      </Checkbox.Group>

      {canEdit && (
        <Stack gap={4}>
          <Text size="sm" fw={500}>
            Select fields:
          </Text>
          <Chip.Group multiple value={permissionUpdateFields} onChange={handleUpdateFieldsChange}>
            <Group gap={"xs"}>
              {model.modelUpdateFields.map((field, index) => {
                return (
                  <Chip key={index} size="xs" value={field}>
                    {field}
                  </Chip>
                );
              })}
            </Group>
          </Chip.Group>
        </Stack>
      )}
    </>
  );
};

export default PermissionCheckboxes;
