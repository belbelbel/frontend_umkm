// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

export const apiEcom = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
