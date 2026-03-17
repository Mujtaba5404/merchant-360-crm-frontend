import React from "react";
import { Card, Center, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface Props {
  onClick: () => void;
}

const AddCard: React.FC<Props> = ({ onClick }) => {

  return (
    <Card
      onClick={onClick}
      className="add-card"
      radius="xl"
    >
      <Center style={{ height: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <IconPlus size={40} />
          <Text mt={10}>Add Card</Text>
        </div>
      </Center>
    </Card>
  );
};

export default AddCard;