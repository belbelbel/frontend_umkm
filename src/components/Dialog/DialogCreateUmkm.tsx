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
}

export const DialogCreateUmkm: React.FC<DialogProps> = ({
  title,
  message,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Buttons variation="contained" onClick={onClose}>
          Tutup
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
