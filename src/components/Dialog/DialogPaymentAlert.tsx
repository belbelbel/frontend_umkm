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

export const DialogAlertPayment: React.FC<DialogProps> = ({
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
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" marginBottom={2} marginTop={3}>
          {message}
        </Typography>
        <Typography variant="h6" textAlign="center" fontWeight={600}>
          {code}
        </Typography>

        <Typography
          variant="subtitle2"
          color="red"
          textAlign="center"
          marginTop={2}
        >
          Pastikan Anda telah menyalin kode pembayaran sebelum klik Ke halaman
          payment
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 4 }}>
        <Buttons
          variation="contained"
          onClick={onClicks}
          size="medium"
          sx={{
            py: 1,
            px: 2,
            width: 200,
            height: 40,
            marginTop: 4,
            marginBottom: 3,
          }}
        >
          Ke halaman payment
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
