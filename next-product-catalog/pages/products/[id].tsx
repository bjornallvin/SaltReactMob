import React, { useContext } from "react";
import { ProductDetails } from "../../components";
import { useRouter } from "next/router";
import * as data from "../../data/data.json";
import { ProductsContext } from "../_app";
import { IProduct } from "../../types";
import { getAllProducts, getProduct } from "../../api";
import { removeUndefinedKeys } from "../../utils/removeUndefinedKeys";

const ProductDetailPage = ({ product: propProduct }: { product: IProduct }) => {
  let product;
  if (!propProduct) {
    const products: IProduct[] = useContext(ProductsContext);
    const router = useRouter();
    const { id } = router.query;
    product = id
      ? products.find((product) => product.id === parseInt(id as string, 10))
      : null;
  }

  if (!product && !propProduct) {
    return <div>Product Not Found</div>;
  }

  return <ProductDetails product={propProduct || product} />;
};

export default ProductDetailPage;

export async function getStaticPaths() {
  const products = await getAllProducts();
  const prods = products.map((product) => ({
    params: {
      id: product.id.toString(),
    },
  }));

  return { paths: prods, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { id: string; product: IProduct };
}) {
  const { id } = params;
  const product = await getProduct(id);
  return { props: { product } };
}
