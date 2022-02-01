import { Paper } from "@mui/material";

export default function WidgetWrapper({ children, width, height }) {
  return (
    <Paper className="p-3" variant="outlined">
      {children}
    </Paper>
  );
}
