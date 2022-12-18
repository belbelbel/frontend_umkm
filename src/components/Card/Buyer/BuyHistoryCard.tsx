import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export const BuyHistoryCard = () => {
  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 2,
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.2)",
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
    </>
  );
};
