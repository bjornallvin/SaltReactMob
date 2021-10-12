import React, { useState, useEffect } from "react";
import { IQuote } from "../types";
import { AddCount } from "./add";
import useDebounce from "../hooks/useDebounce";
import styles from "../styles/quote.module.css";

export const Quote = ({ quote }: { quote: IQuote }) => {
  const initialState = quote.charlieCount || 0;
  const [counter, setCounter] = useState(initialState);
  let utterance = new SpeechSynthesisUtterance(quote.value);

  useDebounce(
    () => {
      if (initialState === counter) return;
      speechSynthesis.speak(utterance);
      fetch("/api/chuck/" + quote.id, {
        method: "POST",
        body: JSON.stringify({ charlieCount: counter }),
      });
    },
    350,
    [counter, initialState]
  );

  return (
    <div className={styles.quote}>
      <div className={styles.text}>"{quote.value}"</div>

      <AddCount
        charlieCount={counter}
        onClick={() => {
          console.log(counter);

          setCounter((prevState) => {
            return (prevState += 1);
          });
        }}
      />
    </div>
  );
};
