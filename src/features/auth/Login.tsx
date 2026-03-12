import { useNavigate } from "react-router-dom";
import { Button, Paper, PasswordInput, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email && password) {
      // Save dummy auth
      localStorage.setItem("auth", JSON.stringify({ name: "Mujtaba" }));
      navigate("/dashboard"); // <-- now navigate works
    }
  };

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      style={{ minHeight: "100vh", alignItems: "center" }}
      p="lg"
      className="pattern-bg"
    >
      <Paper p="lg" shadow="md">
        <Stack gap={4} mb="md">
          <Text fw={700} size="lg">Merchant 360</Text>
          <Text fw={500} c="dimmed">Please login to your account</Text>
        </Stack>

        <Stack component="form" tt="capitalize" onSubmit={handleSubmit}>
          <TextInput
            type="email"
            required
            autoFocus
            name="email"
            label="email address"
            placeholder="johndoe@example.com"
            leftSection={<IconAt size={18} />}
            leftSectionPointerEvents="none"
          />

          <PasswordInput
            required
            name="password"
            label="password"
            placeholder="your password"
            leftSection={<IconLock size={18} />}
            leftSectionPointerEvents="none"
          />

          <Button type="submit" mt="md">Login</Button>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};

export default Login;