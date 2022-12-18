import useSWR from "swr";
import { fetchReviewProduct } from "../../repositories/repo";

export const useProductReview = (id: number) => {
  const {
    data: reviews,
    mutate,
    error,
  } = useSWR([`/public/produk/${id}/reviews`, id], (url, id) =>
    fetchReviewProduct(id)
  );

  const loading = !reviews && !error;

  return {
    reviews,
    loading,
    mutate,
    error,
  };
};
