import { Avatar, Badge, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { truncate } from "lodash";
import getAbbreviation from "../../utils/getAbbreviation";
import EditUserModalButton from "./EditUserModalButton";

const UsersList = ({ users = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {users.map((user) => {
        return (
          <Paper key={user?._id} p={"sm"} withBorder>
            <Group gap={"sm"}>
              <Avatar>{getAbbreviation(user.name)}</Avatar>

              <div style={{ flex: 1 }}>
                <Text fw={500} tt={"capitalize"}>
                  {user.name}
                </Text>
                <Text size="xs" c={"dimmed"}>
                  {truncate(user.email, { length: 25 })}
                </Text>
                <Badge size="sm">{user.roleAndPermissions?.title}</Badge>
              </div>

              <EditUserModalButton user={user} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default UsersList;
