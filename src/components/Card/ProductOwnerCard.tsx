import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import contoh from "../../../public/images/contoh.png";
import { BaseParams } from "../../types/query";

interface Props {
  nama_produk: string;
  harga: string;
  diskon: string;
  image?: string;
  onClick: () => void;
}

export const ProductOwnerCard: React.FC<Props> = ({
  nama_produk,
  harga,
  diskon,
  image,
  onClick,
}) => {
  const router = useRouter();
  const { holdingId, umkmId, productId } = router.query as BaseParams;
  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
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
            <Typography variant="h6">{nama_produk}</Typography>
          </Stack>
          <Stack maxWidth={300}>
            <Typography variant="body1">Rp {harga}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
