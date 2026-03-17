import React from "react";
import { Select as MantineSelect } from "@mantine/core";
import type {
  SelectProps as MantineSelectProps,
  ComboboxItem,
  ComboboxItemGroup,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import _ from "lodash";

interface BaseItem {
  [key: string]: any;
}

interface CustomSelectProps<T extends BaseItem>
  extends Omit<MantineSelectProps, "data"> {
  data?: T[];
  selectLabel: keyof T;
  selectValue: keyof T;
  capitalizeLabel?: boolean;
  groupBy?: keyof T;
}

function Select<T extends BaseItem>({
  data = [],
  selectLabel,
  selectValue,
  capitalizeLabel = true,
  groupBy,
  ...props
}: CustomSelectProps<T>) {
  const formattedData = (): ComboboxItem[] | ComboboxItemGroup[] => {
    if (groupBy) {
      return _.chain(data)
        .groupBy(groupBy as string)
        .map((items, group) => ({
          group: upperFirst(group),
          items: items.map((e) => ({
            label: capitalizeLabel
              ? upperFirst(String(e[selectLabel]))
              : String(e[selectLabel]),
            value: String(e[selectValue]),
          })),
        }))
        .value() as ComboboxItemGroup[];
    }

    return data.map((e) => ({
      label: capitalizeLabel
        ? upperFirst(String(e[selectLabel]))
        : String(e[selectLabel]),
      value: String(e[selectValue]),
    })) as ComboboxItem[];
  };

  return <MantineSelect data={formattedData()} {...props} />;
}

export default Select;