import { useDisclosure } from "@mantine/hooks";
import AddButton from "../../components/AddButton";
import CanAccess from "../../components/CanAccess";
import AddUserModal from "./AddUserModal";
import React from "react";

const AddUserModalButton: React.FC = () => {
  const [addUserModalOpened, { open: openAddUserModal, close: closeAddUserModal }] = useDisclosure(false);

  return (
    <CanAccess modelName="user" action="post">
      <AddUserModal isOpen={addUserModalOpened} onClose={closeAddUserModal} />

      <AddButton title="Create User" subtitle="Add a new user" onClick={openAddUserModal} />
    </CanAccess>
  );
};

export default AddUserModalButton;