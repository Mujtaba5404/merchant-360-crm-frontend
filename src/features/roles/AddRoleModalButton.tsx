import React from "react";
import { useDisclosure } from "@mantine/hooks";
import AddButton from "../../components/AddButton";
import CanAccess from "../../components/CanAccess";
import AddRoleModal from "./AddRoleModal";

const AddRoleModalButton: React.FC = () => {
  const [addRoleModalOpened, { open: openAddRoleModal, close: closeAddRoleModal }] = useDisclosure(false);

  return (
    <CanAccess modelName="role" action="post">
      <AddRoleModal isOpen={addRoleModalOpened} onClose={closeAddRoleModal} />
      <AddButton title="Create Role" subtitle="Add a new role" onClick={openAddRoleModal} />
    </CanAccess>
  );
};

export default AddRoleModalButton;