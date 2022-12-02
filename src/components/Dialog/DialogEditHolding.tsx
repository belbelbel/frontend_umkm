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
import { useUmkmById } from "../../swr-cache/useUmkmById";
import { Buttons } from "../Button/Button";

interface DialogProps {
  id: number;
  parent: string;
  open: boolean;
  onClose: () => void;
}

export const DialogEditHolding: React.FC<DialogProps> = ({
  id,
  parent,
  open,
  onClose,
}) => {
  const { umkmById } = useUmkmById(id);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Typography variant="body1" fontWeight={600}>
          Detail UMKM
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <>
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={30}>
              <Stack direction="column" spacing={1}>
                <Typography variant="caption" color="GrayText">
                  Nama Umkm
                </Typography>
                <Typography variant="body1">{umkmById?.nama_umkm}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="caption" color="GrayText">
                  Parent
                </Typography>
                <Typography variant="body1">{parent}</Typography>
              </Stack>
            </Stack>

            <TextField disabled value={umkmById?.alamat} label="Alamat" />
            <TextField
              disabled
              value={umkmById?.no_telp_umkm}
              label="Nomer Teelpon"
            />
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
