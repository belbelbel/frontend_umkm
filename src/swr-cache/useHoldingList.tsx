import useSWR from "swr";
import { fetchHolding } from "../repositories/repo";

export const useHoldingList = () => {
  const { data, error, mutate } = useSWR("/holding", fetchHolding);

  const loading = !data && !error;
  // console.log(data);

  return {
    holding: data,
    loading,
    error,
    mutate,
  };
};
