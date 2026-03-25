import { Button, Modal, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useMemo } from "react";
import { useGetAllMerchantsTypesQuery } from "../api/merchanttype";
import { useUpdateMerchantMutation } from "../api/merchanttype";

const EditAddCardModal: React.FC<any> = ({ opened, onClose, editData }) => {
  const { data } = useGetAllMerchantsTypesQuery();
  const { mutate: updateMerchant, isPending } = useUpdateMerchantMutation();

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

  useEffect(() => {
    if (editData) {
      form.setValues({
        title: editData.name || "",
        type: editData.type || "",
        isActive: editData.isActive ?? true,
        credentials: editData.credentials || {},
      });
    } else {
      form.reset();
    }
  }, [editData]);

  const selectedType = form.values.type;

  const selectedProvider = merchantArray.find(
    (item: any) => item.type === selectedType,
  );

  const selectedCredentials = selectedProvider?.credentials || {};

  const handleSubmit = (values: any) => {
    if (editData) {
      updateMerchant(
        {
          id: editData._id,
          payload: values,
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      console.log("CREATE:", values);
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={editData ? "Update Card" : "Add Card"}
      centered
    >
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
            label={form.values.isActive ? "Active" : "Inactive"}
            color={form.values.isActive ? "teal" : "red"}
            checked={form.values.isActive}
            onChange={(event) =>
              form.setFieldValue("isActive", event.currentTarget.checked)
            }
          />

          <Button type="submit" fullWidth mt="md" loading={isPending}>
            {editData ? "Update Card" : "Add Card"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditAddCardModal;
