'use client';
import { useEffect, useState } from 'react';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyOrderService } from '@/services/orderService'
import { DateFormat } from '@/utils/dateFormat'
import { GetMyDoctorAppointmentService } from '@/services/doctorService';


const MyAppointment = () => {
    const { myAppointments } = useSelector((state) => state.doctorData)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("");
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        dispatch(GetMyDoctorAppointmentService(startDate, endDate))
    }, [startDate, endDate])

    return (
        <div className="p-2">
            {/* Buttons */}
            <div className="flex gap-2">
                {/* <button className="bg-gray-400 text-white px-4 py-2 rounded">Import Order</button> */}
            </div>

            {/* Tabs */}
            <div className="flex justify-between gap-4 mt-2">
                {/* Filters */}
                <div className="flex gap-4 mt-2">
                <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
                </div>
                {/* Date Filters */}
                <div className="flex gap-2 mt-4">
                    <input type="date" className="border px-2 py-1 rounded text-gray-500" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="border px-2 py-1 rounded text-gray-500" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => dispatch(GetMyDoctorAppointmentService())}>All Appointments</button>
            {/* Order List */}
            <div className="mt-4 border p-6 rounded text-gray-600">
                {/* Order for <strong>{activeTab}</strong> */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        {/* Table Head */}
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="px-4 py-2 border">Appointment ID</th>
                                <th className="px-4 py-2 border">Doctor Name</th>
                                <th className="px-4 py-2 border">Customer Name</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Time</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {myAppointments && myAppointments?.map((item, i) => (
                                <tr key={i} className="border">
                                    <td className="px-4 py-2 border"><strong>#</strong> {item?.appoinment_id}</td>
                                    <td className="px-4 py-2 border">{item?.doctor_name}</td>
                                    <td className="px-4 py-2 border text-center">
                                        {item?.name}
                                    </td>
                                    <td className="px-4 py-2 border">{DateFormat(item?.date)}</td>
                                    <td className="px-4 py-2 border">{item?.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default MyAppointment;