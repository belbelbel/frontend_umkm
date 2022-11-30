import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { TabPesananDikirim } from "./TabPesananDikirim";
import { TabPesananDinilai } from "./TabPesananDinilai";
import { TabPesananProses } from "./TabPesananProses";

interface Props {
  value: number;
}

export const TabPesanan: React.FC<Props> = ({ value }) => {
  const [tab, setTab] = useState(1);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <TabPanel value={value}>
      <Box sx={{ display: "flex" }}>
        <Tabs
          value={tab}
          onChange={handleTab}
          orientation="vertical"
          TabIndicatorProps={{
            style: { background: "none" },
          }}
          sx={{
            width: 200,
            height: 250,
            backgroundColor: "#FAFAFA",
            py: 2,
            marginTop: 3,
            position: "sticky",
            overflow: "auto",
            zIndex: 5,
            top: 150,
            left: 0,
            "&.MuiTab-wrapper": {
              alignItems: "left",
              justifyContent: "left",
              textAlign: "left",
            },
          }}
        >
          <Tab
            label="Perlu diproses"
            value={1}
            sx={{
              textTransform: "initial",
              fontSize: "16px",
              "&.Mui-selected": {
                color: "#000000",
                borderRadius: "100px",
                background: "rgba(184, 40, 251, 0.08)",
              },
            }}
          />
          <Tab
            label="Sedang Dikirim"
            value={2}
            sx={{
              textTransform: "initial",
              fontSize: "16px",
              "&.Mui-selected": {
                color: "#000000",
                borderRadius: "100px",
                background: "rgba(184, 40, 251, 0.08)",
              },
            }}
          />
          <Tab
            label="Dinilai"
            value={3}
            sx={{
              textTransform: "initial",
              fontSize: "16px",
              "&.Mui-selected": {
                color: "#000000",
                borderRadius: "100px",
                background: "rgba(184, 40, 251, 0.08)",
              },
            }}
          />
        </Tabs>
        <TabPesananProses value={tab} index={1} />
        <TabPesananDikirim value={tab} index={2} />
        <TabPesananDinilai value={tab} index={3} />
      </Box>
    </TabPanel>
  );
};
