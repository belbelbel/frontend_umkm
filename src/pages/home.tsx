import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { MainAppBar } from "../components/AppBar/MainAppBar";
import { ProductCard } from "../components/Card/ProductCard";
import banner1 from "../../public/images/banner1.png";
import banner2 from "../../public/images/banner2.png";
import diskon from "../../public/images/diskon.png";
import kt1 from "../../public/images/kt1.png";
import kt2 from "../../public/images/kt2.png";
import kt3 from "../../public/images/kt3.png";
import kt4 from "../../public/images/kt4.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../swr-cache/useUser";
import { useProductPublicList } from "../swr-cache/role-public/useProductPublicList";

export const Home = () => {
  const images = [banner1, banner2];
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();
  const { user, loggedOut } = useUser();
  const { publicProduct } = useProductPublicList();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }

    const interval = setInterval(() => {
      if (currentImage === images.length - 1) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  if (!user) {
    <></>;
  }

  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Image
          src={images[currentImage]}
          alt="a"
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 400,
            borderRadius: "50px",
          }}
        />

        <Stack
          direction="row"
          marginTop={7}
          marginBottom={2}
          justifyContent="space-between"
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Kategori
            </Typography>
            <Stack direction="row" spacing={3}>
              <Stack
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "transparent",
                    position: "absolute",
                    borderRadius: 2,
                    width: 122,
                    height: 26,
                    textAlign: "center",
                    py: 6,
                    "&:hover": {
                      background: "rgba(12, 12, 12, 0.3)",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Kuliner
                </Typography>

                <Image
                  src={kt1}
                  alt="k"
                  style={{
                    border: "1px solid rgba(172, 172, 172, 0.8)",
                    borderRadius: 10,
                    width: 120,
                    height: 120,
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "transparent",
                    position: "absolute",
                    borderRadius: 2,
                    width: 122,
                    height: 26,
                    textAlign: "center",
                    py: 6,
                    "&:hover": {
                      background: "rgba(12, 12, 12, 0.3)",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Fashion
                </Typography>

                <Image
                  src={kt2}
                  alt="k"
                  style={{
                    border: "1px solid rgba(172, 172, 172, 0.8)",
                    borderRadius: 10,
                    width: 120,
                    height: 120,
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "transparent",
                    position: "absolute",
                    borderRadius: 2,
                    width: 122,
                    height: 26,
                    textAlign: "center",
                    py: 6,
                    "&:hover": {
                      background: "rgba(12, 12, 12, 0.3)",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Furniture
                </Typography>

                <Image
                  src={kt3}
                  alt="k"
                  style={{
                    border: "1px solid rgba(172, 172, 172, 0.8)",
                    borderRadius: 10,
                    width: 120,
                    height: 120,
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "transparent",
                    position: "absolute",
                    borderRadius: 2,
                    width: 122,
                    height: 26,
                    textAlign: "center",
                    py: 6,
                    "&:hover": {
                      background: "rgba(12, 12, 12, 0.3)",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Seni
                </Typography>

                <Image
                  src={kt4}
                  alt="k"
                  style={{
                    border: "1px solid rgba(172, 172, 172, 0.8)",
                    borderRadius: 10,
                    width: 120,
                    height: 120,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Diskon Bulan Ini
            </Typography>

            <Image
              src={diskon}
              alt="diskon"
              style={{
                border: "1px solid rgba(172, 172, 172, 0.8)",
                borderRadius: 10,
                width: 600,
                height: 120,
              }}
            />
          </Stack>
        </Stack>

        <Typography
          variant="h6"
          fontWeight={600}
          marginTop={5}
          marginBottom={3}
        >
          Produk Menarik
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {publicProduct?.map((i) => (
            <Grid item key={i.id}>
              <ProductCard
                id={i.id}
                nama={i.nama}
                harga={i.harga}
                diskon={i.diskon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
