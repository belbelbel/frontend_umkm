import { TabContext, TabList } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AccordionHolding } from "../../components/Accordion/AccordionHolding";
import { SellerAppBar } from "../../components/AppBar/SellerAppBar";
import { Buttons } from "../../components/Button/Button";
import { TabPesanan } from "../../components/DashboardTab/TabPesanan";
import { TabUmkm } from "../../components/DashboardTab/TabUmkm";
import { DialogAddUmkmToHolding } from "../../components/Dialog/DialogAddUmkmToHolding";
import { fetchUmkm } from "../../repositories/repo";
import { useHoldingList } from "../../swr-cache/useHoldingList";
import { useUmkmbyId } from "../../swr-cache/useUmkmByHolding";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { Umkm } from "../../types/models";

const DashboardSeller = () => {
  const router = useRouter();
  const { umkm } = useUmkmList();
  const { holding } = useHoldingList();

  const [tab, setTab] = useState(1);
  const [dialogAddUmkm, setDialogAddUmkm] = useState(false);
  const [idHolding, setIdHolding] = useState<number>();
  const [umkmName, setUmkmName] = useState<string>("");

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDialog = (id: number, name: string) => {
    setUmkmName(name);
    setIdHolding(id);
    setDialogAddUmkm(true);
  };

  return (
    <>
      <SellerAppBar />
      <Container maxWidth="lg" sx={{ marginTop: 12 }}>
        <Typography variant="h4" fontWeight={600}>
          Dashboard
        </Typography>
        <Stack direction="row" marginTop={5} justifyContent="space-between">
          <Box
            sx={{
              width: 230,
              height: 90,
              backgroundColor: "#F1A51D",
              borderRadius: 1,
              padding: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" textAlign="center" spacing={1}>
              <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                0
              </Typography>
              <Typography
                textAlign="center"
                variant="body1"
                fontWeight={300}
                color="#FFFFFF"
              >
                Perlu Dikirim
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              width: 230,
              height: 90,
              backgroundColor: "#32DCA6",
              borderRadius: 1,
              padding: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" textAlign="center" spacing={1}>
              <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                0
              </Typography>
              <Typography
                textAlign="center"
                variant="body1"
                fontWeight={300}
                color="#FFFFFF"
              >
                Sedang Dikirim
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              width: 230,
              height: 90,
              backgroundColor: "#FD8A9D",
              borderRadius: 1,
              padding: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" textAlign="center" spacing={1}>
              <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                0
              </Typography>
              <Typography
                textAlign="center"
                variant="body1"
                fontWeight={300}
                color="#FFFFFF"
              >
                Penilaian Barang
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              width: 230,
              height: 90,
              backgroundColor: "#9569EA",
              borderRadius: 1,
              padding: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" textAlign="center" spacing={1}>
              <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                0
              </Typography>
              <Typography
                textAlign="center"
                variant="body1"
                fontWeight={300}
                color="#FFFFFF"
              >
                Pengembalian
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <TabContext value={tab}>
            <TabList
              onChange={handleTab}
              sx={{
                position: "sticky",
                overflow: "auto",
                zIndex: 5,
                top: 70,
                left: 0,
                backgroundColor: "#FFFFFF",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#000000",
                },
              }}
            >
              <Tab
                label="Ringkasan Pesanan"
                icon={<i className="bx bxs-shopping-bags" />}
                iconPosition="start"
                value={1}
                sx={{
                  px: 3,
                  textTransform: "initial",
                  fontSize: "16px",
                  "&.Mui-selected": {
                    color: "#000000",
                  },
                }}
              />
              <Tab
                label="Daftar UMKM"
                icon={<i className="bx bx-store" />}
                iconPosition="start"
                value={2}
                sx={{
                  px: 3,
                  textTransform: "initial",
                  fontSize: "16px",
                  "&.Mui-selected": {
                    color: "#000000",
                  },
                }}
              />
            </TabList>
            <TabPesanan value={1} />
            <TabUmkm value={2} />
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default DashboardSeller;
