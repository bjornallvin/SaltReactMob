import React from "react";
import styles from "../styles/button.module.css";

export const AddCount = ({
  charlieCount,
  onClick,
}: {
  charlieCount: number;
  onClick: () => void;
}) => {
  return (
    <button
      className={charlieCount === 0 ? styles.buttonNull : styles.button}
      onClick={onClick}
    >
      {charlieCount || "0"}
    </button>
  );
};
