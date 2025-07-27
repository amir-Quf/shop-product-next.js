import { IProductData } from "@/app/store/page";
import Container from "@/components/Container";
import { IBasketData } from "@/zustand/userBasket/userBasket";
import React from "react";
import Orders from "../components/Orders";

export interface IOrders {
  id: string;
  basket: IBasketData[];
  user: string;
  status: "being reviewed" | "sending" | "rejected" | "delivered";
}

export interface IProductInOrder extends IProductData {
  qty: number;
  orderId: string;
}

const OrdersList = async () => {
  const res = await fetch("http://localhost:4000/orders");
  const data = (await res.json()) as IOrders[];
  const getProducts = await fetch("http://localhost:4000/products");
    const allProducts: IProductData[] = (await getProducts.json()) as IProductData[];
  return (
    <section>
      <Container>
        <Orders data={data} allProducts={allProducts}/>
      </Container>
    </section>
  );
};

export default OrdersList;
