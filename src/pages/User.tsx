import { Stack } from "@mantine/core";
import AddUserModalButton from "../features/users/AddUserModalButton";

const Users: React.FC = () => {
  return (
    <Stack gap="xl">
      <AddUserModalButton />
    </Stack>
  );
};

export default Users;
