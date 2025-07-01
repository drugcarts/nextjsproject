"use client";
import { useEffect } from "react";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { GetServiceUrlService } from '@/services/drugService';
import { PostServiceQuiryService } from '@/services/serviceenquiryService';
import { useFormik } from "formik";

const CriticalCare = () => {
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
                    <Image priority src={IMAGES.CRITICALCAREBANNER} alt="CRITICAL CARE BANNER" className="w-[100%] md:h-[300px] rounded-lg" />
                </div>
                <form onSubmit={formik.handleSubmit} className="w-full md:w-[40%] md:h-[320px] p-2 text-center bg-[#39e5fc] rounded-md">
                    <h2 className="font-bold text-[16px] uppercase">Critical Care</h2>
                    <p className="text-sm mb-6">Looking for long-term ICU like service at home? Our clinical procedures have been developed in consultation with leading hospitals and doctors, ensuring the highest quality of medical care at home. To get in-home Critical Care services in your city, begin here.</p>
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
            <div className="flex mt-6">
                <div className="w-full md:w-[68%] p-2">
                    <div className="shadow-md rounded-lg p-6">
                        <h1 className="text-md md:text-xl font-bold">Critical Care At Home</h1>
                        <p className="my-2"> Where is your home it happens healing. Drugcarts ICU@Home services are for Patients with no longer in the acute phase of their illness but still require intensive care.</p>
                        <p className="my-2"> ICU@Home services includes the care, supervision of highly experienced critical care therapists, experts and nurses with effectively at lower price than of a hospital stay.</p>
                        <p className="my-2"> By Six ways we make critical care at home. A great choice for the patient and her family with clinical procedure, in a hospital consultation and renowned experts, ensuring the highest quality medical care.</p>
                    </div>
                    <div className="shadow-md rounded-lg p-6 mt-5">
                        <h1 className="text-md md:text-xl font-bold">WHEN YOU NEED CRITICAL CARE?</h1>
                        <p className="my-2"> When a family member needs care, a lot of doctors and hospitals advised for such long term ICU to be provided at home if possible, in such case there are no active interventions to be taken.</p>
                        <p className="my-2"> When the patient is happier at home and healing may happen without the threat of hospital infection in such time take care at home and provide financial easier at 30% cheaper than a hospital.</p>
                        <p className="my-2"> Trained nurses will provide this service to a lot of patients with respiratory or neurological disease who take a long time to recover and need adequate device support and specialised care.</p>
                    </div>
                    <div className="shadow-md rounded-lg p-6 mt-5">
                        <h1 className="text-md md:text-xl font-bold">CHOOSING ICU CARE WITH BENEFITS AT HOME FROM DRUGCARTS</h1>
                        <p className="my-2"> <b> Experienced ICU Nurses : </b> Basic Life Support certified.</p>
                        <p className="my-2"> <b> Physician Driven care : </b> Executed and monitored by in-house intensives.</p>
                        <p className="my-2"> <b> The best practices based on evidence : </b> A care compliant based on clinical outcomes to global standards.</p>
                        <p className="my-2"> <b> Cost-effective treatment : </b> Customized packages which gets down the cost easier.</p>
                        <p className="my-2"> <b> Best in equipment class : </b> Bio medical Engineers.</p>
                        <Image priority src={IMAGES.CRITICAL1} alt="Critical" className="w-[60%] my-4" /><br /><br />
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 shadow-md rounded-lg p-2 py-6 mt-5">
                <div className="border-[2px] p-2">
                    <h2 className=" text-blue-950 font-bold"><CheckBoxIcon /> Care provided for critical patients</h2>
                    <p className="my-2"> <b>* </b> Neurology patients </p>
                    <p className="my-2"> <b>* </b> Cancer patients (including Palliative Care) </p>
                    <p className="my-2"> <b>* </b> Pulmonology patients </p>
                    <p className="my-2"> <b>* </b> Cardiac patients </p>
                    <p className="my-2"> <b>* </b> Nephrology patients </p>
                </div>
                <div className="border-[2px] p-2">
                    <h2 className=" text-blue-950 font-bold"><CheckBoxIcon /> Complete Critical Care Solutions</h2>
                    <p className="my-2"> <b>* </b> Critical-Care Nursing</p>
                    <p className="my-2"> <b>* </b> Health Attendant</p>
                    <p className="my-2"> <b>* </b> Patient Vital Monitoring Support</p>
                    <p className="my-2"> <b>* </b> Medical Equipment</p>
                    <p className="my-2"> <b>* </b> Specialized Physiotherapist</p>
                </div>
                <div className="border-[2px] p-2">
                    <h2 className=" text-blue-950 font-bold"><CheckBoxIcon /> Complimentary Inclusions</h2>
                    <p className="my-2"> <b>* </b> Doctor Visit@Home</p>
                    <p className="my-2"> <b>* </b> Dedicated Case Manager</p>
                    <p className="my-2"> <b>* </b> Infection Control Surveillance</p>
                    <p className="my-2"> <b>* </b> Regularly Connect with the Treating Doctor</p>
                    <p className="my-2"> <b>* </b> 24×7 remote monitoring</p>
                </div>
                <div className="border-[2px] p-2">
                    <h2 className=" text-blue-950 font-bold"><CheckBoxIcon /> Access to Other Services at Home</h2>
                    <p className="my-2"> <b>* </b> X-ray at Home</p>
                    <p className="my-2"> <b>* </b> 24×7 Sample Collection</p>
                    <p className="my-2"> <b>* </b> 24×7 Max Ambulance Service</p>
                </div>
            </div>

            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">DRUGCARTS WILL COMMIT YOU TOWARDS</h1>
                <p className="my-2"> * Connected care – with doctors and caregivers</p>
                <p className="my-2"> * Service reliable with defined protocols</p>
                <p className="my-2"> * Affordability with less than 50%hospital cost</p>
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">HOW YOU CAN GIVE OUR CRITICAL CARE SERVICES AT HOME</h1>
                <Image priority src={IMAGES.CRITICAL2} alt="CRITICAL" className="w-[60%] my-4" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 1</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>CALL US (+91 9920611567) OR DROP YOUR NUMBER</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 2</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>OUR REPRESENTATIVE WILL CALL YOU SOON</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 3</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>PATIENT CARE ATTENDANT FOT INTIAL ASSESSMENT</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 4</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>CONFIRMATION OF SERVICE BY PATIENT ATTENDANT</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 5</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>CONFIRMATION OF SERVICE BY PATIENT ATTENDANT</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 6</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>ICU SET UP IN PATIENT ROOM</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 7</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>INFECTION CONTROL FUMIGATION IN THE PATIENTS ROOM</p>
                    </div>
                    <div className="border-[1.5px] border-gray-700 bg-pink-100 rounded-lg p-2 text-center">
                        <h2 className="text-md md:text-xl font-bold text-green-800">STEP 8</h2>
                        <hr className="border-2 m-2 border-orange-500" />
                        <p>START SERVICE AT YOUR HOME</p>
                    </div>
                </div>
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">WHY TO CHOOSE DRUGCARTS?</h1>
                <p className="my-2"> <b>CERTIFIED ICU NURSES & ICU DOCTOR</b></p>
                <p className="my-2"> Its ensure quality care with extensive hands on experience, professional certifications and training our specialists ICU Doctors.</p>

                <p className="my-2"> <b>BEST IN CLASS ICU DEVICES</b></p>
                <p className="my-2"> We provide a wide range of products for all patients needs with an affordable price range.</p>

                <p className="my-2"> <b>COST ADVANTAGE</b></p>
                <p className="my-2"> Complete high expenses of the critical care services come at a hospital, less cost of the same services at a home.</p>

                <p className="my-2"> <b>TREATING PHYSICIAN</b></p>
                <p className="my-2"> With your own physician take the care plan design and share patient data periodically with him/ her.</p>

                <p className="my-2"> <b>MONITORING CONTINUOUSLY</b></p>
                <p className="my-2"> To monitor the patient progress and recovery data our trained specialist from our state of the medical devices.</p>

                <p className="my-2"> <b>LOWER RISK OF INFECTION</b></p>
                <p className="my-2"> Home ICU setups not only save time, money but also its reduce the risk of infections for the patient.</p>
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">HOW CCU/ICU WORKS?</h1>
                <p className="my-2"> From drugcarts the physician will examine the patient when you need for long-term ICU care at home </p>
                <p className="my-2"> After a detailed discussion with a designated health manager, the patient refers to Drugcarts care plan.</p>
                <p className="my-2"> The Patient assessment process starts with our clinical team evaluating the patient and understanding their requirements such as devices & consumables. Followed assessment to identify a space for ICU set up at the patient’s home.</p>
                <p className="my-2"> A day before the patient’s arrival at home, our team delivers the devices and installs the ICU set up.</p>
                <p className="my-2"> Complete expenses of the critical care services come at a fraction of cost of the same services at a hospital.</p>

                <p className="my-2"> One day before the patient’s arrival, our team delivers the devices and installs the ICU set up at home.</p>
                <p className="my-2"> The critical care services come at a fraction of cost with complete expenses for the same services at a hospital.</p>

                <p className="my-2"> Drugcarts with Clinical team along with the head nurse keep the home ready for patient’s arrival.</p>
                <p className="my-2"> Our Proprietary software ensures 24×7 monitoring of the patient’s and the treating physician reports are updated with the patient’s condition multiple times a day</p>
                <p className="my-2"> Twice every week the ICU Doctor discuss progress with the patient’s family through drugcarts.</p>
                <p className="my-2"> The nursing supervisor will updates through telephonic daily to patient family care</p>
                <p className="my-2"> Nursing supervisor performs a weekly audit with the care giving team and the patient’s family at home</p>
            </div>
            <div className="shadow-md rounded-lg p-6 mt-5">
                <h1 className="text-md md:text-xl font-bold">FAQ</h1>
                <p className="my-2"> <b> Q: How can we find ICU care at home near me?</b></p>
                <p> A: You can choose from multiple options to find ICU care at home - book online, request a call on our website or simply dial +91 9920611567.</p>

                <p className="my-2"> <b> Q: What are the ICU care team consist of?</b></p>
                <p> A: It is a multidisciplinary team consisting of qualified, ICU experienced Nurse, Intensivist, Respiratory Therapist, Physiotherapist and Trained Attendant. Additionally, there are daily visits by Nursing Supervisor and Bio-medical Engineer.</p>

                <p className="my-2"> <b> Q: What is the minimum duration when I need to book ICU care service at home?</b></p>
                <p> A: Our minimum duration for booking ICU Care services is 1week.</p>


                <p className="my-2"> <b> Q: How much does the cost of ICU care at home?</b></p>
                <p> A: Our charges varies based on several factors including clinical condition of the patient, equipment required, duration of the service, location & other details. However our estimated charges are INR 6000-9000 per day inclusive of taxes for ICU care at home.</p>

                <p className="my-2"> <b> Q: Whether I can pay through online services?</b></p>
                <p> A: We have hassle-free secure online payment open for your convenience.</p>
            </div>
            <div className="mt-5 bg-blue-800 p-2 text-white text-center">
                <h1 className="text-md md:text-xl font-bold my-4">For enquiries, bookings or support and other details give a missed call @ +91 9920611567</h1>
                <p className="my-2">Need help? Get a call back from our support team</p>
            </div>
        </section>
    )
}

export default CriticalCare