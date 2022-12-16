import useSWR from "swr";
import { fetchProductPublic } from "../../repositories/repo";

export const useProductPublicList = () => {
  const { data, error, mutate } = useSWR(
    `/public/produk?perpage=10&orderby=id&order=desc`,
    fetchProductPublic
  );

  const loading = !data && !error;
  // console.log(data);

  return {
    publicProduct: data,
    loading,
    error,
    mutate,
  };
};
