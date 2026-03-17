import {
  Button,
  Modal,
  PasswordInput,
  ScrollArea,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useUpdateUserMutation } from "../../api/user";
import RolesSelect from "../roles/RolesSelect";

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  roleAndPermissions?: { _id: string };
  isActive: boolean;
}

interface EditUserFormValues {
  name: string;
  email: string;
  password?: string;
  roleAndPermissions: string;
  isActive: boolean;
}

interface EditUserModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  user: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen = false,
  onClose = () => {},
  user,
}) => {
  const updateUserMutation = useUpdateUserMutation();

  const form: any = useForm<EditUserFormValues>({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      roleAndPermissions: user.roleAndPermissions?._id || "",
      isActive: user.isActive,
    },
  });

  const handleSubmit = (values: EditUserFormValues) => {
    updateUserMutation.mutate(
      { userId: user._id, payload: values },
      {
        onSuccess: () => {
          onClose();
          form.setFieldValue("password", "");
        },
      },
    );
  };

  return (
    <Modal
      title="Update User"
      tt="capitalize"
      opened={isOpen}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput
              required
              label="Name"
              data-autofocus
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              type="email"
              label="Email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Type only for a new password"
              {...form.getInputProps("password")}
            />
            <RolesSelect
              selectProps={{
                required: true,
                label: "Role",
                ...form.getInputProps("roleAndPermissions"),
              }}
            />
            <Switch
              label="Is Active"
              {...form.getInputProps("isActive", { type: "checkbox" })}
            />
          </Stack>
        </ScrollArea>

        <Button
          fullWidth
          type="submit"
          mt="md"
          loading={updateUserMutation.isPending}
        >
          Update User
        </Button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
