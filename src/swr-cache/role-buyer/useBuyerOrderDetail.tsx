import useSWR from "swr";
import { BuyerOrderDetail } from "../../repositories/repo";

export const useBuyerOrderDetail = (id: number) => {
  const {
    data: orderDetail,
    mutate,
    error,
  } = useSWR([`/pembelian/${id}`, id], (url, id) => BuyerOrderDetail(id));

  const loading = !orderDetail && !error;

  return {
    orderDetail,
    loading,
    mutate,
    error,
  };
};
