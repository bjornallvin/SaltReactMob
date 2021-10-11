import React, { useState, createContext } from "react";
import { ProductList } from "../../components/";
import styles from "../../styles/Home.module.css";

const ProductListPage = () => {
  const [filter, setFilter] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <ProductList />
    </div>
  );
};

export default ProductListPage;
