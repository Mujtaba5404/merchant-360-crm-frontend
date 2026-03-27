import {
  Modal,
  Stack,
  TextInput,
  Select,
  Button,
  Group,
  Textarea,
  Loader,
} from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useGetAllMerchantsQuery } from "../../api/merchanttype";
import { useCreatePaymentLinkMutation } from "../../api/paymentLink";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const PaymentLinkModal = ({ opened, onClose }: Props) => {
  const [paymentLink, setPaymentLink] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [services, setServices] = useState("");

  const { data, isLoading } = useGetAllMerchantsQuery();

  const merchantOptions =
    data?.data?.map((merchant: any) => ({
      value: merchant._id?.toString() || "",
      label: merchant.name || merchant.title,
    })) || [];

  const { mutate: createPaymentLink, isLoading: isGenerating } =
    useCreatePaymentLinkMutation();

  const handleGenerateLink = () => {
    if (!selectedMerchant || !amount || !clientName || !clientEmail) return;

    createPaymentLink(
      {
        merchant: selectedMerchant,
        amount: Number(amount),
        currency: "USD",
        description: services,
        email: clientEmail,
        name: clientName,
      },
      {
        onSuccess: (res) => {
          if (res.metadata?.url) {
            setPaymentLink(res.metadata.url);
          } else {
            setPaymentLink(res.paymentLink);
          }
        },
        onError: (err) => {
          console.error("Payment Link Error:", err);
        },
      },
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Send Payment Link" centered>
      <Stack>
        <Select
          label="Merchants"
          placeholder={isLoading ? "Loading..." : "Select merchant"}
          data={merchantOptions}
          value={selectedMerchant}
          onChange={setSelectedMerchant}
          disabled={isLoading}
          searchable
          nothingFoundMessage="No merchants found"
        />

        <TextInput
          label="Amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <TextInput
          label="Client Name"
          placeholder="Enter name"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <TextInput
          label="Client Email"
          placeholder="Enter email"
          required
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />

        <Textarea
          label={"Services Sold"}
          rows={3}
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />

        <Button
          onClick={handleGenerateLink}
          disabled={!selectedMerchant || !amount || !clientName || !clientEmail}
          loading={isGenerating}
        >
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
