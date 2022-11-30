import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Container,
  Stack,
  Link,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Buttons } from "../Button/Button";
import logo from "../../../public/images/logo.png";
import { useRouter } from "next/router";

export const LandingAppBar: React.FC = () => {
  const router = useRouter();
  return (
    <AppBar
      variant="outlined"
      sx={{ backgroundColor: "#FFFFFF", height: 80, py: 3, border: "none" }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link
            onClick={() => router.push("/")}
            underline="none"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image src={logo} alt="umkm" width={80} />
          </Link>
          <Stack direction="row" spacing={4}>
            <Link
              underline="none"
              marginLeft={5}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                color="#000000"
                fontWeight={600}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Beranda
              </Typography>
            </Link>
            <Link underline="none">
              <Typography
                color="#000000"
                fontWeight={600}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Tentang kami
              </Typography>
            </Link>
            <Link underline="none">
              <Typography
                color="#000000"
                fontWeight={600}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Kontak
              </Typography>
            </Link>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Buttons
              variation="contained"
              onClick={() => router.push("/registration")}
            >
              Daftar
            </Buttons>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
