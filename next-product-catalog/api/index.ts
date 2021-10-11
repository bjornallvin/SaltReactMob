import { IProduct } from "../types";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const data = await fetch(process.env.NEXT_PUBLIC_BASE_API + "products");
  const products = await data.json();
  return products;
};

export const getAllCategories = async (): Promise<string[]> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_BASE_API + "products/categories"
  );
  const categories = await data.json();
  return categories;
};

export const deleteProduct = async (id: number) => {
  fetch(process.env.NEXT_PUBLIC_BASE_API + "products/" + id, {
    method: "DELETE",
  });
};

export const addProduct = async (product: IProduct) => {
  //TODO;
};
