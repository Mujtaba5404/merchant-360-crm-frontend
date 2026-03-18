import { Button, SimpleGrid } from "@mantine/core";
import React, { useState } from "react";
import AddCardModal from "../components/AddCard";
import PaymentCard from "../components/PaymentCard";
import { useDisclosure } from "@mantine/hooks";

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLJrZaGERTGZiroHR2pxC9otc_74Pf8UQHgw&s",
  },
  {
    id: "authorize_net",
    name: "Authorize.Net",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Authorize.Net%2C_A_Visa_Solution_wordmark.svg",
  },
  {
    id: "brain_tree",
    name: "Brain Tree",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Braintree-logo1.png",
  },
];

const MerchantScreen: React.FC = () => {
  const [isopened, { open, close }] = useDisclosure(false);
  const [cards] = useState(paymentMethods);

  return (
    <>
      <AddCardModal opened={isopened} onClose={close} />

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

        {cards.map((card) => (
          <PaymentCard key={card.id} card={card} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MerchantScreen;
