import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useOrderList } from "../../swr-cache/role-seller/useOrderList";
import { Buttons } from "../Button/Button";
import { DialogLacakPengiriman } from "../Dialog/DialogLacakPengiriman";

interface Props {
  value: number;
  index: number;
}

export const TabPesananDikirim: React.FC<Props> = ({ value, index }) => {
  const router = useRouter();
  const { listOrder } = useOrderList();
  const [uname, setUname] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [open, setOpen] = useState(false);

  const handleOpenLacak = (unames: string, statusdone: string) => {
    setUname(unames);
    setStatus(statusdone);
    setOpen(true);
  };

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box width={900} px={5} py={3}>
          <Typography fontWeight={600}>Pesanan Dalam Pengiriman</Typography>
          <Typography
            variant="subtitle2"
            marginTop={2}
            color="GrayText"
            marginBottom={4}
          >
            Lacak pengiriman berdasarkan nomer resi.
          </Typography>
          <Stack direction="column" spacing={2}>
            {listOrder?.map((i) => (
              <>
                {i.review === null && i.review === "" && (
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
                                i.status === "sent"
                                  ? "rgba(255, 190, 158, 0.8)"
                                  : "rgba(154, 193, 255, 0.8)",
                              px: 3,
                              py: 0.5,
                              borderRadius: 100,
                            }}
                          >
                            <Typography
                              color={
                                i.status === "sent"
                                  ? "rgba(235, 78, 0, 0.8)"
                                  : "rgba(17, 20, 254, 0.8)"
                              }
                            >
                              {i.status}
                            </Typography>
                          </Box>
                          <Buttons
                            variation="contained"
                            sx={{ px: 3, py: 0.5 }}
                            onClick={() => handleOpenLacak(i.no_resi, i.status)}
                          >
                            Lacak pengiriman
                          </Buttons>
                        </Stack>
                      </Stack>
                    </Box>
                  </>
                )}
              </>
            ))}
          </Stack>
          <DialogLacakPengiriman
            open={open}
            onClose={() => setOpen(false)}
            resi={uname}
            status={status}
          />
        </Box>
      )}
    </div>
  );
};
