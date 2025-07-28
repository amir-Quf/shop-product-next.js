"use client";
import React, { useEffect, useState } from "react";
import { IProductData } from "../../store/page";
import useUserBasket from "@/zustand/userBasket/userBasket";
import axios from "axios";
import Swal from "sweetalert2";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import OrdersUser from "./ordersUser";
>>>>>>> ae9b2a6 (initial commit)
=======
>>>>>>> c932dd375003eae1c0be7ab1420fb2b4cef6aa94

const CartProducts = () => {
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0);
    const {
    basket,
    addToBasket,
    clearBasket,
    getQty,
    minusCountProduct,
    removeFromBasket,
    finalPrice,
    totalDiscount
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
    useEffect(() => {
    const fetchFinalPrice = async () => {
      const total = await finalPrice();
      setPrice(Number((total).toFixed(2)));
    };
    fetchFinalPrice();
  }, [finalPrice, basket]);

useEffect(() => {
  const fetchDiscount = async () => {
    const value = await totalDiscount();
    setDiscount(Number((value).toFixed(2)))
  };
  fetchDiscount();
}, [totalDiscount, basket]);

const orderHandler = async () => {
  const {data} = await axios.get('http://localhost:4000/orders')
  axios.post('http://localhost:4000/orders',{id: String(data.length + 1),status: "being reviewed",basket,})
  .then(() => {
    Swal.fire({
      title: 'the order was successfully placed',
      icon: 'success'
    })
    clearBasket()
  })
  .catch((err) => {
    Swal.fire({
      title: `Ordering an error : ${err}`,
      icon: 'error'
    })
  })
}

  return (
    <section>
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <OrdersUser allProducts={allProducts}/>
>>>>>>> ae9b2a6 (initial commit)
=======
>>>>>>> c932dd375003eae1c0be7ab1420fb2b4cef6aa94
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
                  <p className="font-bold mb-3 ">
                    price : <span className={product.discount ? `line-through opacity-70` : ''}>$ {(product.price).toLocaleString()}</span>
                    {product.discount ? <span className="ml-1 text-xl"> ${(Number((product.price - ((product.price * product.discount) / 100)).toFixed(1))).toLocaleString()}</span> : ''}
                  </p>
                    {product.discount ? <p className="mt-3 font-bold">discount : %{product.discount}</p> : ''}
                </div>
                <div className="flex items-center justify-between">
                <div>
                  <button
                    onClick={() => {addToBasket(product.id, 1)}}
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
                    className="bg-red-500 p-2 rounded hover:bg-red-600"
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
        <div className="px-4 py-10 shadow-xl mb-6">
            <div>
                <p className="py-3">Final price : ${(price).toLocaleString()}</p>
                <p className="py-3">Your profit from the purchase : ${(discount).toLocaleString()}</p>
                <p className="py-3">The final price : ${(price - discount).toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between pt-6">
                <button onClick={orderHandler} className="hover:bg-green-600 bg-green-500 py-1 px-2 rounded shadow shadow-emerald-900">Place an order</button>
                <button onClick={() => clearBasket()} className="hover:bg-red-600 bg-red-500 py-1 px-2 rounded shadow shadow-red-900" >Delete Cart</button>
            </div>
        </div>
      </section>
  )
}

export default CartProducts
