import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllUsersQuery } from "../../api/user";
import MultiSelect from "../../components/MultiSelect";

const UsersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const users = useGetAllUsersQuery({ query: { ...queryObject } });

  return (
    <MultiSelect
      data={users?.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      searchable
      nothingFoundMessage={upperFirst("no results found")}
      placeholder={upperFirst("select users")}
      rightSection={users.isLoading && <Loader size={18} />}
      {...(users.isError && { disabled: true, placeholder: "Error loading users" })}
      {...multiSelectProps}
    />
  );
};

export default UsersMultiSelect;
