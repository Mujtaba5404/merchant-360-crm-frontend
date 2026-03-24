import { Button, Modal, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useGetAllMerchantsTypesQuery } from "../api/merchanttype";

const AddCardModal: React.FC<any> = ({ opened, onClose }) => {
  const { data } = useGetAllMerchantsTypesQuery();
  const form = useForm({
    initialValues: { title: "", type: "", isActive: true },
  });

  const handleSubmit = (values: {}) => {
    console.log(values);
  };

  const paymentTypeOptions = data?.data
    ? Object.entries(data.data).map(([key, value]) => ({
        value: value,
        label: key,
      }))
    : [];

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
            data={paymentTypeOptions}
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
