import { Button, Modal, Paper, ScrollArea, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllModelsQuery, useCreateRoleMutation } from "../../api/role";
import Select from "../../components/Select";
import SCOPE from "../../constants/SCOPE";
import PermissionCheckboxes from "./PermissionCheckBoxes";


const scopeOptions = Object.values(SCOPE).map((item) => ({ title: item, value: item }));

const AddRoleModal = ({ isOpen = false, onClose = () => {} }) => {
  const models = useGetAllModelsQuery();
  const createRoleMutation = useCreateRoleMutation();

  const form = useForm({
    initialValues: { title: "", scope: "", permissions: [{ model: "", actions: [], modelUpdateFields: [] }], indexPath: "" },
    transformValues: (values) => ({ ...values, permissions: values.permissions.filter((permission) => !!permission.model) }),
  });

  const handleSubmit = (values: any) => {
    createRoleMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  const getModelIndex = (modelName) => form.getValues().permissions.findIndex((permission) => permission.model.toLowerCase() === modelName.toLowerCase());

  const handleActionsChange = ({ model = "", actions = [] }) => {
    const modelIndex = getModelIndex(model);

    if (modelIndex === -1 && !!actions.length) {
      form.insertListItem("permissions", { model, actions });
    }

    if (modelIndex !== -1 && !!actions.length) {
      form.setFieldValue(`permissions.${modelIndex}.actions`, actions);

      if (actions.every((action) => !["PATCH", "PUT"].includes(action))) {
        form.setFieldValue(`permissions.${modelIndex}.modelUpdateFields`, []);
      }
    }

    if (modelIndex !== -1 && !actions.length) {
      form.removeListItem("permissions", modelIndex);
    }
  };

  const handleUpdateFieldsChange = ({ model = "", fields = [] }) => {
    const modelIndex = getModelIndex(model);

    const modelActions = form.getValues().permissions[modelIndex]?.actions || [];

    const canEdit = ["PATCH", "PUT"].some((method) => modelActions.includes(method.toUpperCase()));

    if (canEdit) {
      form.setFieldValue(`permissions.${modelIndex}.modelUpdateFields`, fields);
    }
  };

  return (
    <Modal title={"create role"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
          <Select required label="scope" data={scopeOptions} selectLabel="title" selectValue="value" searchable capitalizeLabel {...form.getInputProps("scope")} />
          <TextInput required label="index path" data-autofocus {...form.getInputProps("indexPath")} />

          {models.isLoading && <Skeleton height={36} />}

          {models.isSuccess && !!models.data?.length && (
            <Stack gap={2}>
              <Text size="sm" fw={500}>
                permissions
              </Text>

              <Paper withBorder p={"sm"} pr={0}>
                <ScrollArea h={200}>
                  <Stack>
                    {models.data.map((model, index) => {
                      return <PermissionCheckboxes key={index} model={model} permissionValues={form.getValues().permissions} onActionsChange={handleActionsChange} onUpdateFieldsChange={handleUpdateFieldsChange} />;
                    })}
                  </Stack>
                </ScrollArea>
              </Paper>
            </Stack>
          )}

          <Button type="submit" fullWidth mt="md" loading={createRoleMutation.isPending}>
            Create role
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddRoleModal;
