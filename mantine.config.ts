import { Avatar, Badge, Drawer, Loader, Modal, MultiSelect, Select } from "@mantine/core";

export default {
  colors: {
    dark: ["#f3f4f6", "#e5e7eb", "#FFE8CC", "#FFA94D", "#FF922B", "#FD7E14", "#F76707", "#E8590C", "#D9480F"],
  },
  cursorType: "pointer",
  defaultRadius: "md",
  fontFamily: "Inter, sans-serif",
  components: {
    Avatar: Avatar.extend({ defaultProps: { radius: "md" }, styles: { image: { objectFit: "contain" } } }),
    Badge: Badge.extend({ defaultProps: { variant: "light" } }),
    Drawer: Drawer.extend({ defaultProps: { position: "right", styles: { content: { display: "flex", flexDirection: "column" }, body: { height: "100%" } }, overlayProps: { blur: 2 } } }),
    Loader: Loader.extend({ defaultProps: { type: "dots", mx: "auto" } }),
    Modal: Modal.extend({ defaultProps: { centered: true, overlayProps: { blur: 2 } } }),
    Select: Select.extend({ defaultProps: { allowDeselect: false, checkIconPosition: "right" } }),
    MultiSelect: MultiSelect.extend({ defaultProps: { checkIconPosition: "right", hidePickedOptions: true } }),
  },
};
