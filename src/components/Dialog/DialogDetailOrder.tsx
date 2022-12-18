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
  id: number;
  status: string;
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

export const DialogDetailOrder: React.FC<DialogProps> = ({
  id,
  status,
  open,
  onClose,
}) => {
  const { orderDetail } = useBuyerOrderDetail(id);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Typography variant="body1" fontWeight={600}>
          Detail Order
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack
            direction="column"
            spacing={4}
            sx={{ background: "#EFEFEF", p: 2 }}
          >
            <Stack direction="row" spacing={30}>
              <Stack direction="column" spacing={1}>
                {orderDetail?.details.map((i) => (
                  <Stack key={i.id} direction="row" spacing={4}>
                    <Typography variant="body1">{i.produk.nama}</Typography>
                    <Typography variant="body1">{i.produk.harga}</Typography>
                    <Typography variant="body1">
                      {"(" + "x" + i.jumlah_barang + ")"}
                    </Typography>
                    <Typography variant="body1">
                      {"Rp" +
                        " " +
                        i.produk.harga *
                          ((100 - i.produk.diskon) / 100) *
                          i.jumlah_barang}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={
                (status === "done" && 7) ||
                (status === "sent" && 6) ||
                (status === "paid" && 0)
              }
              orientation="vertical"
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <Buttons variation="contained" onClick={onClose}>
          Tutup
        </Buttons>
      </DialogActions>
    </Dialog>
  );
};
