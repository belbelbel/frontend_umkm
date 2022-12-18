import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import contoh from "../../../public/images/contoh.png";
import myImageLoader from "../../modules/loaderImage";
import { useProductDetailPublic } from "../../swr-cache/role-public/useProductDetailPublic";

interface Props {
  id: number;
  nama: string;
  harga: string;
  diskon: string;
  images?: string;
  onClicks?: () => void;
}

export const ProductCard: React.FC<Props> = ({
  id,
  nama,
  harga,
  diskon,
  images,
  onClicks,
}) => {
  const router = useRouter();
  const { productDetailPublic } = useProductDetailPublic(id);

  return (
    <Box
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => router.push(`/buyer/product/${id}`)}
    >
      <Stack direction="column">
        <Image
          // loader={myImageLoader}
          src={images + "?w=280"}
          // fill
          alt="gambar produk"
          width={280}
          height={210}
          style={{
            // width: 280,
            // height: 210,
            borderRadius: 7,
            marginBottom: 5,
          }}
        />

        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Stack maxWidth={300} marginTop={1}>
              <Typography variant="h6">{nama}</Typography>
            </Stack>
            <Stack maxWidth={300}>
              <Typography variant="body1">{"Rp" + "" + harga}</Typography>
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
      </Stack>
    </Box>
  );
};
