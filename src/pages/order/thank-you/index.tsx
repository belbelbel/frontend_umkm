import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Buttons } from "../../../components/Button/Button";
import { BaseParams } from "../../../types/query";

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ query: { return: "true" } }],
//     fallback: false,
//   };
// };

// type Query = {
//   queryReturn: string;
// };

// interface Props {
//   returns: string;
// }

const SuccessPayment = () => {
  const router = useRouter();

  // useEffect(() => {
  //   router.push({ query: { ...router.query, return: "true" } });
  // }, [router.query.returns]);
  return (
    <Container maxWidth="lg" sx={{ padding: 30, textAlign: "center" }}>
      <i className="bx bxs-check-circle" style={{ fontSize: "70px" }} />
      <Typography variant="h6" marginTop={3}>
        Pembayaran Sukses
      </Typography>
      <Typography variant="body1" marginTop={1} marginBottom={3}>
        Terima kasih telah melakukan transaksi. Mohon tunggu Penjual mengirimkan
        produk Anda.
      </Typography>
      <Buttons variation="outlined" onClick={() => router.push("/buyer/order")}>
        Lihat pesanan saya
      </Buttons>
    </Container>
  );
};

export default SuccessPayment;
