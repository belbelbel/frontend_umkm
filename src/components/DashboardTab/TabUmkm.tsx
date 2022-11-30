import { TabList, TabPanel } from "@mui/lab";
import {
  Accordion,
  AccordionSummary,
  Box,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useHoldingList } from "../../swr-cache/useHoldingList";
import { AccordionHolding } from "../Accordion/AccordionHolding";
import { Buttons } from "../Button/Button";
import { DialogAddUmkmToHolding } from "../Dialog/DialogAddUmkmToHolding";
import { DialogCreateUmkm } from "../Dialog/DialogCreateUmkm";

interface Props {
  value: number;
}

export const TabUmkm: React.FC<Props> = ({ value }) => {
  const router = useRouter();
  const { holding } = useHoldingList();
  const [dialogAddUmkm, setDialogAddUmkm] = useState(false);
  const [idHolding, setIdHolding] = useState<number>();
  const [umkmName, setUmkmName] = useState<string>("");

  // const handleUmkm = (event: SelectChangeEvent) => {
  //   setSelectedUmkm(event.target.value);
  //   setDialogAdd(true);
  //   console.log(event.target.value);
  // };

  // const handleCreate = () => {
  //   setDialogCreate(true);
  // };

  const handleDialogAdd = (id: number, name: string) => {
    setUmkmName(name);
    setIdHolding(id);
    setDialogAddUmkm(true);
  };

  return (
    <Box py={3}>
      <TabPanel value={value}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box>
            <Typography fontWeight={600}>Daftar UMKM Pemilik</Typography>
            <Typography
              variant="subtitle2"
              marginTop={2}
              color="GrayText"
              marginBottom={4}
            >
              Anda dapat melihat daftar UMKM Induk serta dapat menambahkan UMKM
              Pilihan sesuai dengan UMKM Induk.
            </Typography>
          </Box>
          <Buttons
            variation="contained"
            size="medium"
            sx={{ py: 1, px: 2, width: 180, height: 40 }}
            startIcon={<i className="bx bx-plus" />}
            onClick={() => router.push("/seller/createholding")}
          >
            Buat UMKM
          </Buttons>
        </Stack>

        {holding?.map((item, index) => {
          // const { umkms } = useUmkmList(item.id)
          return (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <i
                      className="bx bx-chevron-down"
                      style={{ fontSize: 23 }}
                    />
                  }
                >
                  <Stack direction="row">
                    <Typography>{index + 1}</Typography>
                    <Typography marginLeft={8}>{item.nama}</Typography>
                  </Stack>
                </AccordionSummary>
                <>
                  <AccordionHolding id={item.id} nama_umkm={item.nama} />
                </>

                <>
                  <Buttons
                    size="small"
                    variation="outlined"
                    startIcon={<i className="bx bx-plus" />}
                    sx={{
                      marginLeft: 10.5,
                      px: 2,
                      marginBottom: 5,
                      marginTop: 2,
                    }}
                    onClick={() => handleDialogAdd(item.id, item.nama)}
                  >
                    Tambah Umkm
                  </Buttons>
                </>

                <Stack sx={{ marginBottom: 10 }}>
                  <DialogAddUmkmToHolding
                    holdingId={idHolding}
                    umkm_parent={umkmName}
                    open={dialogAddUmkm}
                    onClose={() => setDialogAddUmkm(false)}
                  />
                </Stack>
              </Accordion>
            </>
          );
        })}
      </TabPanel>
    </Box>
  );
};
