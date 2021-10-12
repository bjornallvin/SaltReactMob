import React from "react";
import { IQuotes } from "../types";
import { Quote } from "./quote";

export const QuoteList = ({ quotes }: { quotes: IQuotes }) => {
  return (
    <div>
      {quotes.map((quote) => (
        <Quote key={quote.id} quote={quote} />
      ))}
    </div>
  );
};
