import React, { useContext } from "react";
import { ProductDetails } from "../../components";
import { useRouter } from "next/router";
import * as data from "../../data/data.json";
import { ProductsContext } from "../_app";
import { IProduct } from "../../types";

const ProductDetailPage = () => {
  const products: IProduct[] = useContext(ProductsContext);
  const router = useRouter();
  const { id } = router.query;
  const product = id
    ? products.find((product) => product.id === parseInt(id as string, 10))
    : null;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
