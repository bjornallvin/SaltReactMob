import React, { useContext, useState } from "react";
import { ProductsContext } from "../../pages/_app";
import { IProduct } from "../../types";
import { ProductFilter } from "../product-filter";
import { ProductListItem } from "../product-list-item";

export const ProductList = ({ products }: { products: IProduct[] }) => {
  const [filter, setFilter] = useState<string>("");

  let prods: IProduct[];

  if (!products) {
    prods = useContext(ProductsContext);
  } else {
    prods = [...products];
  }

  const productFilter = (prod: IProduct) => {
    if (!filter) return true;
    return prod.category === filter;
  };

  return (
    <>
      <ProductFilter
        filter={filter}
        onChange={(category) => {
          setFilter(category);
        }}
      />
      {prods
        .filter((prod) => productFilter(prod))
        .map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
    </>
  );
};
