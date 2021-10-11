import React from "react";
import { IProduct } from "../../types";
import styles from "./detail.module.css";

export const ProductDetails = ({ product }: { product: IProduct }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);
  return (
    <div className={styles.product}>
      <div className={styles.leftColumn}>
        <img src={product.image} width="100%" alt={product.title} />
      </div>
      <div className={styles.rightColumn}>
        <h1>{product.title}</h1>
        <div className={styles.productPricing}>{formattedPrice}</div>
        <span className={styles.productCategory}>{product.category}</span>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
