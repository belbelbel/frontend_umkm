import useSWR from "swr";
import { fetchUmkm } from "../repositories/repo";

export const useUmkmList = () => {
  const { data, error, mutate } = useSWR("/umkm", fetchUmkm);

  const loading = !data && !error;
  // console.log(data);

  return {
    umkm: data,
    loading,
    error,
    mutate,
  };
};
