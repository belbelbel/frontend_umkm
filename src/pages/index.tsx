import {
  AppBar,
  Box,
  Grid,
  Stack,
  Typography,
  Slide,
  Link,
} from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import im1 from "../../public/images/im1.png";
import im2 from "../../public/images/im2.png";
import im3 from "../../public/images/im3.png";
import im4 from "../../public/images/im4.png";

import kemenparekraf from "../../public/images/kemenparekraf.png";
import { Buttons } from "../components/Button/Button";
import { LandingAppBar } from "../components/AppBar/LandingAppBar";

const Landing = () => {
  const images = [im1, im2, im3, im4];
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage === images.length - 1) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <Stack>
      <Box>
        <LandingAppBar />
      </Box>
      <Box>
        <Container maxWidth="lg">
          <Box marginTop={25}>
            <Stack direction="row" spacing={3} justifyContent="space-around">
              <Stack direction="column">
                <Typography variant="h2" fontWeight={1000}>
                  Temukan berbagai produk
                </Typography>
                <Typography variant="h2" fontWeight={1000}>
                  lokal dari Indonesia
                </Typography>
                <Typography variant="body1" maxWidth={600} marginTop={4}>
                  Solusi marketplace untuk UMKM di seluruh Indonesia. Jual dan
                  beli produk dari berbagai pengrajin lokal di seluruh Indonesia
                </Typography>
                <Stack direction="row" spacing={3} marginTop={4}>
                  <Buttons
                    variation="contained"
                    sx={{ fontSize: 15, px: 4, py: 1 }}
                    onClick={() => router.push("/registration")}
                  >
                    Mulai sekarang
                  </Buttons>
                  <Buttons
                    variation="outlined"
                    sx={{ fontSize: 15, px: 7, py: 1 }}
                    onClick={() => router.push("/login")}
                  >
                    Masuk
                  </Buttons>
                </Stack>
                <Stack direction="row" spacing={2} marginTop={10}>
                  <Image src={kemenparekraf} alt="kemenparekraf" width={80} />
                  <Stack direction="column">
                    <Typography variant="body2">
                      Aplikasi kami didukung oleh :
                    </Typography>

                    <Typography variant="body1" maxWidth={300} fontWeight={600}>
                      Kementrian Pariwisata dan Ekonomi Kreatif Republik
                      Indonesia
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Image src={images[currentImage]} alt="a" width={340} />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Stack>
  );
};

export default Landing;
