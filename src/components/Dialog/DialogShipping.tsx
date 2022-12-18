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

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export const DialogShipping: React.FC<DialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image src={logo} alt="umkm.id" height={20} />
            <Image src={kurir} alt="Express" height={50} />
          </Stack>
          <Stack direction="column" spacing={4} justifyContent="center">
            <Typography
              variant="body2"
              marginTop={5}
              textAlign="center"
              fontWeight={600}
            >
              Mohon salin No Resi sebelum menutup notifikasi ini.
            </Typography>
            <Typography
              variant="h6"
              marginTop={5}
              textAlign="center"
              fontWeight={600}
            >
              TH07118910688123EXPRESS
            </Typography>
          </Stack>
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
