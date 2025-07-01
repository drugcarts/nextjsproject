'use client';
import { useEffect, useState } from 'react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyOrderService } from '@/services/orderService'
import { DateFormat } from '@/utils/dateFormat'
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { IMAGES } from '../common/images';

const MyOrders = () => {
    const { myOrders } = useSelector((state) => state.orderData)
    const dispatch = useDispatch()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [orders] = useState([
        { id: "001", name: "John Doe", status: "Ongoing", date: "2024-02-25", amount: "$120" },
        { id: "002", name: "Jane Smith", status: "Completed", date: "2024-02-24", amount: "$200" },
        { id: "003", name: "Michael Brown", status: "Ongoing", date: "2024-02-23", amount: "$150" },
    ]);

    const orderStatusData = [
        {
            id: 1,
            name: "All Orders",
            status: ""
        },
        {
            id: 2,
            name: "Processing",
            status: "Processing"
        },
        {
            id: 3,
            name: "Completed",
            status: "Completed"
        },
        {
            id: 4,
            name: "Cancelled",
            status: "Cancelled"
        },
    ]

    useEffect(() => {
        dispatch(GetMyOrderService(activeTab, startDate, endDate))
    }, [activeTab, startDate, endDate])

    return (
        <div className="p-2">
            {/* Buttons */}
            <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab("")}>All Order</button>
                {/* <button className="bg-gray-400 text-white px-4 py-2 rounded">Import Order</button> */}
            </div>

            {/* Tabs */}
            <div className="flex justify-between gap-4 mt-2">
                {/* Filters */}
                <div className="flex gap-4 mt-2">
                    {orderStatusData.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 ${activeTab === tab?.status
                                ? "border-b-2 border-green-600 text-green-600"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab?.status)}
                        >
                            <Brightness5Icon />   {tab?.name}
                        </button>
                    ))}
                </div>
                {/* Date Filters */}
                <div className="flex gap-2 mt-4">
                    <input type="date" className="border px-2 py-1 rounded text-gray-500" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="border px-2 py-1 rounded text-gray-500" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>

            {/* Order List */}
            <div className="mt-4 border p-6 rounded text-gray-600">
                {/* Order for <strong>{activeTab}</strong> */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        {/* Table Head */}
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="px-4 py-2 border">Order ID</th>
                                <th className="px-4 py-2 border">Image</th>
                                <th className="px-4 py-2 border">Customer</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Details</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {myOrders.map((order, i) => (
                                <tr key={i} className="border">
                                    <td className="px-4 py-2 border"><strong>#</strong> {order?.orderId}</td>
                                    <td className="px-5 border">
                                        <AvatarGroup max={2}>
                                            {order?.orderItems?.map((item, index) => <Avatar key={index} alt={item?.product_name} src={
                                                item?.product_img
                                                    ? `https://assets2.drugcarts.com/${item?.product_img}`
                                                    : IMAGES.NO_IMAGE
                                            } />)}

                                        </AvatarGroup>
                                    </td>
                                    <td className="px-4 py-2 border">{order.shippingInfo?.cus_name}</td>
                                    <td
                                        className={`px-4 py-2 border font-medium ${order.status === "Completed" ? "text-green-600" : "text-orange-500"
                                            }`}
                                    >
                                        {order?.trackingInfo?.orderStatus}
                                    </td>
                                    <td className="px-4 py-2 border">{DateFormat(order?.createdAt)}</td>
                                    <td className="px-4 py-2 border">{order?.totalPrice}</td>
                                    <td className="px-4 py-2 border"><p className="text-blue-600 cursor-pointer" onClick={() => router.push(`/myorder/${order?.orderId}`)}>View</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default MyOrders;