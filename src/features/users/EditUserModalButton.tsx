import React from "react";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "../../components/CanAccess";
import EditUserModal from "./EditUserModal";

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  brands: string[];
  usesBrandAliases: boolean;
  brandAliases?: { brand: { _id: string }; name: string; email: string }[];
  roleAndPermissions?: { _id: string };
  isActive: boolean;
}

interface EditUserModalButtonProps {
  user: User;
}

const EditUserModalButton: React.FC<EditUserModalButtonProps> = ({ user }) => {
  const [editUserModalOpened, { open: openEditUserModal, close: closeEditUserModal }] = useDisclosure(false);

  return (
    <CanAccess modelName="user" action="patch">
      <EditUserModal isOpen={editUserModalOpened} onClose={closeEditUserModal} user={user} />

      <ActionIcon variant="subtle" onClick={openEditUserModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditUserModalButton;