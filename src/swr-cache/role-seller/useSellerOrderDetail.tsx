import useSWR from "swr";
import { fetchOrderListDetail } from "../../repositories/repo";

export const useSellerOrderDetail = (id: number) => {
  const {
    data: sellerOrderDetail,
    mutate,
    error,
  } = useSWR([`/umkm/all/pembelian/${id}`, id], (url, id) =>
    fetchOrderListDetail(id)
  );

  const loading = !sellerOrderDetail && !error;

  return {
    sellerOrderDetail,
    loading,
    mutate,
    error,
  };
};
