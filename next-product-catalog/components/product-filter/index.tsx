import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../api";
import styles from "./filter.module.css";

export const ProductFilter = ({
  filter,
  onChange,
}: {
  filter: string;
  onChange: (category: string) => void;
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getAllCategories().then((cats) => setCategories(cats));
  }, []);

  return (
    <div className={styles.filter}>
      <div className={styles.wrapper}>
        <select
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option value="">All products</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
