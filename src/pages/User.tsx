import { Stack } from "@mantine/core";
import AddUserModalButton from "../features/users/AddUserModalButton";

const User: React.FC = () => {
  return (
    <Stack gap="xl">
      <AddUserModalButton />
    </Stack>
  );
};

export default User;
