import { Button, Modal, Select, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { useGetAllMerchantsTypesQuery } from "../api/merchanttype";
import { useUpdateMerchantMutation } from "../api/merchanttype";

const EditAddCardModal: React.FC<any> = ({ opened, onClose, editData }) => {
  const { data } = useGetAllMerchantsTypesQuery();
  const { mutate: updateMerchant, isPending } = useUpdateMerchantMutation();

  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues({
        title: editData.name || "",
        type: editData.type || "",
        isActive: editData.isActive ?? true,
      });
    } else {
      form.reset();
    }
  }, [editData]);

  const handleSubmit = (values: any) => {
    if (editData) {
      updateMerchant(
        {
          id: editData._id, // ✅ FIX
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

  const paymentTypeOptions = data?.data
    ? Object.entries(data.data).map(([key, value]) => ({
        value: value,
        label: key,
      }))
    : [];

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
            data={paymentTypeOptions}
            {...form.getInputProps("type")}
          />

          <Switch
            label="is active"
            {...form.getInputProps("isActive", {
              type: "checkbox",
            })}
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
