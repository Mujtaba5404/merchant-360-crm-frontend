import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import CanAccess from "../../components/CanAccess";
import capitalizeLetters from "../../utils/capitalizeLetters";

const DeleteRoleButton = ({ roleId }) => {
  const deleteRoleConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete role confirmation"),
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this role?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        console.log(`Role ${roleId} would be deleted (API call removed)`);
      },
    });
  };

  return (
    <CanAccess modelName="role" action="delete">
      <ActionIcon
        variant="subtle"
        color="red"
        onClick={deleteRoleConfirmationModal}
      >
        <IconTrash size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default DeleteRoleButton;
