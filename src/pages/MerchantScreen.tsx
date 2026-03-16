import React, { useState } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import RealStylePaymentCard from "../components/PaymentCard";

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
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Container size="xl" py="xl">
      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: 1200, cols: 2, spacing: "md" },
          { maxWidth: 768, cols: 1, spacing: "sm" },
        ]}
      >
        {paymentMethods.map((method) => (
          <RealStylePaymentCard
            key={method.id}
            method={method}
            onSelect={(id) => setSelected(id)}
            selected={selected === method.id}
          />
        ))}
      </SimpleGrid>

      {selected && (
        <p style={{ marginTop: 30, textAlign: "center", fontWeight: 600 }}>
          You selected: {selected}
        </p>
      )}
    </Container>
  );
};

export default MerchantScreen;
