import { Button, Modal, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useMemo } from "react";
import { useGetAllMerchantsTypesQuery, useCreateMerchantMutation } from "../api/merchanttype";

const AddCardModal: React.FC<any> = ({ opened, onClose }) => {
  const { data } = useGetAllMerchantsTypesQuery();
  const { mutate: createMerchant, isPending } = useCreateMerchantMutation();

  const merchantArray = useMemo(() => {
    return data ? Object.values(data) : [];
  }, [data]);

  const merchantTypes = merchantArray.map((item: any) => ({
    value: item.type,
    label: item.type,
  }));

  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      credentials: {},
      isActive: true,
    },
  });

  const selectedType = form.values.type;

  const selectedProvider = merchantArray.find(
    (item: any) => item.type === selectedType
  );

  const selectedCredentials = selectedProvider?.credentials || {};

  const handleSubmit = (values: any) => {
    createMerchant(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
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
            data={merchantTypes}
            placeholder="Select payment type"
            {...form.getInputProps("type")}
          />

          {Object.keys(selectedCredentials).map((key) => (
            <TextInput
              key={key}
              label={key}
              placeholder={`Enter ${key}`}
              {...form.getInputProps(`credentials.${key}`)}
            />
          ))}

          <Switch
            label="is active"
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />

          <Button type="submit" fullWidth mt="md" loading={isPending}>
            Add Card
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddCardModal;