import { Card } from "@mui/material";

export default function WidgetWrapper({ children, width, height }) {
  return <Card variant="outlined">{children}</Card>;
}
