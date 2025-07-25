"use client";
import useUserBasket from "@/zustand/userBasket/userBasket";
import React from "react";

const CountOperators = ({ IdProduct }: { IdProduct: string }) => {
  const { basket, addToBasket, minusCountProduct, removeFromBasket, getQty } =
    useUserBasket();
  const hasToBasket = basket.find((item) => {
    return item.id === IdProduct;
  });
  return (
    <div>
      {!hasToBasket ? (
        <button
          onClick={() => addToBasket(IdProduct, 1)}
          className="bg-emerald-500 p-3 rounded shadow shadow-green-700 m-auto"
        >
          Add to cart
        </button>
      ) : (
        <div
          className="flex items-center justify-between"
        >
          <div>
            <button
              onClick={() => addToBasket(IdProduct, 1)}
              className="bg-cyan-500 px-3 rounded font-bold text-2xl"
            >
              {" "}
              +{" "}
            </button>
            <span className="mx-2 font-bold text-lg">
              {" "}
              {getQty(IdProduct)}{" "}
            </span>
            <button
              onClick={() => minusCountProduct(IdProduct)}
              className="bg-red-500 px-3 rounded font-bold text-2xl"
            >
              {" "}
              -{" "}
            </button>
          </div>
          <div>
            <button className="bg-red-500 p-2 rounded " onClick={() => removeFromBasket(IdProduct)}>
              remove from cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountOperators;
