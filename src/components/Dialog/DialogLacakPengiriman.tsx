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
import { useUmkmById } from "../../swr-cache/useUmkmById";
import { Buttons } from "../Button/Button";

interface DialogProps {
  status: string;
  resi: string;
  open: boolean;
  onClose: () => void;
}

const steps = [
  "Pembayaran telah diverifikasi",
  "Pemesanan sudah diproses penjual",
  "Paket telah keluar dari gudang sortir",
  "Paket telah sampai pada Gudang Hub",
  "Paket telah keluar dari Gudang Hub menuju kota tujuan",
  "Paket telah sampai pada Gerbang Sortir [Wakanda Gate-1]",
  "Paket dikirim ke alamat tujuan",
  "Paket diterima Ybs",
];

export const DialogLacakPengiriman: React.FC<DialogProps> = ({
  resi,
  open,
  onClose,
  status,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Informasi pengiriman
          </Typography>
          <Typography variant="caption" color="GrayText">
            {resi}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={status === "done" ? 7 : 1}
              orientation="vertical"
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <Buttons variation="contained" onClick={onClose}>
          Tutup
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
