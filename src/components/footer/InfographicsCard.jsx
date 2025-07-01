"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { IMAGES } from "@/components/common/images";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { GetInfoGraphicsService } from '@/services/infoGraphicsService';
import { Box, Pagination, Typography } from "@mui/material";
import { DateMonthFormat } from "@/utils/dateFormat";

const InfographicsCard = () => {
    const { infoGraphicsList } = useSelector((state) => state.infoGraphicssData)
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(GetInfoGraphicsService(page, 8))
    }, [page])

    const infographicClick = (url) => {
        router.push(`/infographics-view/${url}`)
    }
    return (
        <section className="max-w-7xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {infoGraphicsList?.infoGraphics_list?.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        onClick={() => infographicClick(item?.url)}>
                        <div className="relative">
                            <Image
                                src={item?.thuming ? `https://assets2.drugcarts.com/admincolor/homepage/infogra/${item?.thuming}` : IMAGES.NO_IMAGE}
                                alt={item?.thumbalt}
                                width={200}
                                height={86}
                                className="w-full h-86 object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-50 text-white text-xl font-bold px-4 py-2">
                                {item?.title}
                            </div>
                        </div>
                        <div className="p-5">
                            <h2 className="text-lg font-semibold text-gray-800">{item?.title}</h2>
                            <p className="text-sm text-gray-500">Posted Date : {DateMonthFormat(item?.updated_at)}</p>
                            {/* <p className="text-gray-600 mt-3 text-sm">
                               {item?.metadesc}
                            </p> */}
                        </div>
                    </div>
                ))}
            </div>
            <Box sx={{ my: 2, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontFamily={"Poppins"}>Showing {page}-{10} of {infoGraphicsList?.pagination?.totalItems} entries</Typography>
                <Pagination
                    size="large"
                    count={infoGraphicsList?.pagination?.totalPages}
                    page={page}
                    color="secondary"
                    onChange={(_, value) => setPage(value)}
                />
            </Box>
        </section>
    )
}

export default InfographicsCard;