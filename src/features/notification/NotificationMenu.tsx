import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Indicator,
  Menu,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";

const initialNotifications = [
  {
    _id: "1",
    title: "Welcome!",
    message: "Thanks for joining our platform.",
    read: false,
  },
  {
    _id: "2",
    title: "Card Updated",
    message: "Your card was updated successfully.",
    read: false,
  },
  {
    _id: "3",
    title: "System Alert",
    message: "Maintenance scheduled tonight.",
    read: true,
  },
];

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <Menu shadow="md" width={300} position="bottom-end">
      <Menu.Target>
        <Indicator
          disabled={unreadCount === 0}
          color="teal"   // ✅ teal color
          size={10}      // small dot
        >
          <ActionIcon variant="default" size="lg">
            <IconBell size={20} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        <Group justify="space-between" p="sm">
          <Text fw={600}>Notifications</Text>
          <Text
            size="xs"
            c="blue"
            style={{ cursor: "pointer" }}
            onClick={markAllRead}
          >
            Mark all read
          </Text>
        </Group>

        <Divider />

        <ScrollArea h={250}>
          {notifications.length === 0 ? (
            <Text ta="center" c="dimmed" p="md">
              No notifications
            </Text>
          ) : (
            notifications.map((n) => (
              <Menu.Item key={n._id}>
                <Box>
                  <Text size="sm">{n.title}</Text>
                  <Text size="xs" c="dimmed">
                    {n.message}
                  </Text>
                </Box>
              </Menu.Item>
            ))
          )}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;