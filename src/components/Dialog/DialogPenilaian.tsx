import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useBuyerOrderDetail } from "../../swr-cache/role-buyer/useBuyerOrderDetail";
import { useProductReview } from "../../swr-cache/role-public/useProductReview";
import { useUmkmById } from "../../swr-cache/useUmkmById";
import { Buttons } from "../Button/Button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const DialogPenilaian: React.FC<DialogProps> = ({
  open,
  onClose,
  id,
}) => {
  const { reviews } = useProductReview(id);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Informasi penilaian
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <Typography variant="caption" color="GrayText">
          Penilaian ditampilkan di halaman produk Anda .
        </Typography>
        <Typography variant="subtitle1">
          {reviews?.map((i) => i.review)}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <Buttons variation="contained" onClick={onClose}>
          Tutup
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
