import { ParsedUrlQuery } from "querystring";

export interface BaseParams extends ParsedUrlQuery {
  umkmId: string;
  holdingId: string;
  productId: string;
  pembelianId: string;
}
