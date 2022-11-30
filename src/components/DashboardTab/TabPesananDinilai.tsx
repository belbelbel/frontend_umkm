import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {
  value: number;
  index: number;
}

export const TabPesananDinilai: React.FC<Props> = ({ value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box width={900} px={5} py={3}>
          <Typography fontWeight={600}>Penilaian Pesanan</Typography>
          <Typography
            variant="subtitle2"
            marginTop={2}
            color="GrayText"
            marginBottom={4}
          >
            Anda dapat melihat dan membalas penilaian pembeli pada tiap produk
            untuk meningkatkan respon penjualan Anda.
          </Typography>
          <Stack direction="column" spacing={2}>
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
                    Username
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText">
                    XAB123CVF
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
              </Stack>
            </Box>
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
                    Username
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText">
                    XAB123CVF
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
              </Stack>
            </Box>
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
                    Username
                  </Typography>
                  <Typography variant="subtitle2" color="GrayText">
                    XAB123CVF
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Typography>1</Typography>
                  <Typography>Cokelat rasa cokelat</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </div>
  );
};
