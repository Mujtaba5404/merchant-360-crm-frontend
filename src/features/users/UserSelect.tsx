import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllUsersQuery } from "../../api/user";
import Select from "../../components/Select";

const UsersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const users = useGetAllUsersQuery({ query: { ...queryObject } });

  return (
    <Select
      data={users?.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      searchable
      nothingFoundMessage={upperFirst("no results found")}
      rightSection={users.isLoading && <Loader size={18} />}
      {...(users.isError && { disabled: true, placeholder: "Error loading users" })}
      {...selectProps}
    />
  );
};

export default UsersSelect;
