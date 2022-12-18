import {
  Autocomplete,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CreateSellerAppBar } from "../../../../components/AppBar/CreateSellerAppBar";
import { Buttons } from "../../../../components/Button/Button";
import { LoadingButtons } from "../../../../components/Button/LoadingButton";
import { DialogShipping } from "../../../../components/Dialog/DialogShipping";
import { reviewOrder, updateResi } from "../../../../repositories/repo";
import { useBuyerOrderDetail } from "../../../../swr-cache/role-buyer/useBuyerOrderDetail";
import { useUser } from "../../../../swr-cache/useUser";
import { BaseParams } from "../../../../types/query";

export const ReviewPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { orderId } = router.query as BaseParams;
  const { orderDetail } = useBuyerOrderDetail(parseInt(orderId));

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <CreateSellerAppBar link="/seller/dashboard" />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h5" fontWeight={600} marginBottom={2}>
          Nilai Produk
        </Typography>
        <Typography variant="subtitle1" marginBottom={5} color="GrayText">
          Berikan penilaian pada produk yang telah Anda beli. Anda bisa
          memberitahu pengguna lain mengapa Anda menyukai produk ini.
        </Typography>
        <Card sx={{ p: 3 }}>
          <Stack direction="column" spacing={3}>
            {orderDetail?.details.map((i) => (
              <Stack direction="row" spacing={3} key={i.id}>
                <Box sx={{ width: 150, height: 100, background: "#EFEFEF" }} />
                <Stack direction="column">
                  <Typography variant="body1">{i.produk.nama}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Formik
            initialValues={{ review: "" }}
            onSubmit={async (data, { setSubmitting }) => {
              console.log(data);
              setSubmitting(true);
              try {
                await reviewOrder(parseInt(orderId), { review: data });
                router.push("/buyer/order");
              } catch (error: any) {
                console.log(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, isSubmitting, handleChange }) => (
              <Form>
                <Stack direction="column" marginTop={5}>
                  <Typography
                    variant="subtitle2"
                    color="GrayText"
                    marginTop={1}
                  >
                    Penilaian Anda akan ditampilkan di halaman produk pembeli.
                  </Typography>
                  <TextareaAutosize
                    id="review"
                    minRows={5}
                    style={{ width: "700", marginTop: 10 }}
                    onChange={handleChange}
                    value={values.review}
                  />
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <LoadingButtons
                      variation="contained"
                      sx={{ marginTop: 4, width: 150 }}
                      type="submit"
                      loading={isSubmitting}
                    >
                      Kirim
                    </LoadingButtons>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </>
  );
};

export default ReviewPage;
