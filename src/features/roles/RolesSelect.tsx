import React from "react";
import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllRolesQuery } from "../../api/role";
import Select from "../../components/Select";
import type { Role } from "./EditRoleModal";

interface RolesSelectProps {
  selectProps?: Partial<SelectProps>;
  queryObject?: Record<string, any>;
}

const RolesSelect: React.FC<RolesSelectProps> = ({ selectProps = {}, queryObject = {} }) => {
  const rolesQuery = useGetAllRolesQuery(queryObject);

  return (
    <Select
      data={rolesQuery.data as Role[] | undefined}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      searchable
      nothingFoundMessage={upperFirst("no results found")}
      rightSection={rolesQuery.isLoading && <Loader size={18} />}
      {...(rolesQuery.isError && { disabled: true, placeholder: "Error loading roles" })}
      {...selectProps}
    />
  );
};

export default RolesSelect;