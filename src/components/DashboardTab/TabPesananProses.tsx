import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useOrderList } from "../../swr-cache/role-seller/useOrderList";
import { Buttons } from "../Button/Button";

interface Props {
  value: number;
  index: number;
  id: number;
}

export const TabPesananProses: React.FC<Props> = ({ value, index, id }) => {
  const router = useRouter();
  const { listOrder } = useOrderList();
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box width={900} px={5} py={3}>
          <Typography fontWeight={600}>Pesanan Perlu Diproses</Typography>
          <Typography
            variant="subtitle2"
            marginTop={2}
            color="GrayText"
            marginBottom={4}
          >
            Segera proses pesanan Anda setelah pembeli melakukan pembayaran.
            Sistem akan otomatis membatalkan pesanan apabila pesanan belum
            diproses dalam jangka waktu tiga hari setelah pembayaran.
          </Typography>
          <Stack direction="column" spacing={2}>
            {listOrder?.map((i) => (
              <>
                {i.no_resi === null && (
                  <>
                    <Box
                      sx={{
                        px: 2,
                        py: 2,
                        borderRadius: 3,
                        border: "1px solid #EFEFEF",
                      }}
                    >
                      <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle2" color="GrayText">
                            {i.buyer.nama}
                          </Typography>
                          <Typography variant="subtitle2" color="GrayText">
                            {i.no_kuitansi}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={5}>
                          <Typography>{i.details[0].jumlah_barang}</Typography>
                          <Typography>{i.details[0].produk.nama}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Box
                            sx={{
                              backgroundColor:
                                i.status === "paid"
                                  ? "rgba(193, 255, 166, 0.8)"
                                  : "rgba(255, 177, 177, 0.8)",
                              px: 3,
                              py: 0.5,
                              borderRadius: 100,
                            }}
                          >
                            <Typography
                              color={
                                i.status === "paid"
                                  ? "rgba(68, 165, 25, 0.8)"
                                  : "rgba(255, 74, 74, 0.8)"
                              }
                            >
                              {i.status}
                            </Typography>
                          </Box>
                          <Buttons
                            variation="contained"
                            sx={{ px: 3, py: 0.5 }}
                            onClick={() =>
                              router.push(`/seller/pembelian/${i.id}`)
                            }
                          >
                            Periksa pembelian
                          </Buttons>
                        </Stack>
                      </Stack>
                    </Box>
                  </>
                )}
              </>
            ))}
          </Stack>
        </Box>
      )}
    </div>
  );
};
