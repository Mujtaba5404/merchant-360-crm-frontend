import {
  Avatar,
  Badge,
  Drawer,
  Loader,
  Modal,
  MultiSelect,
  Select,
} from "@mantine/core";

export default {
  colors: {
    dark: [
      "#f3f4f6",
      "#e5e7eb",
      "#a1a5ab",
      "#3f4a5d",
      "#374151",
      "#4b5563",
      "#1f2937",
      "#111827",
      "#111827",
      "#030712",
    ],
  },
  primaryColor: "teal",
  cursorType: "pointer",
  defaultRadius: "md",
  fontFamily: "Inter, sans-serif",
  components: {
    Avatar: Avatar.extend({
      defaultProps: { radius: "md" },
      styles: { image: { objectFit: "contain" } },
    }),
    Badge: Badge.extend({ defaultProps: { variant: "light" } }),
    Drawer: Drawer.extend({
      defaultProps: {
        position: "right",
        styles: {
          content: { display: "flex", flexDirection: "column" },
          body: { height: "100%" },
        },
        overlayProps: { blur: 2 },
      },
    }),
    Loader: Loader.extend({ defaultProps: { type: "dots", mx: "auto" } }),
    Modal: Modal.extend({
      defaultProps: { centered: true, overlayProps: { blur: 2 } },
    }),
    Select: Select.extend({
      defaultProps: { allowDeselect: false, checkIconPosition: "right" },
    }),
    MultiSelect: MultiSelect.extend({
      defaultProps: { checkIconPosition: "right", hidePickedOptions: true },
    }),
  },
};
