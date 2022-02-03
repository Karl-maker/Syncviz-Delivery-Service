import { Card } from "@mui/material";

export default function WidgetWrapper({
  children,
  cardStyle,
  containerStyle,
  variant,
}) {
  return (
    <div className={`${containerStyle} p-2`}>
      <Card className={`${cardStyle} p-3 `} variant={variant || "outlined"}>
        {children}
      </Card>
    </div>
  );
}
