import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import React from "react";
import contoh from "../../../public/images/contoh.png";

export const ProductCard: React.FC = () => {
  return (
    <Box>
      <Stack direction="column">
        <Image
          src={contoh}
          alt="gambar produk"
          style={{
            maxWidth: 280,
            maxHeight: 210,
            borderRadius: 7,
            marginBottom: 5,
          }}
        />

        <Stack direction="column">
          <Stack maxWidth={300} marginTop={1}>
            <Typography variant="h6">Baju Batik</Typography>
          </Stack>
          <Stack maxWidth={300}>
            <Typography variant="body1">Rp 250.000</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <i className="bx bx-star" />
            <i className="bx bx-star" />
            <i className="bx bx-star" />
            <i className="bx bx-star" />
            <i className="bx bx-star" />
            <Typography variant="subtitle2" marginLeft={2}>
              5.0
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
