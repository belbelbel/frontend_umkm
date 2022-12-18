import { Box, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MainAppBar } from "../../../components/AppBar/MainAppBar";
import { Buttons } from "../../../components/Button/Button";
import { BuyHistoryCard } from "../../../components/Card/Buyer/BuyHistoryCard";
import { DialogDetailOrder } from "../../../components/Dialog/DialogDetailOrder";
import { DialogDoneOrder } from "../../../components/Dialog/DialogDoneOrder";
import { useBuyerListOrder } from "../../../swr-cache/role-buyer/useBuyerListOrder";
import { useBuyerOrderDetail } from "../../../swr-cache/role-buyer/useBuyerOrderDetail";
import { useProductPublicList } from "../../../swr-cache/role-public/useProductPublicList";
import { useUser } from "../../../swr-cache/useUser";
import { BaseParams } from "../../../types/query";

const Order = () => {
  const router = useRouter();
  const { user } = useUser();
  const { order, mutate } = useBuyerListOrder();
  const { publicProduct } = useProductPublicList();
  const { orderId } = router.query as BaseParams;
  const { orderDetail } = useBuyerOrderDetail(parseInt(orderId));
  const [idOrder, setIdOrder] = useState<number>();
  const [statusOrder, setStatusOrder] = useState<string>();
  const [dialogDetail, setDialogDetail] = useState(false);
  const [dialogDone, setDialogDone] = useState(false);

  const openDialog = (id: number, data: string) => {
    setIdOrder(id);
    setStatusOrder(data);
    setDialogDetail(true);
  };

  const handleDone = (id: number) => {
    setIdOrder(id);
    setDialogDone(true);
  };

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
      <MainAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600} marginBottom={5}>
          Pesanan saya
        </Typography>
        <Stack direction="column" spacing={4}>
          {order?.map((i, idx) => (
            <>
              <Box
                sx={{
                  px: 2,
                  py: 2,
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.2)",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle2" color="GrayText">
                      {i.paid_at}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor:
                          (i.status === "paid" && "rgba(172, 255, 162, 0.8)") ||
                          (i.status === "sent" && "rgba(255, 190, 158, 0.8)") ||
                          (i.status === "done" && "rgba(154, 193, 255, 0.8)"),
                        px: 2,
                        borderRadius: 100,
                        py: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color={
                          (i.status === "paid" && "rgba(68, 165, 25, 0.8)") ||
                          (i.status === "sent" && "rgba(235, 78, 0, 0.8)") ||
                          (i.status === "done" && "rgba(17, 20, 254, 0.8)")
                        }
                      >
                        {i.status}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={5} sx={{ width: "60%" }}>
                      {/* <Typography>{idx + 1}</Typography> */}
                      <Typography>
                        {publicProduct
                          ?.filter((x) => x.id === i.details[0].produk_id)
                          .map((y) => y.nama)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={30}
                      //    sx={{ backgroundColor: "#EFEFEF" }}
                    >
                      <Typography>{i.details[0].jumlah_barang}</Typography>
                      <Typography>
                        {i.details[0].total_harga * i.details[0].jumlah_barang}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="h6">. . .</Typography>
                  <Stack
                    justifyContent="right"
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    {i.status === "sent" && (
                      <Buttons
                        variation="outlined"
                        sx={{ py: 0.5, px: 4 }}
                        onClick={() => handleDone(i.id)}
                      >
                        Pesanan diterima
                      </Buttons>
                    )}
                    {i.status === "done" && i.review === null && (
                      <Buttons
                        variation="outlined"
                        sx={{ py: 0.5, px: 4 }}
                        onClick={() =>
                          router.push(`/buyer/order/${i.id}/review`)
                        }
                      >
                        Beri review
                      </Buttons>
                    )}
                    <Buttons
                      variation="contained"
                      sx={{ py: 0.5, px: 4 }}
                      onClick={() => openDialog(i.id, i.status)}
                    >
                      Lihat Detail
                    </Buttons>
                  </Stack>
                </Stack>
              </Box>
            </>
          ))}
        </Stack>
        <DialogDetailOrder
          open={dialogDetail}
          id={idOrder}
          status={statusOrder}
          onClose={() => setDialogDetail(false)}
        />
        <DialogDoneOrder
          open={dialogDone}
          onClose={() => setDialogDone(false)}
          id={idOrder}
        />
      </Container>
    </>
  );
};

export default Order;
