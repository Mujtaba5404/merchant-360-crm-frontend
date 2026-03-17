import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetUsersWithPaginationQuery } from "../../api/user";
import Placeholder from "../../components/Placeholder";
import AddUserModalButton from "./AddUserModalButton";
import UsersList from "./UserList";

const Users = () => {
  const users = useGetUsersWithPaginationQuery();

  return (
    <Stack gap={"xl"}>
      <AddUserModalButton />

      {users.isLoading && <Loader />}

      {users.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

      {users.isSuccess && !users.data?.meta.totalCount && <Placeholder title={"No users to display"} icon={<IconFiles size={50} />} />}

      {users.isSuccess && !!users.data?.meta.totalCount && <UsersList users={users.data.data} />}
    </Stack>
  );
};

export default Users;
