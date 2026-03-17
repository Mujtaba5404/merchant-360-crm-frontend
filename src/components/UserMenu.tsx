import {
  ActionIcon,
  Menu,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconBox,
  IconLogout,
  IconMoonStars,
  IconSunHigh,
  IconUserCog,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import SCOPE from "../constants/SCOPE";

const UserMenu = () => {
  const [auth, , removeAuth] = useLocalStorage({
    key: "auth",
    getInitialValueInEffect: false,
  });
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const IS_ADMIN = auth?.roleAndPermissions.scope === SCOPE.ALL;

  const handleLogOut = () => {
    removeAuth();

    navigate("login", { replace: true });
  };

  return (
    <>
      <Menu width={200} position="bottom-end" shadow="md" withArrow>
        <Menu.Target>
          <ActionIcon color="orange" size={"lg"}>
            <IconUserSquareRounded size={24} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              colorScheme === "dark" ? (
                <IconSunHigh color={theme.colors.yellow[4]} size={18} />
              ) : (
                <IconMoonStars color={theme.colors.blue[7]} size={18} />
              )
            }
            onClick={toggleColorScheme}
          >
            Toggle color scheme
          </Menu.Item>

          {IS_ADMIN && (
            <>
              <Menu.Item
                component={Link}
                to={"/admin-settings"}
                leftSection={<IconUserCog size={18} />}
              >
                Admin Settings
              </Menu.Item>

              <Menu.Item
                component={Link}
                to={"/settings"}
                leftSection={<IconBox size={18} />}
              >
                Box Settings
              </Menu.Item>
            </>
          )}

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconLogout size={18} />}
            onClick={handleLogOut}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserMenu;
