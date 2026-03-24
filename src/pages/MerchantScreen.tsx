import { Button, SimpleGrid, Loader } from "@mantine/core";
import React, { useState } from "react";
import AddCardModal from "../components/AddCard";
import EditAddCardModal from "../components/EditAddCardModal";
import PaymentCard from "../components/PaymentCard";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllMerchantsQuery } from "../api/merchanttype";

const merchantLogos: Record<string, string> = {
  stripe:
    "https://creatella.ventures/wp-content/uploads/2021/10/282-2824123_stripe-logo-png-stripe-logo-white-transparent-clipart.png",
  authorize:
    "https://upload.wikimedia.org/wikipedia/commons/1/1d/Authorize.Net%2C_A_Visa_Solution_wordmark.svg",
  braintree:
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Braintree-logo1.png",
};

const MerchantScreen: React.FC = () => {
  const [isopened, { open, close }] = useDisclosure(false);

  const [editOpened, setEditOpened] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data, isLoading } = useGetAllMerchantsQuery();

  return (
    <>
      <AddCardModal opened={isopened} onClose={close} />

      <EditAddCardModal
        opened={editOpened}
        onClose={() => {
          setEditOpened(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <SimpleGrid cols={{ md: 3, lg: 4, xl: 5 }}>
        <Button
          variant="subtle"
          h={"100%"}
          radius={"lg"}
          className="add-merchant-button"
          onClick={open}
        >
          Add Card
        </Button>

        {isLoading && <Loader />}

        {data?.data?.map((merchant: any) => (
          <PaymentCard
            key={merchant._id}
            card={{
              id: merchant._id,
              name: merchant.title,
              logo: merchantLogos[merchant.type] || "",
              type: merchant.type,
              isActive: merchant.isActive,
            }}
            onEdit={(card) => {
              setEditData({
                _id: merchant._id,
                title: merchant.title,
                type: merchant.type,
                isActive: merchant.isActive,
              });
              setEditOpened(true);
            }}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MerchantScreen;
