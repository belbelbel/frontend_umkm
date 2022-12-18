import useSWR from "swr";
import { BuyerListOrder } from "../../repositories/repo";

export const useBuyerListOrder = () => {
  const { data, error, mutate } = useSWR(
    `/pembelian?perpage=30&orderby=id&order=desc`,
    BuyerListOrder
  );

  const loading = !data && !error;
  // console.log(data);

  return {
    order: data,
    loading,
    error,
    mutate,
  };
};
