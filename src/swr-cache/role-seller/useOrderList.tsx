import useSWR from "swr";
import { fetchOrderList } from "../../repositories/repo";

export const useOrderList = () => {
  const { data, error, mutate } = useSWR(
    `/umkm/all/pembelian?perpage=30&orderby=id&order=desc`,
    fetchOrderList
  );

  const loading = !data && !error;
  // console.log(data);

  return {
    listOrder: data,
    loading,
    error,
    mutate,
  };
};
