import React, { useState, createContext } from "react";
import { getAllProducts } from "../../api";
import { ProductList } from "../../components/";
import styles from "../../styles/Home.module.css";
import { IProduct } from "../../types";

const ProductListPage = ({ products }: { products: IProduct[] }) => {
  const [filter, setFilter] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <ProductList products={products} />
    </div>
  );
};

export default ProductListPage;

// export async function getStaticPaths() {}

export async function getStaticProps() {
  const products = await getAllProducts();

  return { props: { products } };
}
