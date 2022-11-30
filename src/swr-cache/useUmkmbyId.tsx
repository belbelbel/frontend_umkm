import useSWR from "swr";
import { fetchUmkmHoldingById } from "../repositories/repo";

export const useUmkmbyId = (id: number) => {
  const {
    data: umkms,
    mutate,
    error,
  } = useSWR([`/holding/${id}`, id], (url, id) => fetchUmkmHoldingById(id));

  const loading = !umkms && !error;
  // console.log(umkms);

  return {
    umkms,
    loading,
    mutate,
    error,
  };
};
