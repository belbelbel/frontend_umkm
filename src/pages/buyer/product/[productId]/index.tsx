import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { number } from "yup/lib/locale";
import { CreateSellerAppBar } from "../../../../components/AppBar/CreateSellerAppBar";
import { MainAppBar } from "../../../../components/AppBar/MainAppBar";
import { Buttons } from "../../../../components/Button/Button";
import { useProductDetailPublic } from "../../../../swr-cache/role-public/useProductDetailPublic";
import { BaseParams } from "../../../../types/query";

const ProductPublicDetail = () => {
  const router = useRouter();
  const { productId } = router.query as BaseParams;
  const { productDetailPublic } = useProductDetailPublic(parseInt(productId));
  const [count, setCount] = useState(0);
  const arrayOfOrders: Array<Object> = [];
  const [orders, setOrders] = useState(arrayOfOrders);
  const dataOrders = {};

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("orders") || "{}");
    if (cartData) {
      setOrders(cartData);
    }
  }, []);

  let newItems = {
    produk_id: parseInt(productId),
    jumlah: count,
    nama_produk: productDetailPublic?.nama,
    harga: productDetailPublic?.harga,
    diskon: productDetailPublic?.diskon,
  };

  console.log(orders.length);

  const addItems = () => {
    if (orders.length === undefined) {
      setOrders([newItems]);
    } else if (orders.length !== 0) {
      setOrders((prev: any) => [...prev, newItems]);
    }
  };

  useEffect(() => {
    if (orders !== arrayOfOrders) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    console.log(orders);
  }, [orders]);

  const addCount = () => {
    setCount(count + 1);
  };

  const reduceCount = () => {
    if (count === 0) {
      setCount(count);
    }
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  // console.log(JSON.parse(localStorage.getItem("orders")));

  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Stack direction="row" spacing={4}>
          <Box
            width={350}
            height={250}
            sx={{ backgroundColor: "#EFEFEF", borderRadius: 3 }}
          />
          <Stack direction="column">
            <Typography variant="h4" fontWeight={600}>
              {productDetailPublic?.nama}
            </Typography>
            <Stack direction="row" spacing={3} alignItems="end" marginTop={2}>
              {productDetailPublic?.diskon !== 0 && (
                <Stack direction="column">
                  <Typography
                    variant="subtitle2"
                    color="#5C4EBD"
                    fontWeight={600}
                  >
                    {"Diskon" + " " + productDetailPublic?.diskon + "%"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                    }}
                  >
                    {"Rp" + " " + productDetailPublic?.harga}
                  </Typography>
                </Stack>
              )}
              <Stack direction="column">
                <Typography variant="h5" fontWeight={600}>
                  {"Rp" +
                    " " +
                    productDetailPublic?.harga *
                      ((100 - productDetailPublic?.diskon) / 100)}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} marginTop={5}>
              <IconButton
                onClick={reduceCount}
                sx={{ borderRadius: 100, border: "2px solid #EFEFEF" }}
              >
                <i
                  className="bx bx-minus"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                />
              </IconButton>
              <TextField
                // label="Size"
                // id="standard-size-small"
                value={count}
                size="small"
                variant="standard"
                sx={{ width: 30 }}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
              <IconButton
                onClick={addCount}
                sx={{ borderRadius: 100, border: "2px solid #EFEFEF" }}
              >
                <i
                  className="bx bx-plus"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                />
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={2} marginTop={3}>
              <Buttons
                variation="outlined"
                sx={{ width: 180 }}
                onClick={addItems}
              >
                Wishlist
              </Buttons>
              <Buttons variation="contained" sx={{ width: 180 }}>
                Beli sekarang
              </Buttons>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProductPublicDetail;
