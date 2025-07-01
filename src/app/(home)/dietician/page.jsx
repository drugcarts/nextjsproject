"use client";
import { useEffect } from "react";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { GetServiceUrlService } from '@/services/drugService';
import { PostServiceQuiryService } from '@/services/serviceenquiryService';
import { useFormik } from "formik";

const Dietician = () => {
    const { serviceUrl } = useSelector((state) => state.serviceData);
    const dispatch = useDispatch()
    const pathname = usePathname();

    let pathSegments = pathname.split("/").filter(Boolean);
    pathSegments = pathSegments.map((segment) => segment.replace(/-/g, " "));

    const urlText = pathSegments[0].split(" ").join("-")

    useEffect(() => {
        if (pathSegments.length > 0) {
            dispatch(GetServiceUrlService(urlText));
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            service: serviceUrl?.title || "",
            name: "",
            email: "",
            mobile: "",
            city: "",
        },
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PostServiceQuiryService(data, resetForm))
        },
    });
    return (
        <section className="max-w-7xl mt-3 mx-auto">
            <div className="flex flex-wrap h-62 justify-center items-center mx-auto">
                <div className="w-full md:w-[58%] m-2 rounded-md">
                    <Image priority src={IMAGES.DIETICIANBANNER} alt="YOGA BANNER" className="w-[100%] md:h-[300px] rounded-lg" />
                </div>
                <form onSubmit={formik.handleSubmit} className="w-full md:w-[40%] md:h-[300px] p-2 text-center bg-[#d4f758] rounded-md">
                    <h2 className="font-bold text-[16px] uppercase">Dietician</h2>
                    <p className="text-sm mb-6">Dietician</p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
                        <label className="w-[30%] block md:mb-2 ">Name</label>
                        <input
                            type="text" name="name"
                            className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formik.values.name}
                            onChange={formik.handleChange("name")}
                            required
                        />
                        <label className="w-[30%] block md:mt-4 md:mb-2">Mobile</label>
                        <input
                            type="number" name="mobile"
                            className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formik.values.mobile}
                            onChange={formik.handleChange("mobile")}
                            required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
                        <label className="w-[30%] block md:mt-4 md:mb-2">E-Mail</label>
                        <input
                            type="email" name="email"
                            className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            required
                        />
                        <label className="w-[30%] block  md:mt-4 md:mb-2">City</label>
                        <input
                            type="text" name="city"
                            className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formik.values.city}
                            onChange={formik.handleChange("city")}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-[50%] mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Book Now
                    </button>
                </form>
            </div>
            <div className="flex">
                <div className="w-full md:w-[68%] p-2">
                    <div className="shadow-md rounded-lg p-6">
                        <h1 className="text-md md:text-xl font-bold">Dietitian</h1>
                        <p className="my-2"> Nutrition plays a important role in many major health issues such as high blood pressure, high cholesterol and heart disease, diabetes, as well as food allergies and intolerance. Dietician specialist will identify the problem and treating the disease-related malnutrition and conducting medical nutrition therapy. The word diet means the act of avoiding oneself to small amount of food or particular of food either for some medical reason or to lose weight</p>
                        <p className="my-2"> Drugcarts Registered Dietitians provide a separate nutrition assessments and work with healthcare professional they provide development of a treatment plan, including diet programs, meal ideas and suggestion on nutritional supplements and nutrition counseling.</p>
                        <p className="my-2"> Our highly qualified dietitians will know about your current nutritional habits, develop personalized plan to enjoy a healthier lifestyle. While some healthcare professional wish to take a more nutritious diet and manage a particular health condition. Their need to provide long-term benefits, the focus is on achievable goals.</p>
                        <p className="my-2"> The Drugcarts have trained professionals that help you successfully meet your goals!</p>
                        <Image priority src={IMAGES.DIET1} alt="Dietitian" className="w-full mx-auto" />
                    </div>
                    <div className="shadow-md rounded-lg p-6 mt-5">
                        <h1 className="text-md md:text-xl font-bold">The roles of Dietitians</h1>
                        <p className="my-2">A dietitian has numerous roles that show your interests on food and nutrition, there is a career in dietetics that is right for you. A role of dialectician will enable your strengths and skills everyday and educate about the importance of healthy eating and good nutrition.</p>
                        <Image priority src={IMAGES.DIET2} alt="Dietitian" className="w-full mx-auto" />
                    </div>
                </div>
                <div className="w-full md:w-[30%] p-2 border-[1.5px]">
                    <h3 className="text-[16px] font-bold text-center uppercase pb-6 mt-6">Physiotherapy Services</h3>
                    <div className="items-center justify-start gap-2 text-[#ff5e00]">
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Back Pain Treatment at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Sports Injury Treatment at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Post Surgical Rehab at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Paralysis Treatment at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Parkinson Disease Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Cerebral Palsy Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Arthritis Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Knee Pain Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Elbow Pain Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Foot Care Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Achilles Tendinitis Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Supraspinatus Tendinitis Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Spondylosis Treatment at home</h2>
                        <h2 className="text-md font-bold p-3 border-b-2">Ankylosing Spondylitis Treatment at home</h2>
                    </div>
                    <h3 className="text-[16px] font-bold text-center uppercase py-6 mt-6">Our Services</h3>
                    <div className="items-center justify-start gap-2 text-[#ff5e00]">
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Nurse Care at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Elder Care at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Diagnostic at home
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Doctor Consultations
                        </h2>
                        <h2 className="text-md font-bold p-3 border-b-2">
                            Medical Equipment
                        </h2>
                    </div>
                </div>
            </div>

            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">We Help You With:</h1>
                <p>• Establishing goals</p>
                <p>• Developing treatment plan</p>
                <p>• Developing treatment plan</p>
                <p>• Support as required </p>
                <Image priority src={IMAGES.DIET3} alt="Dietician" className="w-[60%] my-4" />
                <p>According to Dietitians of Canada, some roles of dietitians:</p>

                <p>• A clinical setting that Identify the nutrition problems and asses the nutritional status of patients .</p>
                <p>• Modification of special diet that develops your diet plans and counseling patients </p>
                <p>• Community setting: Prevention of nutrition-related diseases for assessing, promoting, protecting, and enhancing the health of the general public .</p>
                <p>• Food service setting provides a cost effective food production operation, distributing high quality meals/snacks, and monitoring sanitation and safety standards.</p>
                <p>• Nutrition will provide a consulting practices and to promote health and prevent disease</p>
                <p>• Dietary advice for working with individuals, groups, workplaces and media that makess you healthy living.</p>
                <p>• Business setting: while you are working with food and pharmaceutical companies to provide research, develop products, educate consumers, promote the market better food and nutritional products in a nutrition education, food chemistry, or food service administration to students.</p>
                <Image priority src={IMAGES.DIET4} alt="Dietician" className="w-[60%] my-4" />
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">HOW SERVICE WILL WORKS:</h1>
                <p className="my-2">1. Tell us what services you need.</p>
                <p className="my-2">2. We'll send this directly to the office closest to you and they will call you within 24 hours</p>
                <p className="my-2">3. They provide the service and asses your problem and give treatment plan.</p>
                <Image priority src={IMAGES.DIET5} alt="Dietician" className="w-[60%] my-4" />
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">DIETICIAN SERVICE</h1>
                <p className="my-2">All of us have plan to lead a healthy and happy life and prevent from any health issue. And the key skill to such a life is a maintain diet and a bit of exercise.</p>
                <p className="my-2">Drugcarts will help you to lead a full life and a complete health management plan and make a healthy and joyful experience. When it comes to health, most of us don’t even realize that we need attention on our behavior patterns and eating habits and leads to lifestyle related disease.</p>
                <p className="my-2">The healthcare professionals and dietician will provide healthcare service first their asses your habit and developing a treatment plan and promote you healthy life by maintaining diet and exercise.</p>
                <Image priority src={IMAGES.DIET6} alt="Dietician" className="w-[60%] my-4" />
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">Drugcarts provide key for health service</h1>
                <p className="my-2"><b>Assessment of Personalised Health</b></p>
                <p className="my-2">Personal health assessment provides individuals required to manage their health effectively that can prevent health problems. Additionally, our health specialist help to accurately finding health issues if once your health problem is identified, they help to set goal and create a plan to achieve the health goals.</p>

                <p className="my-2"><b>Coaching for Personalised Nutrition:</b></p>
                <p className="my-2">Our personalized nutrition coaching is a game changer and provide you a good health by creating a customized nutrition plan which includes health tips and 24/7 chat support, regular progress monitoring to help you move your desired goal. </p>

                <p className="my-2"><b>Regular monitoring and Support:</b></p>
                <p className="my-2">Good health management implies the customer on the right track, right advice at the beginning of the program. Drugcarts it’s a health management and ensure that your health advisor continuously monitoring get back to healthy life.</p>
            </div>
            <div className="mt-5 bg-blue-800 p-2 text-white text-center">
                <h1 className="text-md md:text-xl font-bold my-4">For enquiries, bookings or support and other details give a missed call @ +91 9920611567</h1>
                <p>Need help? Get a call back from our support team</p>
            </div>
        </section>
    )
}

export default Dietician