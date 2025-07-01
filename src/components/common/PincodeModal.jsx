'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostalCodeListService, GetPostalCodeService } from "@/services/locationService"

function PincodeModal({ onClose }) {
    const { postalCodes, postalCode } = useSelector((state) => state.locationData)
    const [query, setQuery] = useState('');
    const dispatch = useDispatch()

    const handleInput = (e) => {
        const value = e.target.value;
        setQuery(value);
        dispatch(GetPostalCodeListService(value))
    };

    const checkBtn = async () => {
        await dispatch(GetPostalCodeService(query, onClose))
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-md w-[400px] shadow-lg h-[400px]">
                <div className="bg-[#bf0d47] text-white px-6 py-4 rounded-t-md flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Enter your Pincode</h2>
                    <button onClick={onClose} className="text-white text-lg font-bold">&times;</button>
                </div>

                <div className="p-6">
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInput}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-teal-500"
                            placeholder="Search your pincode"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={checkBtn}>Check</button>
                    </div>

                    <div className="border rounded overflow-y-auto max-h-64">
                        {postalCodes?.PostOffice?.map((place, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setQuery(place?.Pincode)
                                    dispatch(GetPostalCodeListService(''))
                                }}>
                                {place?.Name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PincodeModal;