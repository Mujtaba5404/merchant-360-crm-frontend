 import { Select as MantineSelect } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import _ from "lodash";

const Select = ({ data = [], selectLabel = "", selectValue = "", capitalizeLabel = true, groupBy = "", ...props }) => {
  const formattedData = () => {
    if (groupBy) {
      return _.chain(data)
        .groupBy(groupBy)
        .map((items, group) => ({ group: upperFirst(group), items: items.map((e) => ({ label: capitalizeLabel ? upperFirst(e[selectLabel]) : e[selectLabel], value: e[selectValue] })) }))
        .value();
    }

    return data.map((e) => ({ label: capitalizeLabel ? upperFirst(e[selectLabel]) : e[selectLabel], value: e[selectValue] }));
  };

  const _data = formattedData();

  return <MantineSelect data={_data} {...props} />;
};

export default Select;
