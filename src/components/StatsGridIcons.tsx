import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import classes from "../StatsGridIcons.module.css";

const data = [
  { title: "Stripe", value: "$13,456", diff: 34, provider: "stripe" },
  { title: "Authorize", value: "$4,145", diff: -13, provider: "authorize" },
  { title: "Braintree", value: "745", diff: 18, provider: "braintree" },
];

const StatsGridIcons = ({ onSelectProvider }: any) => {
  const stats = data.map((stat) => {
    const DiffIcon =
      stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        onClick={() => onSelectProvider(stat.provider)}
        style={{ cursor: "pointer" }}
      >
        <Group justify="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>

          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.diff > 0
                  ? "var(--mantine-color-teal-6)"
                  : "var(--mantine-color-red-6)",
            }}
            size={25}
            radius="md"
          >
            <DiffIcon size={25} stroke={1.5} />
          </ThemeIcon>
        </Group>

        <Text c="dimmed" fz="sm" mt="md">
          <Text
            component="span"
            c={stat.diff > 0 ? "teal" : "red"}
            fw={700}
          >
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
};

export default StatsGridIcons;