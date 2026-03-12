import React from "react";
import { Button, Modal, Paper, ScrollArea, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Select from "../../components/Select";
import SCOPE from "../../constants/SCOPE";
import PermissionCheckboxes from "./PermissionCheckBoxes.tsx";

const scopeOptions = Object.values(SCOPE).map((item) => ({ title: item, value: item }));

interface AddRoleModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const mockModels = ["User", "Post", "Comment"]; // replace with your models

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen = false, onClose = () => {} }) => {
  const form = useForm({
    initialValues: {
      title: "",
      scope: "",
      permissions: [{ model: "", actions: [], modelUpdateFields: [] }],
      indexPath: "",
    },
    transformValues: (values) => ({
      ...values,
      permissions: values.permissions.filter((permission) => !!permission.model),
    }),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted:", values);
    onClose();
    form.reset();
  };

  const getModelIndex = (modelName: string) =>
    form.getValues().permissions.findIndex(
      (permission) => permission.model.toLowerCase() === modelName.toLowerCase()
    );

  const handleActionsChange = ({ model = "", actions = [] }: { model: string; actions: string[] }) => {
    const modelIndex = getModelIndex(model);

    if (modelIndex === -1 && actions.length) {
      form.insertListItem("permissions", { model, actions, modelUpdateFields: [] });
    }

    if (modelIndex !== -1 && actions.length) {
      form.setFieldValue(`permissions.${modelIndex}.actions`, actions);
      if (actions.every((action) => !["PATCH", "PUT"].includes(action))) {
        form.setFieldValue(`permissions.${modelIndex}.modelUpdateFields`, []);
      }
    }

    if (modelIndex !== -1 && !actions.length) {
      form.removeListItem("permissions", modelIndex);
    }
  };

  const handleUpdateFieldsChange = ({ model = "", fields = [] }: { model: string; fields: string[] }) => {
    const modelIndex = getModelIndex(model);
    const modelActions = form.getValues().permissions[modelIndex]?.actions || [];
    const canEdit = ["PATCH", "PUT"].some((method) => modelActions.includes(method.toUpperCase()));

    if (canEdit) {
      form.setFieldValue(`permissions.${modelIndex}.modelUpdateFields`, fields);
    }
  };

  return (
    <Modal title="Create Role" tt="capitalize" opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="Title" data-autofocus {...form.getInputProps("title")} />
          <Select
            required
            label="Scope"
            data={scopeOptions}
            selectLabel="title"
            selectValue="value"
            searchable
            capitalizeLabel
            {...form.getInputProps("scope")}
          />
          <TextInput required label="Index Path" {...form.getInputProps("indexPath")} />

          {/* Replace API models with mockModels */}
          {!!mockModels.length ? (
            <Stack gap={2}>
              <Text size="sm" fw={500}>
                Permissions
              </Text>
              <Paper withBorder p="sm" pr={0}>
                <ScrollArea h={200}>
                  <Stack>
                    {mockModels.map((model, index) => (
                      <PermissionCheckboxes
                        key={index}
                        model={model}
                        permissionValues={form.getValues().permissions}
                        onActionsChange={handleActionsChange}
                        onUpdateFieldsChange={handleUpdateFieldsChange}
                      />
                    ))}
                  </Stack>
                </ScrollArea>
              </Paper>
            </Stack>
          ) : (
            <Skeleton height={36} />
          )}

          <Button type="submit" fullWidth mt="md">
            Create Role
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddRoleModal;