import useSWR from "swr";
import { fetchHoldingId } from "../repositories/repo";

export const useHoldingId = (id: number) => {
  const {
    data: holdingDetail,
    mutate,
    error,
  } = useSWR([`/holding/${id}`, id], (url, id) => fetchHoldingId(id));

  const loading = !holdingDetail && !error;

  return {
    holdingDetail,
    loading,
    mutate,
    error,
  };
};
