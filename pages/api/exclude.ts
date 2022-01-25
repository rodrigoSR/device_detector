// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { init } from "../../services/facebook";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "*",
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  await cors(req, res);
  const data = {
    signed_request:
      "_LxLd1hvVsDb9dAoZ5-jrbULC4E_ED9KIWaA1hjEeaA.eyJ1c2VyX2lkIjoiNDYxMTkzOTg3ODg1OTU0OCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjQzMTI3NzQ4fQ",
  };
  const retorno = init(data.signed_request);

  res.status(201).json(retorno);
}
