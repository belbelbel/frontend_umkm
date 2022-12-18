import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useBuyerOrderDetail } from "../../swr-cache/role-buyer/useBuyerOrderDetail";
import { useUmkmById } from "../../swr-cache/useUmkmById";
import { Buttons } from "../Button/Button";
import logo from "../../../public/images/logo.png";
import kurir from "../../../public/images/kurir.png";
import Image from "next/image";
import { LoadingButtons } from "../Button/LoadingButton";
import { doneOrder, receiveOrder } from "../../repositories/repo";
import { useRouter } from "next/router";
import { useBuyerListOrder } from "../../swr-cache/role-buyer/useBuyerListOrder";

interface DialogProps {
  id: number;
  open: boolean;
  onClose: () => void;
}

export const DialogDoneOrder: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const router = useRouter();
  const { order, mutate } = useBuyerListOrder();
  const handleDoneOrder = async () => {
    try {
      await receiveOrder(id);
      await doneOrder(id);
      mutate();
      onClose();
    } catch (e) {
    } finally {
      router.push("/buyer/order");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Terima pesanan
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <Typography variant="body1" color="#000000">
          Cek kelengkapan paket sebelum menyelesaikan pesanan. Anda yakin ingin
          menyelesaikan pesanan?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <LoadingButtons
          variation="outlined"
          onClick={handleDoneOrder}
          sx={{ py: 1, px: 2 }}
        >
          Pesanan diterima
        </LoadingButtons>
        <LoadingButtons
          variation="contained"
          onClick={onClose}
          sx={{ py: 1, px: 5 }}
        >
          Tutup
        </LoadingButtons>
      </DialogActions>
    </Dialog>
  );
};
