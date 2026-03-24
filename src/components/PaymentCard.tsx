import { ActionIcon, Badge, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import chip from "../assets/chip.svg";
import "../paymentCard.css";
import { IconPencil } from "@tabler/icons-react";

interface CardProps {
  card: {
    id: string;
    name: string;
    logo?: string;
    type: string;
    isActive: boolean;
  };
  onEdit?: (card: any) => void;
}

const MERCHANT_CLASSNAMES: any = {
  stripe: "payment-card--stripe",
  authorize: "payment-card--authorize",
  braintree: "payment-card--braintree",
};

const PaymentCard: React.FC<CardProps> = ({ card, onEdit }) => {
  return (
    <Card
      radius="lg"
      className={`payment-card ${MERCHANT_CLASSNAMES[card.type]}`}
    >
      <ActionIcon
        variant="light"
        color="white"
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={() => onEdit?.(card)}
      >
        <IconPencil size={16} />
      </ActionIcon>
      <Stack justify="space-between">
        <img src={card.logo} className="payment-card__logo" />

        <img src={chip} className="payment-card__chip" />

        <Text c={"white"} size="xl" fw={700} lh={1}>
          **** **** **** ****
        </Text>

        <Group justify="space-between">
          <Text c={"white"} fw={600} tt={"capitalize"}>
            {card.name}
          </Text>

          <Badge color={card.isActive ? "teal" : "red"}>
            {card.isActive ? "active" : "inactive"}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

export default PaymentCard;
