import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../../types";
import styles from "./product.module.css";
import { deleteProduct } from "../../api";

export const ProductListItem = ({ product }: { product: IProduct }) => {
  const { id, title, price, image, category } = product;
  const [shown, setShown] = useState(true);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  if (!shown) return null;
  return (
    <div className={styles.product}>
      <Link href={`/products/${id}`}>
        <a>
          <div className={styles.image}>
            <img src={image} alt={title} width={100} height={100} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.category}>{category}</div>
            <div className={styles.price}>{formattedPrice}</div>
          </div>
        </a>
      </Link>
      <div
        className={styles.deleteButton}
        onClick={() => {
          deleteProduct(product.id);
          setShown(false);
        }}
      >
        X
      </div>
    </div>
  );
};
