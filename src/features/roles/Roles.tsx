import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllRolesQuery } from "../../api/role";
import Placeholder from "../../components/Placeholder";
import AddRoleModalButton from "./AddRoleModalButton";
import RolesList from "./RoleList";

const Roles = () => {
  const roles = useGetAllRolesQuery();

  return (
    <Stack gap={"xl"}>
      <AddRoleModalButton />

      {roles.isLoading && <Loader />}

      {roles.isError && (
        <Placeholder title={"Error"} icon={<IconX size={50} />} />
      )}

      {roles.isSuccess && !roles.data?.length && (
        <Placeholder
          title={"No roles to display"}
          icon={<IconFiles size={50} />}
        />
      )}

      {roles.isSuccess && !!roles.data?.length && (
        <RolesList roles={roles.data} />
      )}
    </Stack>
  );
};

export default Roles;
