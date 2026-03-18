import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import chip from "../assets/chip.svg";
import "../paymentCard.css";

interface CardProps {
  card: {
    id: string;
    name: string;
    logo?: string;
  };
}

const MERCHANT_CLASSNAMES: any = {
  stripe: "payment-card--stripe",
  authorize_net: "payment-card--authorize",
  brain_tree: "payment-card--braintree",
};

const PaymentCard: React.FC<CardProps> = ({ card }) => {
  return (
    <Card
      radius="lg"
      className={`payment-card ${MERCHANT_CLASSNAMES[card.id]}`}
    >
      <Stack justify="space-between">
        <img src={card.logo} className="payment-card__logo" />

        <img src={chip} className="payment-card__chip" />

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
