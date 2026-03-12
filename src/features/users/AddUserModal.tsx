import {
  Button,
  Modal,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface AddUserFormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

interface AddUserModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const form = useForm<AddUserFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      isActive: true,
    },
  });

  const handleSubmit = (values: AddUserFormValues) => {
    console.log(values);
    onClose();
    form.reset();
  };

  return (
    <Modal title="create user" tt="capitalize" opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Name"
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            type="email"
            label="Email"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            required
            label="Password"
            {...form.getInputProps("password")}
          />

          <TextInput
            required
            label="Role"
            {...form.getInputProps("role")}
          />

          <Switch
            label="Is Active"
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />

          <Button fullWidth type="submit" mt={"md"}>
            Create User
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddUserModal;