import { SimpleGrid } from "@mantine/core";
import React from "react";
import PaymentCard from "../components/PaymentCard";

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
  },
  {
    id: "authorize_net",
    name: "Authorize.Net",
  },
  {
    id: "brain_tree",
    name: "Brain Tree",
  },
];

const MerchantScreen: React.FC = () => {
  return (
    <SimpleGrid cols={{ md: 3, lg: 4, xl: 5 }}>
      {paymentMethods.map((card) => (
        <PaymentCard key={card.id} card={card} />
      ))}
    </SimpleGrid>
  );
};

export default MerchantScreen;
