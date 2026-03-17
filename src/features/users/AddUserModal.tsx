import { Button, Modal, PasswordInput, ScrollArea, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useCreateUserMutation } from "../../api/user";
import RolesSelect from "../roles/RolesSelect";

interface BrandAlias {
  brand: string;
  name: string;
  email: string;
}

interface AddUserFormValues {
  name: string;
  email: string;
  password: string;
  brands: string[];
  usesBrandAliases: boolean;
  brandAliases?: BrandAlias[];
  roleAndPermissions: string;
  isActive: boolean;
}

interface AddUserModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen = false, onClose = () => {} }) => {
  const createUserMutation = useCreateUserMutation();

 const form = useForm<AddUserFormValues>({
  initialValues: {
    name: "",
    email: "",
    password: "Abcd1234",
    roleAndPermissions: "",
    isActive: true,
  },
  transformValues: (values) => {
    if (!values.usesBrandAliases) {
      delete values.brandAliases;
    }
    return values;
  },
});

  useEffect(() => {
    const selectedBrands = form.values.brands;
    const usesBrandAliases = form.values.usesBrandAliases;
    const existingAliases = form.values.brandAliases || [];

    if (usesBrandAliases) {
      const updatedAliases = selectedBrands.map((brandId) => {
        const existing = existingAliases.find((alias) => alias.brand === brandId);
        return existing || { brand: brandId, name: "", email: "" };
      });

      form.setFieldValue("brandAliases", updatedAliases);
    } else if (existingAliases.length > 0) {
      form.setFieldValue("brandAliases", []);
    }
  }, [form.values.usesBrandAliases, JSON.stringify(form.values.brands)]);

  const handleSubmit = (values: AddUserFormValues) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title="Create User" tt="capitalize" opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput required label="Name" data-autofocus {...form.getInputProps("name")} />
            <TextInput required type="email" label="Email" {...form.getInputProps("email")} />
            <PasswordInput required label="Password" {...form.getInputProps("password")} />
            <RolesSelect selectProps={{ required: true, label: "Role", ...form.getInputProps("roleAndPermissions") }} />
            <Switch label="Is Active" {...form.getInputProps("isActive", { type: "checkbox" })} />
          </Stack>
        </ScrollArea>

        <Button fullWidth type="submit" mt="md" loading={createUserMutation.isPending}>
          Create User
        </Button>
      </form>
    </Modal>
  );
};

export default AddUserModal;