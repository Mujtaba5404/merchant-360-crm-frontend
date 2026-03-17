import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import React from "react";
import CanAccess from "../../components/CanAccess";
import EditRoleModal from "./EditRoleModal";

const EditRoleModalButton: React.FC<any> = ({ role }) => {
  const [
    editRoleModalOpened,
    { open: openEditRoleModal, close: closeEditRoleModal },
  ] = useDisclosure(false);

  return (
    <CanAccess modelName="role" action="patch">
      <EditRoleModal
        isOpen={editRoleModalOpened}
        onClose={closeEditRoleModal}
        role={role}
      />

      <ActionIcon variant="subtle" onClick={openEditRoleModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditRoleModalButton;
