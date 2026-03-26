import { Modal, Stack, TextInput, Select, Button, Group } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const PaymentLinkModal = ({ opened, onClose }: Props) => {
  const [paymentLink, setPaymentLink] = useState("");

  const handleGenerateLink = () => {
    const link = `https://pay.example.com/${Math.random()
      .toString(36)
      .substring(7)}`;
    setPaymentLink(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Send Payment Link" centered>
      <Stack>
        <Select
          label="Merchant"
          placeholder="Select merchant"
          data={[
            { value: "stripe", label: "Stripe" },
            { value: "paypal", label: "PayPal" },
          ]}
        />

        <TextInput label="Name" placeholder="Enter name" />

        <TextInput label="Email" placeholder="Enter email" />

        <Button onClick={handleGenerateLink}>
          Generate Payment Link
        </Button>

        {paymentLink && (
          <Group>
            <TextInput value={paymentLink} readOnly style={{ flex: 1 }} />
            <Button variant="light" onClick={handleCopy}>
              <IconCopy size={16} />
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
};

export default PaymentLinkModal;