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
  open: boolean;
  onClose: () => void;
}

export const DialogEditUmkmDetail: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const { umkmById } = useUmkmById(id);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Typography variant="body1" fontWeight={600}>
          Edit Detail UMKM
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 2, px: 3 }}>
        <>
          <Stack direction="column" spacing={3} marginTop={2}>
            <TextField label="Nama Umkm" value={umkmById?.nama_umkm} />
            <TextField label="Alamat" value={umkmById?.alamat} />
            <TextField label="No Telepon" value={umkmById?.no_telp_umkm} />
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
