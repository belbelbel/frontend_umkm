import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CreateSellerAppBar } from "../../../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../../../components/Button/Button";
import { ProductCard } from "../../../../../../components/Card/ProductCard";
import { ProductOwnerCard } from "../../../../../../components/Card/ProductOwnerCard";
import { DialogEditUmkmDetail } from "../../../../../../components/Dialog/DialogEditUmkmDetail";
import { useProductOwnerList } from "../../../../../../swr-cache/useProductOwnerList";
import { useUmkmById } from "../../../../../../swr-cache/useUmkmById";
import { useUser } from "../../../../../../swr-cache/useUser";
import { BaseParams } from "../../../../../../types/query";

const UmkmDetail = () => {
  const router = useRouter();
  const { user, loggedOut } = useUser();
  const { umkmId, holdingId } = router.query as BaseParams;
  const { umkmById } = useUmkmById(parseInt(umkmId));
  const { productOwnerList, fotos } = useProductOwnerList(parseInt(umkmId));
  const [dialogEdit, setDialogEdit] = useState(false);

  const handleDialogEdit = () => {
    setDialogEdit(true);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <CreateSellerAppBar link="/seller/dashboard" />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
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
                <Typography variant="subtitle2">{umkmById?.alamat}</Typography>
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

        <Divider sx={{ marginTop: 4, marginBottom: 6 }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600} marginBottom={3}>
            Produk Umkm
          </Typography>
          <Buttons
            onClick={() =>
              router.push(
                `/seller/holding/${holdingId}/umkm/${umkmId}/createproduct`
              )
            }
            variation="contained"
            size="medium"
            sx={{ py: 1, px: 2, width: 150, height: 40 }}
            startIcon={<i className="bx bx-plus" />}
          >
            Buat Produk
          </Buttons>
        </Stack>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {productOwnerList?.map((i) => (
            <Grid item key={i.id}>
              <ProductOwnerCard
                onClick={() =>
                  router.push(
                    `/seller/holding/${holdingId}/umkm/${umkmId}/seller-product/${i.id}`
                  )
                }
                nama_produk={i.nama}
                harga={i.harga}
                diskon={i.diskon}
                // image={i.foto.map((j) => j.path_foto)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default UmkmDetail;
