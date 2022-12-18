import {
  Autocomplete,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Stack,
  Switch,
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
import { updateResi } from "../../../../repositories/repo";
import { useSellerOrderDetail } from "../../../../swr-cache/role-seller/useSellerOrderDetail";
import { useUser } from "../../../../swr-cache/useUser";
import { BaseParams } from "../../../../types/query";

export const PembelianDetail = () => {
  const router = useRouter();
  const { user } = useUser();
  const { pembelianId } = router.query as BaseParams;
  const { sellerOrderDetail } = useSellerOrderDetail(parseInt(pembelianId));
  const [option, setOption] = useState(false);
  const [resi, setResi] = useState<string>();
  console.log(resi);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  const handleOpenOption = () => {
    setOption(true);
  };

  return (
    <>
      <CreateSellerAppBar link="/seller/dashboard" />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} marginBottom={5}>
            Detail Pesanan
          </Typography>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" spacing={40}>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  Nama pembeli
                </Typography>
                <Typography variant="body1">
                  {sellerOrderDetail?.data.buyer.nama.slice(0, 1) + "*****"}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  No kwitansi
                </Typography>
                <Typography variant="body1">
                  {sellerOrderDetail?.data.no_kuitansi}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  Alamat
                </Typography>
                <Typography variant="body1">
                  {sellerOrderDetail?.data.buyer.alamat}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ p: 3, marginTop: 3 }}>
          <Typography variant="h6" fontWeight={600} marginBottom={5}>
            Informasi Produk
          </Typography>
          <Stack direction="column">
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  Produk
                </Typography>
                {sellerOrderDetail?.data.details.map((i) => (
                  <Typography key={i.id} variant="body1">
                    {i.produk.nama}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  Jumlah
                </Typography>
                {sellerOrderDetail?.data.details.map((i) => (
                  <Typography key={i.id} variant="body1">
                    {i.jumlah_barang}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography variant="body2" color="GrayText">
                  Subtotal
                </Typography>
                {sellerOrderDetail?.data.details.map((i) => (
                  <Typography key={i.id} variant="body1">
                    {i.total_harga}
                  </Typography>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="end" marginTop={3}>
              <Typography variant="h6">
                Total Rp {sellerOrderDetail?.data.total_harga}
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ p: 3, marginTop: 3, marginBottom: 4 }}>
          <Typography variant="h6" fontWeight={600} marginBottom={5}>
            Update Pengiriman
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <IconButton
              sx={{
                textTransform: "initial",
                border: "2px solid #EFEFEF",
                borderRadius: 3,
                width: 550,
                py: 3,
                "&:hover": {
                  border: "2px solid rgba(74, 82, 227, 0.8)",
                },
              }}
              onClick={handleOpenOption}
            >
              <Stack direction="column">
                <i
                  className="bx bxs-buildings"
                  style={{ fontSize: "40px", color: "rgba(74, 82, 227, 0.8)" }}
                />
                <Typography color="#000000" variant="body1" marginTop={2}>
                  Antar ke counter
                </Typography>
                <Typography variant="subtitle2">
                  Paket yang telah dikemas diantarkan ke counter pengiriman
                  terdekat.
                </Typography>
              </Stack>
            </IconButton>
            <IconButton
              sx={{
                textTransform: "initial",
                border: "2px solid #EFEFEF",
                borderRadius: 3,
                width: 550,
                py: 3,
                "&:hover": {
                  border: "2px solid rgba(41, 197, 40, 0.8)",
                },
              }}
              onClick={handleOpenOption}
            >
              <Stack direction="column">
                <i
                  className="bx bxs-truck"
                  style={{ fontSize: "40px", color: "rgba(41, 197, 40, 0.8)" }}
                />
                <Typography color="#000000" variant="body1" marginTop={2}>
                  Dijemput kurir
                </Typography>
                <Typography variant="subtitle2">
                  Kurir akan menuju alamat Anda untuk mengambil paket.
                </Typography>
              </Stack>
            </IconButton>
          </Stack>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            marginBottom={2}
            marginTop={3}
          >
            Masukkan Nomer Resi yang telah diberikan oleh pihak kurir untuk
            menyetujui proses pengiriman.
          </Typography>
          <Formik
            initialValues={{ no_resi: "" }}
            onSubmit={async (data, { setSubmitting }) => {
              console.log(data);
              setSubmitting(true);
              try {
                await updateResi(parseInt(pembelianId), data);
                router.push("/seller/dashboard");
              } catch (error: any) {
                console.log(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form>
                <Stack direction="row" spacing={4}>
                  <TextField
                    sx={{ width: 300 }}
                    label="No. resi"
                    id="no_resi"
                    onChange={handleChange}
                    value={values.no_resi}
                    // onChange={(e) => setResi(e.target.value)}
                    // value={resi}
                  />
                </Stack>
                <Box display="flex" justifyContent="right">
                  <LoadingButtons
                    variation="contained"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Kirim ke pembeli
                  </LoadingButtons>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
        <DialogShipping open={option} onClose={() => setOption(false)} />
      </Container>
    </>
  );
};

export default PembelianDetail;
