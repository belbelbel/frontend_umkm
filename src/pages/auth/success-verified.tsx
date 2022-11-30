import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Buttons } from "../../components/Button/Button";

export const SuccesPage = () => {
  const router = useRouter();
  return (
    <Container maxWidth="lg" sx={{ padding: 30, textAlign: "center" }}>
      <i className="bx bxs-check-circle" style={{ fontSize: "70px" }} />
      <Typography variant="h6" marginTop={3}>
        Akun Anda telah terverifikasi
      </Typography>
      <Typography variant="body1" marginTop={1} marginBottom={3}>
        Terima kasih telah melakukan registrasi akun pada umkm.id
      </Typography>
      <Buttons variation="outlined" onClick={() => router.push("/home")}>
        Ke beranda
      </Buttons>
    </Container>
  );
};

export default SuccesPage;
