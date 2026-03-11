import {
  Button,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

const Login = () => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      style={{ minHeight: "100vh", alignItems: "center" }}
      p="lg"
      className="pattern-bg"
    >
      <Paper p="lg" shadow="md">
        <Stack gap={4} mb="md">
          <Text fw={700} size="lg">
            {" "}
            Merchant 360{" "}
          </Text>
          <Text fw={500} c="dimmed">
            Please login to your account
          </Text>
        </Stack>

        <Stack component="form" tt="capitalize">
          <TextInput
            type="email"
            required
            autoFocus
            label="email address"
            placeholder="johndoe@example.com"
            leftSection={<IconAt size={18} />}
            leftSectionPointerEvents="none"
          />

          <PasswordInput
            required
            label="password"
            placeholder="your password"
            leftSection={<IconLock size={18} />}
            leftSectionPointerEvents="none"
          />

          <Button type="submit" mt="md">
            Login
          </Button>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};

export default Login;
