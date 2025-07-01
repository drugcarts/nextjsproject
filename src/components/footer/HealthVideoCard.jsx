"use client";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { IMAGES } from "@/components/common/images";
import { GetHealthVideosService } from '@/services/healthVideoService';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

const HealthVideoCard = () => {
    const { healthVideoList } = useSelector((state) => state.healthVideoData);
    const router = useRouter();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [articleImages, setArticleImages] = useState({});
    const [articlePContent, setArticlePContent] = useState({});

    useEffect(() => {
        dispatch(GetHealthVideosService(page, 20));
    }, [page]);

    useEffect(() => {
        if (healthVideoList?.health_videos?.length > 0) {
            const extractedImages = {};
            const extractedPContent = {};

            healthVideoList.health_videos.forEach((item, index) => {
                if (item.description) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(item.description, "text/html");

                    const imgTags = doc.querySelectorAll("img");
                    const imgSources = Array.from(imgTags).map((img) => img.src);
                    extractedImages[index] = imgSources.length > 0 ? imgSources[0] : null;

                    const pElements = doc.querySelectorAll("ul");
                    extractedPContent[index] = Array.from(pElements)
                        .map((p) => p.outerHTML)
                        .join("");
                }
            });

            setArticleImages(extractedImages);
            setArticlePContent(extractedPContent);
        }
    }, [healthVideoList]);

    const healthVideoClick = (url) => {
        router.push(`/health-video-detail/${url}`);
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {healthVideoList?.health_videos?.map((item, i) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer" key={i} onClick={() => healthVideoClick(item?.url)}>
                        <div className="relative">
                            {articleImages[i] ? (
                                <img src={articleImages[i]} alt="Video Thumbnail" className="w-full h-48 object-cover" />
                            ) : (
                                <img src={"/assets/no_image.png"} alt="No Image" className="w-full h-48 object-cover" />
                            )}

                            <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-50 text-white text-xl font-bold px-4 py-2">
                                {item?.title}
                            </div>
                        </div>
                        <div className="p-5">
                            <h2 className="text-lg font-semibold text-gray-800">{item?.title}</h2>
                            <p className="text-sm text-gray-500">Video - {item?.title}</p>

                            <div dangerouslySetInnerHTML={{
                                __html: articlePContent[i]?.length > 100
                                    ? articlePContent[i].slice(0, 100) + "..."
                                    : articlePContent[i] || "<p>No description available</p>"
                            }} />

                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500 text-lg">★★★★☆</span>
                                <span className="ml-2 text-gray-600 text-sm">4.0 (1,245 reviews)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Box sx={{ my: 2, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontFamily={"Poppins"}>Showing {page}-{10} of {healthVideoList?.pagination?.totalItems} entries</Typography>
                <Pagination
                    size="large"
                    count={healthVideoList?.pagination?.totalPages}
                    page={page}
                    color="secondary"
                    onChange={(_, value) => setPage(value)}
                />
            </Box>
        </section>
    );
};

export default HealthVideoCard;
