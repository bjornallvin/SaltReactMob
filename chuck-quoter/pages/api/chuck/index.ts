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
  if (req.method === "GET") {
    const norrisQuotes = await fetch(NORRIS_API);
    const data = await norrisQuotes.json();
    const quotes = data.result;

    const snapshot = await db.collection("quotes").get();
    snapshot.docs.forEach((doc) => {
      const match = quotes.find((quote: IQuote) => quote.id === doc.data().id);
      match.charlieCount = doc.data().charlieCount;
    });

    res.status(200).json(quotes);
    return;
  } else {
    const id = req.query.id;
    const snapshot = await db.collection("qoutes").where("id", "==", id).get();
    if (snapshot.size > 0) {
      const doc = snapshot.docs[0];
      doc.ref.update({ charlieCount: doc.data().charlieCount + 1 });
    } else {
      db.collection("quotes").add({ charlieCount: 1, id });
    }
    res.status(200);
    return;
  }

  res.status(200).json({ name: "John Doe" });
}
