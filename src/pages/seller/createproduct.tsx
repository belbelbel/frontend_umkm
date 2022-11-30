import { Container, Typography } from "@mui/material";
import React from "react";
import { CreateSellerAppBar } from "../../components/AppBar/CreateSellerAppBar";

export const CreateProduct = () => {
  return (
    <>
      <CreateSellerAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600}>
          Buat Produk
        </Typography>
      </Container>
    </>
  );
};

export default CreateProduct;
