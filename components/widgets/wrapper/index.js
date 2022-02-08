import { Card } from "@mui/material";

export default function WidgetWrapper({
  children,
  cardStyle,
  containerStyle,
  variant,
}) {
  return (
    <div className={`${containerStyle} p-lg-4 p-md-3 p-sm-3`}>
      <Card
        className={`${cardStyle} p-3 `}
        variant={variant || "outlined"}
        sx={{ borderRadius: "20px", borderColor: "transparent" }}
      >
        {children}
      </Card>
    </div>
  );
}
