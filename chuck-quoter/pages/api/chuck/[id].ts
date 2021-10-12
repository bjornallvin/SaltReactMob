// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase";
import { db } from "../../../firebase";
import { IQuote } from "../../../types";

const NORRIS_API = "https://api.chucknorris.io/jokes/search?query=hand";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const id = req.query.id;
    const charlieCount = JSON.parse(req.body).charlieCount;
    console.log("ID : ", id);
    const snapshot = await db.collection("quotes").where("id", "==", id).get();
    console.log("size:", snapshot.size);
    if (snapshot.size > 0) {
      console.log("lh", snapshot.docs.length);
      const doc = snapshot.docs[0];
      doc.ref.update({ charlieCount });
    } else {
      //console.log({ id }, { charlieCount });
      db.collection("quotes").add({ charlieCount, id });
    }
    res.status(200).json({ name: "ok" });

    return;
  }

  res.status(200).json({ name: "John Doe" });
}
