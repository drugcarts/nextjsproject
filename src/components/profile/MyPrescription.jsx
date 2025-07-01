import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPrescriptionIdService, GetPrescriptionService, DeletePrescriptionService, PostPrescriptionService } from '@/services/prescriptionService'
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteModal from '../admin/modal/DeleteModal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

function MyPrescription() {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const { prescriptionList, prescription } = useSelector((state) => state.prescriptionData)
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", "prescriptions");

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                setSelectedFile(null);
                await dispatch(PostPrescriptionService({ rximage: response.data.url }))
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading file");
        }
    };

    useEffect(() => {
        dispatch(GetPrescriptionService())
    }, [])
    console.log(selectedFile);

    return (
        <div>
            <div className="p-2 max-w-xs mb-4">
                <h2 className="text-xl font-bold mb-4">Upload Prescription</h2>
                <form onSubmit={handleSubmit}>

                    {/* <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" /> */}
                    <p className='text-sm'>{selectedFile?.name}</p>
                    {selectedFile ? <button
                        type="submit"
                        className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Upload
                    </button> : <label className="bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600">
                        {"Choose"}
                        <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileChange} />
                    </label>}

                </form>

                {/* {uploadedUrl && (
                    <div className="mt-4">
                        <p className="text-green-600">File uploaded successfully!</p>
                        <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            View Uploaded Document
                        </a>
                    </div>
                )} */}
            </div>
            <div className=" grid grid-cols-2 md:grid-cols-5 gap-5 relative w-full h-64 mb-4">
                {prescriptionList && prescriptionList?.map((item, i) => (
                    <div className="flex flex-col items-center relative" key={i}>
                        <Image
                            onClick={() => {
                                dispatch(GetPrescriptionIdService(item?._id));
                            }}
                            key={i}
                            src={IMAGES.PRESCRIPTIONICON}
                            alt="Uploaded Image"
                            className={`rounded-md w-24 h-24 border-2 cursor-pointer ${item?._id === prescription?._id ? 'border-[#B7084B]' : ''
                                } mb-1`}
                            width={200}
                            height={200}
                        />
                        <p className="text-xs text-center my-2">{item?.rximage?.split('/')?.pop()}</p>
                        <div className="flex items-center space-x-2">
                            <FileDownloadOutlinedIcon
                                className="cursor-pointer text-blue-500"
                                color="action"
                                onClick={() => window.open(item?.rximage, '_blank')}
                            />
                            <HighlightOffIcon
                                className="cursor-pointer text-red-500"
                                color="action"
                                onClick={() => setSelectedAddressId(item._id)}
                            />
                        </div>

                        <DeleteModal
                            open={selectedAddressId === item?._id}
                            setOpen={() => setSelectedAddressId(null)}
                            title="Delete Prescription"
                            description={`${item?.rximage?.split('/')?.pop()} ?`}
                            onSubmit={async () => {
                                await dispatch(DeletePrescriptionService(item?._id));
                                setSelectedAddressId(null);
                            }}
                        />
                    </div>
                ))}
            </div>
            {prescriptionList?.length === 0 && <p className="text-gray-500">No Prescription uploaded</p>}
        </div>
    )
}

export default MyPrescription