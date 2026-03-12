import React from "react";
import { useDisclosure } from "@mantine/hooks";
import AddButton from "../../components/AddButton";
import CanAccess from "../../components/CanAccess";
import AddUserModal from "./AdduserModal";

const AddUserModalButton: React.FC = () => {
  const [
    addUserModalOpened,
    { open: openAddUserModal, close: closeAddUserModal },
  ] = useDisclosure(false);

  return (
    <CanAccess modelName="user" action="post">
      <AddUserModal isOpen={addUserModalOpened} onClose={closeAddUserModal} />

      <AddButton
        title="create user"
        subtitle="add a new user"
        onClick={openAddUserModal}
      />
    </CanAccess>
  );
};

export default AddUserModalButton;
