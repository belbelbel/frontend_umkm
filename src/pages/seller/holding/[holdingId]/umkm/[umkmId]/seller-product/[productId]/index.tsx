import { Box, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { CreateSellerAppBar } from "../../../../../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../../../../../components/Button/Button";

interface Props {
  nama_produk: string;
  harga: string;
  diskon: number;
  image: string;
}

const ProductOwnerDetail = () => {
  return (
    <>
      <CreateSellerAppBar link="/seller/dashboard" />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Stack direction="row" spacing={4}>
          <Box
            width={350}
            height={250}
            sx={{ backgroundColor: "#EFEFEF", borderRadius: 3 }}
          />
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" fontWeight={600}>
              Nama Produk
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              Rp 100.000
            </Typography>
            <Typography variant="subtitle2">Diskon 10%</Typography>
            <Stack direction="row" spacing={2}>
              {" "}
              <Buttons variation="contained" sx={{ width: "100%" }}>
                Beli Sekarang
              </Buttons>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProductOwnerDetail;
