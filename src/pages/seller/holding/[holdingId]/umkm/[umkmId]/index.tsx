import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CreateSellerAppBar } from "../../../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../../../components/Button/Button";
import { DialogEditUmkmDetail } from "../../../../../../components/Dialog/DialogEditUmkmDetail";
import { useUmkmById } from "../../../../../../swr-cache/useUmkmById";
import { BaseParams } from "../../../../../../types/query";

const UmkmDetail = () => {
  const router = useRouter();
  const { umkmId } = router.query as BaseParams;
  const { umkmById } = useUmkmById(parseInt(umkmId));
  const [dialogEdit, setDialogEdit] = useState(false);

  const handleDialogEdit = () => {
    setDialogEdit(true);
  };

  return (
    <>
      <CreateSellerAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={6} alignItems="center">
            <Box
              sx={{
                width: 200,
                height: 200,
                background: "#EFEFEF",
                borderRadius: "100%",
              }}
            />
            <Stack direction="column">
              <Typography variant="caption" color="GrayText">
                Nama UMKM
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {umkmById?.nama_umkm}
              </Typography>
              <Stack direction="row" marginTop={5} spacing={15}>
                <Stack direction="column">
                  <Typography variant="caption" color="GrayText">
                    Alamat
                  </Typography>
                  <Typography variant="subtitle2">
                    {umkmById?.alamat}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography variant="caption" color="GrayText">
                    No Telepon
                  </Typography>
                  <Typography variant="subtitle2">
                    {umkmById?.no_telp_umkm}
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography variant="caption" color="GrayText">
                    Jumlah Produk
                  </Typography>
                  <Typography variant="subtitle2">
                    {umkmById?.produks_count}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <IconButton onClick={handleDialogEdit}>
            <i className="bx bx-edit" />
          </IconButton>
        </Stack>
        <Divider sx={{ marginTop: 4, marginBottom: 6 }} />

        <DialogEditUmkmDetail
          id={parseInt(umkmId)}
          open={dialogEdit}
          onClose={() => setDialogEdit(false)}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600} marginBottom={3}>
            Produk Umkm
          </Typography>
          <Buttons
            variation="contained"
            size="medium"
            sx={{ py: 1, px: 2, width: 150, height: 40 }}
            startIcon={<i className="bx bx-plus" />}
          >
            Buat Produk
          </Buttons>
        </Stack>
      </Container>
    </>
  );
};

export default UmkmDetail;
