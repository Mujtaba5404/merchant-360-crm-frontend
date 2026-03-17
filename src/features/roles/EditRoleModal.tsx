import React from "react";
import { Button, Modal, Paper, ScrollArea, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useForm, type UseFormReturnType } from "@mantine/form";
import { useGetAllModelsQuery, useUpdateRoleMutation } from "../../api/role";
import Select from "../../components/Select";
import SCOPE from "../../constants/SCOPE";
import PermissionCheckboxes from "./PermissionCheckBoxes";

export interface Permission {
  model: string;
  actions: string[];
  modelUpdateFields?: string[];
}

export interface Role {
  _id: string;
  title: string;
  scope: string;
  permissions: Permission[];
  indexPath: string;
}

export interface Model {
  name: string;
  [key: string]: any;
}

interface EditRoleModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  role: Role;
}

const scopeOptions = Object.values(SCOPE).map((item) => ({ title: item, value: item }));

const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen = false, onClose = () => {}, role }) => {
  const models = useGetAllModelsQuery();
  
  const updateRoleMutation = useUpdateRoleMutation();

  const form: UseFormReturnType<Role> = useForm<Role>({
    initialValues: {
      title: role.title,
      scope: role.scope,
      permissions: role.permissions,
      indexPath: role.indexPath,
    },
    transformValues: (values) => ({
      ...values,
      permissions: values.permissions.filter((permission) => !!permission.model),
    }),
  });

  const handleSubmit = (values: Role) => {
    updateRoleMutation.mutate({ roleId: role._id, payload: values }, { onSuccess: onClose });
  };

  const getModelIndex = (modelName: string) =>
    form.getValues().permissions.findIndex((permission) => permission.model.toLowerCase() === modelName.toLowerCase());

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

    if (modelIndex !== -1 && actions.length === 0) {
      form.removeListItem("permissions", modelIndex);
    }
  };

  const handleUpdateFieldsChange = ({ model = "", fields = [] }: { model: string; fields: string[] }) => {
    const modelIndex = getModelIndex(model);
    if (modelIndex === -1) return;

    const modelActions = form.getValues().permissions[modelIndex]?.actions || [];
    const canEdit = ["PATCH", "PUT"].some((method) => modelActions.includes(method.toUpperCase()));

    if (canEdit) {
      form.setFieldValue(`permissions.${modelIndex}.modelUpdateFields`, fields);
    }
  };

  return (
    <Modal title="Update Role" tt="capitalize" opened={isOpen} onClose={onClose}>
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
          <TextInput required label="Index Path" data-autofocus {...form.getInputProps("indexPath")} />

          {models.isLoading && <Skeleton height={36} />}

          {models.isSuccess && models.data?.length > 0 && (
            <Stack gap={2}>
              <Text size="sm" fw={500}>
                Permissions
              </Text>

              <Paper withBorder p="sm" pr={0}>
                <ScrollArea h={200}>
                  <Stack>
                    {models.data.map((model: Model, index: number) => (
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
          )}

          <Button type="submit" fullWidth mt="md" loading={updateRoleMutation.isPending}>
            Update Role
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditRoleModal;