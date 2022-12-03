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
  name: string;
  open: boolean;
  onClose: () => void;
}

export const DialogEditHolding: React.FC<DialogProps> = ({
  id,
  name,
  open,
  onClose,
}) => {
  const { umkmById } = useUmkmById(id);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle marginBottom={1} sx={{ py: 3, px: 3 }}>
        <Typography variant="body1" fontWeight={600}>
          Edit Holding
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 3, px: 3 }}>
        <>
          <Stack direction="column" spacing={4} marginTop={2}>
            <TextField value={name} label="Nama" />
          </Stack>
        </>
      </DialogContent>
      <DialogActions sx={{ py: 3, px: 3 }}>
        <Buttons
          variation="outlined"
          size="medium"
          sx={{ py: 1, px: 2, width: 120, height: 40 }}
        >
          Simpan
        </Buttons>

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
