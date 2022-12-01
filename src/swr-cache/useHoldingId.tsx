import useSWR from "swr";
import { fetchHoldingId } from "../repositories/repo";

export const useHoldingId = (id: number) => {
  const {
    data: umkms,
    mutate,
    error,
  } = useSWR([`/holding/${id}`, id], (url, id) => fetchHoldingId(id));

  const loading = !umkms && !error;

  return {
    umkms,
    loading,
    mutate,
    error,
  };
};
