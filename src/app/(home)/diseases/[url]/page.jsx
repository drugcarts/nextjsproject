"use client";
import Image from 'next/image'
import { IMAGES } from "@/components/common/images";
import { useEffect } from 'react';
import { GetDiseasesUrlService } from '@/services/diseasesService';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";

const Diseases = () => {
    const { diseasesUrl } = useSelector((state) => state.diseasesData);
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetDiseasesUrlService(params?.url))
    }, [params?.url])

    return (
        <section className="max-w-7xl mt-3 mx-auto">
            {/* <Image src={IMAGES.DISEASESBANNER} alt="Herbs Details" className="w-full h-64 object-cover mx-auto" /> */}
            <h1 className='my-4 font-bold p-3'>{diseasesUrl?.name}</h1>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>{diseasesUrl?.name} overview and Definition</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.about ?
                            diseasesUrl?.about : "<p>No overview available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Classification of {diseasesUrl?.name}</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.classfi ?
                            diseasesUrl?.classfi : "<p>No classification available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Epidemiology</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.epidemiology ?
                            diseasesUrl?.epidemiology : "<p>No epidemiology available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Causative factor</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.causativefa ?
                            diseasesUrl?.causativefa : "<p>No causative factor available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Risk Factor</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.riskfc ?
                            diseasesUrl?.riskfc : "<p>No risk factor available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Pathophysiology</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.pathophysiology ?
                            diseasesUrl?.pathophysiology : "<p>No pathophysiology available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Routes of Transmission</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.routes ?
                            diseasesUrl?.routes : "<p>No routes available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Clinical signs & symptoms</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.symptoms ?
                            diseasesUrl?.symptoms : "<p>No symptoms available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Lab Test</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.labtest ?
                            diseasesUrl?.labtest : "<p>No labtest available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Radiology</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.radiology ?
                            diseasesUrl?.radiology : "<p>No radiology available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Differential Diagnosis</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.diagnostic ?
                            diseasesUrl?.diagnostic : "<p>No diagnostic available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Medical</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.medical ?
                            diseasesUrl?.medical : "<p>No medical available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Surgical</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.surgical ?
                            diseasesUrl?.surgical : "<p>No surgical available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Prognosis</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.prognosis ?
                            diseasesUrl?.prognosis : "<p>No prognosis available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Complications</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.comp ?
                            diseasesUrl?.comp : "<p>No complications available</p>"
                    }}
                />
            </div>
            <div className='bg-white py-4 p-3'>
                <h2 className='font-bold my-4 uppercase'>Prevention</h2>
                <div
                    className="rich-content-card"
                    dangerouslySetInnerHTML={{
                        __html: diseasesUrl?.prevention ?
                            diseasesUrl?.prevention : "<p>No prevention available</p>"
                    }}
                />
            </div>
        </section>
    )
}

export default Diseases;
