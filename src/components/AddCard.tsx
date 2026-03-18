import { Button, Modal, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const AddCardModal: React.FC<Props> = ({ opened, onClose }) => {
  const form = useForm({
    initialValues: { title: "", type: "", isActive: true },
  });

  const handleSubmit = (values: {}) => {
    console.log(values);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Card" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Card title"
            required
            placeholder="Appmization's stripe"
            {...form.getInputProps("title")}
          />
          <Select
            label="Payment Type"
            required
            data={[
              { value: "stripe", label: "Stripe" },
              { value: "authorize_net", label: "Authorize.Net" },
              { value: "brain_tree", label: "Brain Tree" },
            ]}
            {...form.getInputProps("type")}
          />
          <Switch
            label="is active"
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />

          <Button type="submit" fullWidth mt={"md"}>
            Add Card
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddCardModal;
