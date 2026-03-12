import { useDisclosure } from "@mantine/hooks";
import AddButton from "../../components/AddButton";
import CanAccess from "../../components/CanAccess";
import AddRoleModal from "./AddRoleModal";

const AddRoleModalButton = () => {
  const [addRoleModalOpened, { open: openAddRoleModal, close: closeAddRoleModal }] = useDisclosure(false);

  return (
    <CanAccess modelName="role" action="post">
      <AddRoleModal isOpen={addRoleModalOpened} onClose={closeAddRoleModal} />

      <AddButton title="create role" subtitle="add a new role" onClick={openAddRoleModal} />
    </CanAccess>
  );
};

export default AddRoleModalButton;
