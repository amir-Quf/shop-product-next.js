'use client'
import { useState } from "react";
import { IOrders } from "../orders/page";
import OrderDetails from "./OrderDetails";
import { IProductData } from "@/app/store/page";

const Orders = ({ data, allProducts }: { data: IOrders[], allProducts: IProductData[] }) => {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all'
    ? data
    : data.filter(order => order.status === filter);

  return (
    <>
      <div className="flex justify-between items-center py-8">
        <h2 className="font-bold text-2xl">Orders:</h2>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-xl">Filter:</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-200 p-2 rounded"
          >
            <option value="all">All</option>
            <option value="being reviewed">Being reviewed</option>
            <option value="sending">Sending</option>
            <option value="rejected">Rejected</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderDetails
            key={order.id}
            allProducts={allProducts}
            order={order}
            data={data}
          />
        ))
      ) : (
        <p className="text-center mt-10 font-bold text-red-500">
          There are no orders with a status of <strong>{filter}</strong>.
        </p>
      )}
    </>
  );
};

export default Orders;
