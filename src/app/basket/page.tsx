import React from "react";
import { IProductData } from "../store/page";
import { log } from "console";
import Container from "@/components/Container";

interface IUserData {
  id: string;
  username: string;
  password: string;
  basket: IBasketUser[];
}

interface IBasketUser {
    id : string,
    qty: number
}

const Basket = async () => {
  const res = await fetch(`http://localhost:4000/users/${1}`);
  const data: IUserData = await res.json();
  const responseProduct = await fetch("http://localhost:4000/products");
  const dataProduct: IProductData[] = await responseProduct.json();

  const productsUser = data.basket.flatMap((productInBasket: IBasketUser) => {
    return dataProduct.filter((item: IProductData) => productInBasket.id === item.id)
  });
  return (
    <Container >
      {productsUser.map((product: IProductData) => {
        return (
          <div className="grid grid-cols-12 my-10 shadow-lg rounded overflow-hidden" key={product.id}>
            <div className="col-span-3">
              <img className="max-h-80" src={product.image} alt={product.title} />
            </div>
            <div className="col-span-9 p-5 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-2xl">{product.title}</h2>
                <p className="font-bold py-4">Number of product : 1</p>
                <p className="font-bold mb-3">
                  price : <span>$ {product.price}</span>
                </p>
              </div>
              <div>
                <button className="bg-cyan-500 px-3 rounded font-bold text-2xl">
                  {" "}
                  +{" "}
                </button>
                <span className="mx-2 font-bold text-lg"> {data.basket.map((productData : IBasketUser) => {
                    return(
                        productData.id === product.id ? productData.qty : ''
                    )
                })} </span>
                <button className="bg-red-500 px-3 rounded font-bold text-2xl">
                  {" "}
                  -{" "}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Basket;
