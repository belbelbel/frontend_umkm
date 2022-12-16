import useSWR from "swr";
import { fetchProductDetailPublic } from "../../repositories/repo";

export const useProductDetailPublic = (id: number) => {
  const {
    data: productDetailPublic,
    mutate,
    error,
  } = useSWR([`/public/produk/${id}`, id], (url, id) =>
    fetchProductDetailPublic(id)
  );

  const loading = !productDetailPublic && !error;

  return {
    productDetailPublic,
    loading,
    mutate,
    error,
  };
};
