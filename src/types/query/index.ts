import { ParsedUrlQuery } from "querystring";

export interface BaseParams extends ParsedUrlQuery {
  id: string;
  umkmId: string;
  holdingId: string;
}
