import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MainAppBar } from "../../components/AppBar/MainAppBar";
import { Buttons } from "../../components/Button/Button";
import { DialogAlert } from "../../components/Dialog/DialogAlert";
import { DialogAlertPayment } from "../../components/Dialog/DialogPaymentAlert";
import { useProductDetailPublic } from "../../swr-cache/role-public/useProductDetailPublic";
import { useProductPublicList } from "../../swr-cache/role-public/useProductPublicList";
import { MakeOrder } from "../../types/models";
import { BaseParams } from "../../types/query";
import { apiEcom } from "../api/hello";

export interface BuyType {
  code: number;
  message: string;
  data: {
    id: number;
    user_id: number;
    umkm_id: number;
    no_kuitansi: number;
    total_harga: number;
    status: string;
    payment_code: string;
    no_resi: null;
    review: null;
    paid_at: null;
    sent_at: null;
    created_at: Date;
    updated_at: Date;
    details: [
      {
        id: number;
        pembelian_id: number;
        produk_id: number;
        diskon: number;
        jumlah_barang: number;
        total_harga: number;
        created_at: Date;
        updated_at: Date;
      }
    ];
  };
}

const CartPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [responseData, setResponseData] = useState<BuyType>();
  const [dialogCode, setDialogCode] = useState(false);
  const setEmpty = {};
  // let data: Array<number> = [];
  // const [sumTotals, setSumTotals] = useState<number>();
  // let newArray: Array<{ produk_id: number; jumlah: number }> = [];

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("orders"));
    if (cartData) {
      setOrders(cartData);
    }
    console.log(orders);
  }, []);

  // const calculate = () => {
  //   if (orders.length !== 0) {
  //     data = orders?.map((i) => i.harga * ((100 - i.diskon) / 100) * i.jumlah);
  //     console.log(data);
  //     setSumTotals(data?.reduce((a, b) => a + b, 0));
  //     newArray = orders?.map(({ produk_id, jumlah }) => ({
  //       produk_id,
  //       jumlah,
  //     }));
  //   }
  // };

  let data = orders?.map((i) => i.harga * ((100 - i.diskon) / 100) * i.jumlah);
  let sumTotal = data?.reduce((a, b) => a + b, 0);

  let newArray = orders?.map(({ produk_id, jumlah }) => ({
    produk_id,
    jumlah,
  }));

  let dataCheckout = { orders: newArray };
  console.log(JSON.stringify(dataCheckout));

  const checkoutItem = async () => {
    try {
      const res = await apiEcom.post(
        "/pembelian",
        JSON.stringify(dataCheckout)
      );
      setResponseData(res.data);
      localStorage.removeItem("orders");
      localStorage.setItem("orders", JSON.stringify(setEmpty));
      setDialogCode(true);
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      }
      throw error;
    }
  };

  console.log(responseData?.data.id);

  const payOrder = async () => {
    try {
      const res = await apiEcom.get(`/pembelian/${responseData?.data.id}/pay`);
      // console.log(res.data.data);
      console.log(res.data);
      return res.data;
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      }
      throw error;
    }
  };

  return (
    <>
      <MainAppBar />
      <Container maxWidth="md" sx={{ marginTop: 12, marginBottom: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={600} marginBottom={5}>
              Keranjang
            </Typography>
            {orders === {} ? (
              <Typography textAlign="center" variant="body1">
                Keranjang kosong
              </Typography>
            ) : (
              <Stack direction="column" spacing={3}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row">
                    <Box width={50}>
                      <Typography variant="caption" color="GrayText">
                        No
                      </Typography>
                    </Box>
                    <Box width={250}>
                      <Typography variant="caption" color="GrayText">
                        Produk
                      </Typography>
                    </Box>
                    <Box width={135}>
                      <Typography variant="caption" color="GrayText">
                        Harga Satuan
                      </Typography>
                    </Box>
                    <Box width={90}>
                      <Typography variant="caption" color="GrayText">
                        Kuantitas
                      </Typography>
                    </Box>
                    <Box width={150}>
                      <Typography variant="caption" color="GrayText">
                        Total
                      </Typography>
                    </Box>
                    <Box width={100}>
                      <Typography variant="caption" color="GrayText">
                        {" "}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                {orders?.map((i, index) => {
                  let diskon = i.harga * ((100 - i.diskon) / 100);
                  let afterDiskon = diskon * i.jumlah;
                  return (
                    <Stack direction="column" key={index}>
                      <Stack direction="row">
                        <Box width={50}>
                          <Typography>{index + 1}</Typography>
                        </Box>
                        <Box width={250}>
                          <Typography>{i.nama_produk}</Typography>
                        </Box>
                        <Box width={150}>
                          <Typography>{i.harga}</Typography>
                        </Box>
                        <Box width={80}>
                          <Typography>{i.jumlah}</Typography>
                        </Box>
                        <Box width={150}>
                          <Typography>
                            {i.diskon !== 0 ? afterDiskon : i.harga * i.jumlah}
                          </Typography>
                        </Box>
                        <Box width={100}>
                          {i.diskon !== 0 ? (
                            <Typography variant="subtitle2" color="#5C4EBD">
                              {"(" +
                                "Diskon" +
                                " " +
                                i.diskon +
                                " " +
                                "%" +
                                ")"}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            )}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="right"
              marginTop={10}
              marginRight={8}
            >
              <Typography variant="h5" fontWeight={600} marginBottom={5}>
                Total
              </Typography>
              <Typography variant="h5" fontWeight={600} marginBottom={5}>
                {"Rp" + " " + sumTotal}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              marginTop={6}
              spacing={3}
              justifyContent="end"
            >
              <Buttons
                variation="outlined"
                onClick={() => {
                  localStorage.removeItem("orders");
                  console.log(localStorage.getItem("cart"));
                }}
                sx={{ px: 6 }}
              >
                Hapus semua
              </Buttons>
              <Buttons
                variation="contained"
                sx={{ px: 7 }}
                onClick={checkoutItem}
              >
                Checkout
              </Buttons>
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <DialogAlertPayment
        open={dialogCode}
        onClose={() => setDialogCode(false)}
        onClicks={() =>
          router.push(
            `http://localhost:8000/api/pembelian/${responseData?.data.id}/pay`
          )
        }
        title="Salin Kode Pembayaran"
        message="Kami akan mengarahkan Anda ke halaman pembayaran, mohon salin kode pembayaran. Kode pembayaran tidak ditampilkan dua kali."
        code={responseData?.data.payment_code}
        buttonText="Ke halaman payment"
      />
    </>
  );
};

export default CartPage;
