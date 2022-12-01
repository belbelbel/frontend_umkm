import useSWR from "swr";
import { fetchUmkmById } from "../repositories/repo";

export const useUmkmById = (id: number) => {
  const {
    data: umkmById,
    mutate,
    error,
  } = useSWR([`/umkm/${id}`, id], (url, id) => fetchUmkmById(id));

  const loading = !umkmById && !error;

  return {
    umkmById,
    loading,
    mutate,
    error,
  };
};
