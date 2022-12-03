import { TabList, TabPanel } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useHoldingList } from "../../swr-cache/useHoldingList";
import { AccordionHolding } from "../Accordion/AccordionHolding";
import { Buttons } from "../Button/Button";
import { DialogAddUmkmToHolding } from "../Dialog/DialogAddUmkmToHolding";
import { DialogDetailUmkm } from "../Dialog/DialogDetailUmkm";
import { DialogEditHolding } from "../Dialog/DialogEditHolding";

interface Props {
  value: number;
}

export const TabUmkm: React.FC<Props> = ({ value }) => {
  const router = useRouter();
  const { holding, mutate } = useHoldingList();
  const [dialogAddUmkm, setDialogAddUmkm] = useState(false);
  const [idHolding, setIdHolding] = useState<number>();
  const [umkmName, setUmkmName] = useState<string>("");
  const [dialogEditHolding, setDialogEditHolding] = useState(false);

  const handleDialogAdd = (id: number, name: string) => {
    setUmkmName(name);
    setIdHolding(id);
    setDialogAddUmkm(true);
    console.log(id);
  };

  const handleEditHolding = (id: number, name: string) => {
    setIdHolding(id);
    setUmkmName(name);
    setDialogEditHolding(true);
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
                    <Stack direction="row">
                      <Typography>{index + 1}</Typography>
                      <Typography
                        marginLeft={8}
                        marginRight={15}
                        fontWeight={600}
                      >
                        {item.nama}
                      </Typography>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 9 }}>
                  <AccordionHolding id={item.id} nama_umkm={item.nama} />
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ marginTop: 3, marginBottom: 2 }}
                  >
                    <Buttons
                      variation="contained"
                      startIcon={<i className="bx bx-plus" />}
                      size="medium"
                      sx={{
                        py: 1,
                        px: 2,
                        width: 160,
                        height: 35,
                      }}
                      onClick={() => handleDialogAdd(item.id, item.nama)}
                    >
                      Tambah Umkm
                    </Buttons>
                    <Buttons
                      variation="contained"
                      startIcon={<i className="bx bx-edit" />}
                      size="medium"
                      sx={{
                        py: 1,
                        px: 2,
                        width: 160,
                        height: 35,
                        marginTop: 3,
                        marginBottom: 2,
                      }}
                      onClick={() => handleEditHolding(item.id, item.nama)}
                    >
                      Edit Holding
                    </Buttons>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
        <DialogAddUmkmToHolding
          holdingId={idHolding}
          key={idHolding}
          open={dialogAddUmkm}
          succes={() => setDialogAddUmkm(false)}
          onClose={() => {
            setDialogAddUmkm(false);
          }}
          mutate={mutate}
        />
        <DialogEditHolding
          id={idHolding}
          name={umkmName}
          onClose={() => setDialogEditHolding(false)}
          open={dialogEditHolding}
        />
      </TabPanel>
    </Box>
  );
};
