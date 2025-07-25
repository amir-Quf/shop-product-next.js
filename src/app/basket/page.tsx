"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { IProductData } from "../store/page";
import useUserBasket from "@/zustand/userBasket/userBasket";
import axios from "axios";

const Basket = () => {
  const {
    basket,
    addToBasket,
    clearBasket,
    getQty,
    minusCountProduct,
    removeFromBasket,
  } = useUserBasket();
  const [allProducts, setAllProducts] = useState<IProductData[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => setAllProducts(res.data));
  }, [basket]);
  const productFiltered: IProductData[] =
    basket.flatMap((item) => {
      return allProducts.filter((product) => {
        return product.id === item.id;
      });
    }) || [];
  return (
    <Container>
      <section>
        {productFiltered.map((product) => {
          return (
            <div key={product.id} className="grid grid-cols-12 shadow-lg p-4">
              <div className="col-span-3">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="col-span-9 p-5 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-2xl">{product.title}</h2>
                  <p className="text-gray-600 py-4">{product.desc}</p>
                  <p className="font-bold mb-3">
                    price : <span>$ {product.price}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                <div>
                  <button
                    onClick={() => addToBasket(product.id, 1)}
                    className="bg-cyan-500 px-3 rounded font-bold text-2xl"
                  >
                    {" "}
                    +{" "}
                  </button>
                  <span className="mx-2 font-bold text-lg">
                    {" "}
                    {getQty(product.id)}{" "}
                  </span>
                  <button
                    onClick={() => minusCountProduct(product.id)}
                    className="bg-red-500 px-3 rounded font-bold text-2xl"
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-500 p-2 rounded "
                    onClick={() => removeFromBasket(product.id)}
                    >
                    remove from cart
                  </button>
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </Container>
  );
};

export default Basket;
