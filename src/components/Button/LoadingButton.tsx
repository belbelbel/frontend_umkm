import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import React from "react";

interface CustomProps extends LoadingButtonProps {
  variation: "outlined" | "contained";
  component?: string;
}

export const LoadingButtons: React.FC<CustomProps> = ({
  variation,
  sx,
  ...props
}) => (
  <LoadingButton
    sx={{
      textTransform: "initial",
      backgroundColor: variation === "contained" ? "#000000" : "#FFFFFF",
      borderRadius: "100px",
      color: variation === "contained" ? "#FFFFFF" : "#000000",
      px: 5,
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
