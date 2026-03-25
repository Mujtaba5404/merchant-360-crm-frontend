import {
  ActionIcon,
  Menu,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  IconLock,
  IconLogout,
  IconMoonStars,
  IconSunHigh,
  IconUserSquareRounded
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import SCOPE from "../constants/SCOPE";
import ChangePasswordModal from "../features/auth/ChangePasswordModal";

const UserMenu = () => {
  const [changePasswordModalOpened, { open: openChangePasswordModal, close: closeChangePasswordModal }] = useDisclosure(false);
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
      <ChangePasswordModal isOpen={changePasswordModalOpened} onClose={closeChangePasswordModal} />

      <Menu width={200} position="bottom-end" shadow="md" withArrow>
        <Menu.Target>
          <ActionIcon size={"lg"}>
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
            <Menu.Item onClick={openChangePasswordModal} leftSection={<IconLock size={18} />}>
            Change password
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
