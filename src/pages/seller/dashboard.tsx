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
import { useOrderList } from "../../swr-cache/role-seller/useOrderList";
import { useHoldingList } from "../../swr-cache/useHoldingList";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { useUser } from "../../swr-cache/useUser";
import { Umkm } from "../../types/models";

const DashboardSeller = () => {
  const router = useRouter();
  const { user } = useUser();
  const { listOrder } = useOrderList();

  const [tab, setTab] = useState(1);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  let map = listOrder?.filter((i) => i.status === "paid").map((j) => j.status);
  let perluDikirim = [];
  perluDikirim.push(map);

  let maps = listOrder?.filter((i) => i.status === "sent").map((j) => j.status);
  let sedangDikirim = [];
  sedangDikirim.push(maps);

  let mapss = listOrder
    ?.filter((i) => i.review !== "" && i.review !== null)
    .map((j) => j.status);
  let dinilai = [];
  dinilai.push(mapss);

  let mapsss = listOrder
    ?.filter((i) => i.status === "unpaid")
    .map((j) => j.status);
  let pengembalian = [];
  pengembalian.push(mapsss);

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
              width: 280,
              height: 100,
              // backgroundColor: "#F1A51D",
              borderRadius: 1,
              padding: 3,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 5,
            }}
          >
            <Stack direction="column" spacing={1}>
              <Typography variant="body1" fontWeight={300} color="#000000">
                Balance
              </Typography>
              <Typography variant="h4" fontWeight={600} color="#000000">
                {"Rp" + " " + user.balance}
              </Typography>
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                width: 150,
                height: 100,
                backgroundColor: "#F1A51D",
                borderRadius: 1,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction="column" textAlign="center" spacing={1}>
                <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                  {perluDikirim.map((i) => i?.length)}
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
                width: 150,
                height: 100,
                backgroundColor: "#32DCA6",
                borderRadius: 1,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction="column" textAlign="center" spacing={1}>
                <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                  {sedangDikirim.map((i) => i?.length)}
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
                width: 150,
                height: 100,
                backgroundColor: "#FD8A9D",
                borderRadius: 1,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction="column" textAlign="center" spacing={1}>
                <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                  {dinilai.map((i) => i?.length)}
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
                width: 150,
                height: 100,
                backgroundColor: "#9569EA",
                borderRadius: 1,
                padding: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack direction="column" textAlign="center" spacing={1}>
                <Typography variant="h3" fontWeight={600} color="#FFFFFF">
                  {pengembalian.map((i) => i?.length)}
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
        </Stack>

        <Box sx={{ width: "100%", marginTop: 4 }}>
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
