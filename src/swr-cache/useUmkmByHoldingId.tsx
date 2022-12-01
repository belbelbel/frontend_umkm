// http://localhost:8000/api/umkm?holding_id=3

import useSWR from "swr";
import { fetchUmkmHolding } from "../repositories/repo";

export const useUmkmByHoldingId = (id: number) => {
  const {
    data: umkmByHolding,
    mutate,
    error,
  } = useSWR([`/umkm?holding_id=${id}`, id], (url, id) => fetchUmkmHolding(id));

  const loading = !umkmByHolding && !error;

  return {
    umkmByHolding,
    loading,
    mutate,
    error,
  };
};
