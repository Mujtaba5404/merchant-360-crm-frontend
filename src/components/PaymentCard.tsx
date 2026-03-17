import React from "react";
import { Card, Stack, Text, Group, Badge } from "@mantine/core";
import CardChip from "./CardChip";
import "../paymentCard.css";

interface CardProps {
  card: {
    id: string;
    name: string;
  };
}

const PaymentCard: React.FC<CardProps> = ({ card }) => {
  const isStripe = card.id === "stripe";
  const isAuthorize = card.id === "authorize_net";
  const isBrainTree = card.id === "brain_tree";

  return (
    <Card
      radius="lg"
      className={`payment-card ${isStripe ? "stripe-card" : ""} ${
        isAuthorize ? "authorize-card" : ""
      } ${isBrainTree ? "braintree-card" : ""}`}
    >
      <Stack justify="space-between">
        {/* 🔹 LOGO */}
        {isStripe && (
          <Text fw={700} c="white">
            STRIPE
          </Text>
        )}

        {isAuthorize && (
          <img
            className="authorize-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Authorize.Net%2C_A_Visa_Solution_wordmark.svg"
          />
        )}

        {isBrainTree && (
          <Text fw={700} c="white">
            BRAINTREE
          </Text>
        )}

        <CardChip />
        <Text c={"white"} size="xl" fw={700} lh={1}>
          **** **** **** ****
        </Text>

        <Group justify="space-between">
          <Text c={"white"} fw={600} tt={"capitalize"}>
            John Doe
          </Text>
          <Badge color="teal">active</Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default PaymentCard;
