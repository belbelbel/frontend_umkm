import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomProps extends ButtonProps {
  variation: "outlined" | "contained";
  component?: string;
}

export const Buttons: React.FC<CustomProps> = ({ variation, sx, ...props }) => (
  <Button
    sx={{
      textTransform: "initial",
      backgroundColor: variation === "contained" ? "#000000" : "#FFFFFF",
      borderRadius: "100px",
      color: variation === "contained" ? "#FFFFFF" : "#000000",
      px: 5,
      py: 1,
      boxShadow: "none",
      border: "1px solid #000000",
      "&:hover": {
        backgroundColor: variation === "contained" ? "#5C4EBD" : "#FFFFFF",
        borderColor: "#5C4EBD",
        color: variation === "contained" ? "#FFFFFF" : "#5C4EBD",
        boxShadow: "none",
      },
      ...sx,
    }}
    {...props}
  />
);
