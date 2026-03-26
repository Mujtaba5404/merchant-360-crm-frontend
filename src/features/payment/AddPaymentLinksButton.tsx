import { Button, Group } from "@mantine/core";
import { IconSendFilled } from "@tabler/icons-react";
import { useState } from "react";
import PaymentLinkModal from "./PaymentLinkModal";

const AddPaymentLinksButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group justify="flex-end">
        <Button
          onClick={() => setOpened(true)}
          leftSection={<IconSendFilled size={18} />}
        >
          Send Payment Link
        </Button>
      </Group>

      <PaymentLinkModal
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </>
  );
};

export default AddPaymentLinksButton;