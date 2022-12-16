import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Buttons } from "../Button/Button";

interface DialogProps {
  title?: string;
  message?: string;
  open: boolean;
  onClose: () => void;
  onClicks?: () => void;
  variation?: "doubleButton";
  buttonText?: string;
  code?: string;
}

export const DialogAlert: React.FC<DialogProps> = ({
  title,
  message,
  open,
  onClose,
  onClicks,
  variation,
  buttonText,
  code,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{message}</Typography>
        <Typography variant="h6">{code}</Typography>
      </DialogContent>
      <DialogActions>
        {variation === "doubleButton" && (
          <Buttons
            variation="outlined"
            onClick={onClicks}
            size="medium"
            sx={{ py: 1, px: 2, width: 120, height: 40 }}
          >
            {buttonText}
          </Buttons>
        )}
        <Buttons
          variation="contained"
          onClick={onClose}
          size="medium"
          sx={{ py: 1, px: 2, width: 120, height: 40 }}
        >
          Tutup
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
