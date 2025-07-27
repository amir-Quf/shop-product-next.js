import React from 'react'
import Container from "@/components/Container";
import CartProducts from "./components/cartProducts";
import OrdersUser from './components/ordersUser';
const Basket = () => {
  
  return (
    <Container>
      <OrdersUser/>
      <CartProducts/>
    </Container>
  );
};

export default Basket;
