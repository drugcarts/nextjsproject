"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyOrderService } from "@/services/orderService";
import Link from "next/link";

const MyRefills = () => {
  const { myOrders } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(GetMyOrderService(activeTab, startDate, endDate));
  }, [activeTab, startDate, endDate]);

  console.log(myOrders, "myOrders");
  return (
    <div className="p-2">
      <div className="mt-4 border p-6 rounded text-gray-600">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((order, i) =>
                order?.orderItems?.map((item, j) => (
                  <tr key={`${i}-${j}`} className="border hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <Link href={`/product/${item?.url}`}>
                        {item?.product_name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyRefills;
