"use client";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { IMAGES } from "@/components/common/images";
import { useSelector, useDispatch } from 'react-redux';
import { GetArticleService } from '@/services/articleService';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

const HealtharticleCard = () => {
    const { articleList } = useSelector((state) => state.articlesData)
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const router = useRouter();
    const articleClick = (url) => {
        router.push(`/health-article-details/${url}`)
    }

    useEffect(() => {
        dispatch(GetArticleService(page, 8))
    }, [page])

    console.log('articleList', articleList);

    return (
        <section className="max-w-7xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {articleList?.articles?.map((article, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        onClick={() => articleClick(article?.url)}>
                        <Image src={`https://assets2.drugcarts.com/admincolor/homepage/slider/${article?.blogimg}`} width={300} height={100} alt="Weight Loss Tips" className="w-full h-60" />
                        <div className="p-5">
                            <h2 className="text-sm md:text-md font-semibold">{article?.blogname} </h2>
                        </div>
                    </div>
                ))}
            </div>
            <Box sx={{ my: 2, display: "flex", justifyContent: 'space-between', alignItems: 'center', }}>
                <Typography fontFamily={"Poppins"}>Showing {page}-{10} of {articleList?.pagination?.totalItems} entries</Typography>
                <br />
                <Pagination
                    size="large"
                    count={articleList?.pagination?.totalPages}
                    page={page}
                    color="secondary"
                    onChange={(_, value) => setPage(value)}
                />
            </Box>
        </section>
    )
}

export default HealtharticleCard;