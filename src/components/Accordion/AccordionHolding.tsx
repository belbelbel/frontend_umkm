import {
  AccordionSummary,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHoldingId } from "../../swr-cache/useHoldingId";
import { useUmkmByHoldingId } from "../../swr-cache/useUmkmByHoldingId";
import { useUmkmList } from "../../swr-cache/useUmkmList";
import { DialogDetailUmkm } from "../Dialog/DialogDetailUmkm";

interface Props {
  id: number;
  nama_umkm: string;
}

export const AccordionHolding: React.FC<Props> = ({ id, nama_umkm }) => {
  const { umkm } = useUmkmList();
  const { umkmByHolding } = useUmkmByHoldingId(id);
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>("");
  const [detailUmkm, setDetailUmkm] = useState(false);

  const handleDetailUmkm = (idUmkm: number, name: string) => {
    setSelectedId(idUmkm);
    setSelectedName(name);
    setDetailUmkm(true);
    console.log(selectedId);
  };

  return (
    <>
      {umkmByHolding?.map((i) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={i.id}
          sx={{ marginLeft: 9, marginRight: 6 }}
        >
          <AccordionSummary key={i.id}>
            <Typography>{i.nama_umkm}</Typography>
          </AccordionSummary>
          {/* <Stack direction="row" spacing={0}>
            <Tooltip title="lihat">
              <IconButton onClick={() => handleDetailUmkm(i.id, i.nama_umkm)}>
                <i className="bx bx-show" style={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="edit">
              <IconButton onClick={() => handleDetailUmkm(i.id, i.nama_umkm)}>
                <i className="bx bx-edit" style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="hapus">
              <IconButton onClick={() => handleDetailUmkm(i.id, i.nama_umkm)}>
                <i className="bx bx-trash" style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>
          </Stack> */}
        </Stack>
      ))}
      <DialogDetailUmkm
        open={detailUmkm}
        id={selectedId}
        parent={selectedName}
        onClose={() => {
          setDetailUmkm(false);
          setSelectedId(0);
        }}
      />
    </>
  );
};
