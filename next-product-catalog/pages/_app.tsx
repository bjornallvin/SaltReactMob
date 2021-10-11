import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as data from "../data/data.json";
import { IProduct } from "../types";
import { getAllProducts } from "../api";

export const ProductsContext = React.createContext<IProduct[]>([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getAllProducts().then((prods) => setProducts(prods));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      <Component {...pageProps} />
    </ProductsContext.Provider>
  );
}
export default MyApp;
