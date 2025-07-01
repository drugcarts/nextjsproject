"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { GetServiceUrlService } from "@/services/drugService";
import { PostServiceQuiryService } from "@/services/serviceenquiryService";
import { useFormik } from "formik";

const faqs = [
  {
    question: "Q1: HOW IT CAUSES SPREADING OF THE CORONAVIRUS?",
    answer:
      "A1: Human coronavirus can spread from a person infected with COVID-19 virus to other by close contacts. When the infected person coughs or sneezes, the contaminated droplets spread can enter the bodies of nearer people and infect them. It can also spread by contact with contaminated hands, surfaces or objects.",
  },
  {
    question: "Q2: WHEN DOES THE SYMPTOMS APPEAR?",
    answer:
      "A2: when someone is disclosed to the virus its take some time for the symptoms to appear is generally 5 to 6 days or might be from 2 to 14 days for first time. Due to this reason people who are in contact with a confirmed test are suggested to isolate themselves for 14 days.",
  },
  {
    question: "Q3: HOW TO PREVENT STIGMA PEOPLE RELATED TO COVID-19?",
    answer:
      "A3: Everyone must fight stigma and help others by social support. To fight against stigma is by learning and sharing facts is one of the best way. It must be interupted that viruses do not target specific ethnic or racial groups.",
  },
  {
    question: "Q4: WHAT ARE THE SOURCE OF CORONA VIRUS?",
    answer:
      "A4: Coronaviruses are actually a group of family viruses. Some cause illness in humans, and animals. In rare cases, animal coronaviruses that infected animals,have infected people can spread among people. Suspected in the case of COVID-19.Corana virus that originated from animals and then spread to people are Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS).",
  },
  {
    question: "Q5: IS COVID-19 FATAL?",
    answer:
      "A5: current situation, it may affect people is still not fully cleared. However, current information tells us that infection lies between 1% to 5% the fatality rate of people. It is high in elderly and people with undergo health issues.",
  },
  {
    question: "Q6: WHETHER A VACCINE IS FOR COVID-19?",
    answer:
      "A6: Currently, there is no vaccine available. Research is going on in many countries and scientists are trying their best to find a vaccine. At present, precaution and infection control measures are the most effective to prevent COVID-19.",
  },
  {
    question: "Q7: CAN AVOID SPREADING OF COVID-19 THROUGH FOOD?",
    answer:
      "A7: Coronaviruses must be spreading from person-to-person through respiratory droplets/secretions. At present, there is no evidence that supports transmission of COVID-19 through food. However a general precaution it is advised that before preparing or eating food it is best to wash your hands with soap and water for 20 seconds.",
  },
  {
    question: "Q8: WHO SHOULD WEAR A MASK?",
    answer:
      "A8: For the general population who do not have any symptoms, there is no need to wear a mask. People who are showing respiratory symptoms should wear a mask because they do not spread infection to other people. They should consult a doctor is more important as soon as possible.",
  },
  {
    question: "Q9: WILL HOT WEATHER STOP THE OUTBREAK OF COVID-19?",
    answer:
      "A9: Yet not confirmed if weather and temperature have any impact on the spread of COVID-19. Although some viruses, like common cold and flu, spread more during cold months but that does not mean that one can’t become sick during warm months. Till now yet not clear whether the spread of COVID-19 will reduce during weather season.",
  },
  {
    question: "Q10: WHO ARE AT HIGHER RISK OF GETTING COVID-19?",
    answer:
      "A10: Information from China, where COVID-19 first started, shows that some people are at higher risk of getting sick from this illness its mainly in older adults people who have serious chronic medical conditions like heart disease, diabetes, hypertension and lung disease.",
  },
  {
    question: "Q11: WHAT DOES PEOPLE WITH HIGHER RISK OF COVID-19?",
    answer:
      "A11:If you have the severe risk for COVID-19, you should stop doing daily activities; take precautions to maintain distance between yourself and others when you go out in public, be away from people who are sick; wash your hands often; avoid public places and unessential travel. Be care on symptoms and emergency signs. If you get affected, stay at home and call your doctor to inform your symptoms and get advice.",
  },
  {
    question: "Q12: WHY SHOULD BE TESTED FOR COVID-19?",
    answer:
      "A12: If you having symptoms like fever, cough and difficulty breathing, or close contact with a person to COVID-19, or you have travel history to outer countries or are in contact with people who have recently traveled to higher risk countries (China, Singapore, Japan, South Korea, Thailand, USA, UK, EU, Iran) contact your doctor or healthcare professional. The healthcare professional will determine when you need to be tested for COVID-19.",
  },
  {
    question:
      "Q13: WHEN YOU HAVE TRAVELLED TO A HIGHER RISK COUNTRY SOME PRECAUTIONS SHOULD DO?",
    answer:
      "A13: If you have stayed in or transited through a higher risk country in the last 14 days, you must self isolate yourself for 14 days, counting from the day you departed the higher risk country. You must monitor yourself for symptoms and if you develop fever or respiratory symptoms, please contact your healthcare provider urgently.",
  },
  {
    question:
      "Q14: WHAT TYPE OF DISINFECTANT SOLUTION IS USED FOR HOME SANITIZATION?",
    answer:
      "A14: As a Home Healthcare company, we should aware of how important to keep your surroundings sanitized without creating an impact on your health. Disinfectant solution used is government approved, skin-friendly and tested for any reactions. With a concentration of 70 percent isopropyl alcohol, our Disinfectant solution kills 99.9% of bacteria and viruses on any surface by drugcarts.",
  },
  {
    question:
      "Q15: How will ensure safe and secure Sanitization process at Home?",
    answer:
      "A15: Our Sanitization worker uses disposable PPE kit, gloves, Masks, and Face shield to ensure safety before sanitization.",
  },
  {
    question: "Q16: If I have a 3 or 4 BHK apartment size?",
    answer: "A16: Extra charges are applicable",
  },
  {
    question: "Q17: Is your lab testing is accredited with NABL?",
    answer:
      "A17: Yes, we are officially tied up with SRL Labs for COVID Testing.",
  },
  {
    question: "Q18: COVID test need ICMR approved?",
    answer: "A18: Yes",
  },
];
const ClientCovidCare = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { serviceUrl } = useSelector((state) => state.serviceData);
  const dispatch = useDispatch();
  const pathname = usePathname();

  let pathSegments = pathname.split("/").filter(Boolean);
  pathSegments = pathSegments.map((segment) => segment.replace(/-/g, " "));

  const urlText = pathSegments[0].split(" ").join("-");

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
      await dispatch(PostServiceQuiryService(data, resetForm));
    },
  });

  return (
    <section className="max-w-7xl mt-3 mx-auto">
      <div className="flex flex-wrap h-62 justify-center items-center mx-auto">
        <div className="w-full md:w-[58%] m-2 rounded-md">
          <Image
            priority
            src={IMAGES.COVIDDRUGCARTS}
            alt="Logo"
            className="w-[100%] md:h-[300px] rounded-lg"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full md:w-[40%] md:h-[300px] p-2 text-center bg-[#EBEBEB] rounded-md"
        >
          <h2 className="font-bold text-[16px]">Covid Protection at Home</h2>
          <p className="text-sm mb-6">
            Get ahold of the best-in-class COVID Protection / Care services at
            Zorgers & provide the finest health care to your loved ones
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
            <label className="w-[30%] block md:mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              required
            />
            <label className="w-[30%] block md:mt-4 md:mb-2">Mobile</label>
            <input
              type="number"
              name="mobile"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
            <label className="w-[30%] block md:mt-4 md:mb-2">E-Mail</label>
            <input
              type="email"
              name="email"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              required
            />
            <label className="w-[30%] block  md:mt-4 md:mb-2">City</label>
            <input
              type="text"
              name="city"
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
          <h1 className="text-md md:text-xl font-bold">
            COVID CARE SOLUTIONS FROM DRUGCARTS
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border-[1.5px] m-2 p-2 border-[#22aba1]">
              <Image
                priority
                src={IMAGES.ISOLA1}
                alt="Logo"
                className="h-20 w-32 mx-auto"
              />
              <h2 className="font-bold text-[14px] my-2">
                HOME ISOLATION – ISOLATION CARE PATIENTS AND MANAGEMENTS AT HOME
              </h2>
            </div>
            <div className="border-[1.5px] m-2 p-2 border-[#22aba1]">
              <Image
                priority
                src={IMAGES.ARMOR}
                alt="Logo"
                className="h-20 w-32 mx-auto"
              />
              <h2 className="font-bold text-[14px] my-2">
                COVID PROTECTION – PROTECT YOUR PEOPLE FROM COVID
              </h2>
            </div>
            <div className="border-[1.5px] m-2 p-2 border-[#22aba1]">
              <Image
                priority
                src={IMAGES.COVIDTEST}
                alt="Logo"
                className="h-20 w-32 mx-auto"
              />
              <h2 className="font-bold text-[14px] my-2">
                COVID TESTING – COVID TESTING FOR THE SAFETY OF YOUR HOMES
              </h2>
            </div>
          </div>
          <div className="shadow-md rounded-lg p-6 mt-5">
            <h1 className="text-md md:text-xl font-bold">CORONAVIRUS MEANS</h1>
            <p className="my-2">
              Coronaviruse are a group of viruses or family viruses that usually
              from the common cold to MERS (Middle East Respiratory Syndrome
              coronavirus) and SARs (Severe acute respiratory syndromes. But
              somethime its most serious infection and causes death.
            </p>
          </div>
          <div className="shadow-md rounded-lg p-6 mt-5">
            <h1 className="text-md md:text-xl font-bold">
              AT IS CORONAVIRUS, COVID-19
            </h1>
            <p className="my-2">
              Coronavirus disease 2019 (COVID-19) is an infectious disease which
              causes by severe acute respiratory syndrome coronavirus 2
              (SARS-CoV-2). It is a virus closely linked to the SARS virus is a
              development of new strain. It was earlier known by the specific
              name 2019 a novel coronavirus (2019-nCoV). The disease was first
              reported in Wuhan and China.
            </p>
          </div>
          <div className="shadow-md rounded-lg p-6 mt-5">
            <h1 className="text-md md:text-xl font-bold">EPIDEMIOLOGY</h1>
            <p className="my-2">
              During December 2019, the first four cases of an acute respiratory
              syndrome of unknown etiology were reported in Wuhan, Hubei
              Province, China observed a cluster of pneumonia cases of unknown
              cause. The first few cases had contact history to the original
              Seafood Market in china and therefore, the virus is thought to be
              origin of zoonotic, The new virus that has caused the outbreak is
              known as SARS-CoV-2. It is believed to be closely related to bat
              coronaviruses, pangolin corona viruses, and SARS-CoV.
            </p>
            <Image
              priority
              src={IMAGES.COVIDBANNER1}
              alt="Logo"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full md:w-[30%] p-2 border-[1.5px]">
          <h3 className="text-[16px] font-bold text-center uppercase pb-6 mt-6">
            Physiotherapy Services
          </h3>
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
            <h2 className="text-md font-bold p-3 border-b-2">
              Parkinson Disease Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Cerebral Palsy Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Arthritis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Knee Pain Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Elbow Pain Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Foot Care Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Achilles Tendinitis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Supraspinatus Tendinitis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Spondylosis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Ankylosing Spondylitis Treatment at home
            </h2>
          </div>
          <h3 className="text-[16px] font-bold text-center uppercase py-6 mt-6">
            Our Services
          </h3>
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
      <div>
        <div className="shadow-md rounded-lg p-6 mt-5">
          <h3 className="text-md md:text-xl font-bold my-2">
            HOW DOES IT SPREAD COVID-19{" "}
          </h3>
          <p className="my-2 font-bold"> A) CONTACT FROM PERSON TO PERSON :</p>
          <p>
            {" "}
            The virus is spreading mainly from one person to another. It
            generally observed spreads between people who are in close contact
            (6 feet or lesser) with each other. When the infected person
            sneezes, the respiratory droplets that enter the mouths, noses to
            nearest people get inhaled into the lungs.
          </p>
          <p>
            {" "}
            People who are in severe condition (most symptomatic level) are must
            be contagious diseases.
          </p>
          <p> If any symptoms causes severely for people to be contagious.</p>
          <p className="my-2 font-bold">
            {" "}
            B) CONTAMINATION OF OBJECTS OR SURFACES WITH VIRUS:
          </p>
          <p>
            {" "}
            There are many possible that a person can get COVID-19 and it one of
            the main way for spreading of virus if he/she touches a contaminated
            surface or object and it has the virus and then touches their own
            nose, mouth or eyes causes diseases.
          </p>
          <Image
            priority
            src={IMAGES.COVIDBANNER2}
            alt="COVIDBANNER2"
            className="w-[60%] mx-auto my-2"
          />
        </div>
        <div className="shadow-md rounded-lg p-6 mt-5">
          <h3 className="text-md md:text-xl font-bold my-2">
            {" "}
            RECOMMENDED FOR THE DIAGNOSIS OF COVID-19
          </h3>
          <p>
            {" "}
            Infection of the Coronavirus can be diagnosed on the basis of
            patient symptoms, history of travel, and contact with infected
            patients and diagnostic imaging. Suggested test for COVID-19 is
            performing real-time fluorescence (RT-PCR) to detect the positive
            nucleic acid of SARS-CoV
          </p>
        </div>
        <div className="shadow-md rounded-lg p-6 mt-5">
          <h3 className="text-md md:text-xl font-bold my-2">
            PREVENTION AND SYMPTOMS OF COVID-19
          </h3>
          <p className="my-2 font-bold">Symptoms for Covid-19</p>
          <p className="my-2">
            {" "}
            The COVID-19 have ranged from mild to severe illness some of the
            following symptoms may appear from 2 to 14 days
          </p>

          <p className="my-2">
            {" "}
            * The affected people with a fever and dry cough
          </p>
          <p className="my-2">
            {" "}
            * Other symptoms include myalgia or fatigue and shortness of breath
          </p>
          <p className="my-2">
            {" "}
            * Some common symptoms are headache, sputum production, muscle pain,
            and sore throat
          </p>
          <p className="my-2">
            {" "}
            Most cases result in mild symptoms it may lead to pneumonia and
            multi-organ failure. The COVID-19 is estimated at between 1% and 5%
            worldwide and is highly dependent on the age of the patient its
            fatality rate. 15% of death for patients more than 80 years old is
            worldwide.
          </p>
          <Image
            priority
            src={IMAGES.COVIDBANNER3}
            alt="COVIDBANNER3"
            className="w-[60%] mx-auto"
          />
        </div>
        <div className="shadow-md rounded-lg p-6 mt-5">
          <h3 className="text-md md:text-xl font-bold my-2">
            {" "}
            TO PREVENT FROM ILLNESS THE FOLLOWING STEPS
          </h3>
          <p className="my-2">
            {" "}
            Currently there is no vaccine to prevent corona virus disease 2019
            (COVID-19). The most important way to prevent illness is to avoid
            getting exposed to this virus.
          </p>

          <p className="my-2 font-bold">
            1) IMPORTANT STEPS TO PROTECT OURSELF
          </p>
          <p className="my-2">
            <b>Wash and clean your hands often : </b>
          </p>
          <p className="my-2">
            {" "}
            Wash your hands with soap and water for a minimum 20 seconds after
            from the public place, or after coughing, sneezing or blowing your
            nose. If soap is not available in your hand or can use a hand
            sanitizer that has at least 60% alcohol. Without washing your hand
            do not touch your nose, mouth and eyes with.
          </p>
          <p className="my-2">
            <b>Avoid close contact with people who are get affected :</b>
          </p>
          <p className="my-2">
            {" "}
            If COVID-19 is spreading in your region or community, Maintain
            distance between yourself from other people. This is more important
            for people who are in older age causes severe risk
          </p>
          <p className="my-2">
            <b>When you’re sick stay at home :</b>
          </p>
          <p className="my-2">
            {" "}
            When you are sick, stay at home, except to get medical care. We will
            explain what to do if you are sick in next content
          </p>

          <p className="my-2">
            <b>
              2) WHEN YOU ARE SICK OR SOMEONE IN YOUR HOME IS INFECTED SOME OF
              THE STEPS TO PREVENT THE SPREAD OF COVID-19
            </b>
          </p>
          <p className="my-2">
            {" "}
            If you are get infected with COVID-19 or suspect for you or someone
            in your family is infected, follow the some steps to help prevent
            the disease from spreading to other people.
          </p>
          <p className="my-2">
            {" "}
            * Stay home except to get medical care : People who show mild
            symptoms of COVID-19 are suggested to get isolated at home during
            their illness,. Do not go to public areas, work or school and avoid
            using public transportation except for getting medical care
          </p>
          <p className="my-2">
            {" "}
            * Stay away from other people:Separate yourself as much as possible.
            It is also advisable that you must stay in a specific room and away
            from other people. use a separate bathroom, if it’s there in your
            home.
          </p>
          <p className="my-2">
            {" "}
            * Limit contact with pets: While you are get affected with COVID-19,
            should restricted contact with pets and other animals. Till now no
            reports of animals getting sick with COVID-19, its still advisable
            that people infected with COVID-19 do not touch pets and other
            animals and still more information is known about the corona virus.
          </p>
          <p className="my-2">
            {" "}
            * Call a doctor before visiting your: If you already booked an
            appointment with the doctor, call and tell them that you may have
            COVID-19. This is very important and that surely help the healthcare
            provider to take steps to protect other people from getting exposed.
          </p>
          <p className="my-2">
            {" "}
            * If you are infected wear a facemask: The infected person must wear
            a facemask when he/she is around other people or pets and before
            they enter a hospital or clinic. If the affected person cannot able
            to wear a facemask due to breathing issues or some other problem,
            then people who live in the same house should not stay in the same
            room, and they must wear a facemask if they have to enter a room of
            the infected person.
          </p>
          <p className="my-2">
            {" "}
            * Cover your sneezes and coughs: When you cough or sneeze, close
            your mouth and nose with a tissue. Then throw the used tissues in a
            lined dustbin.
          </p>
          <p className="my-2">
            {" "}
            * Do not share personal household items: You must not share drinking
            glasses, cups, utensils, towels, or bedding with other person or
            pets in your house. After using household items, wash them
            thoroughly with soap and water.
          </p>
          <p className="my-2">
            {" "}
            * Clean and disinfect all “high-touch” surfaces everyday: You must
            clean high touch surfaces like tabletops, bathroom fixtures,
            doorknobs, desktop keyboards, phones and bedside tables. Also, clean
            any surfaces that may contain body fluids on them.
          </p>
          <Image
            priority
            src={IMAGES.COVIDBANNER4}
            alt="COVIDBANNER3"
            className="w-[60%] mx-auto"
          />
        </div>
        <div className="shadow-md rounded-lg p-6 mt-5">
          <h3 className="text-md md:text-xl font-bold my-2">
            DRUGCARTS WILL HELP YOU FOR SUPPORT IN PREVENTING:
          </h3>
          <p className="my-2">
            {" "}
            Drug carts is one the best in-home medical care providers in India.
            You will get the best support services with comfort and be safe at
            your home.
          </p>
          <p className="my-2">
            {" "}
            People with mobility issues or people recovering from a surgery, who
            are intending to visit hospital seeking for medical support services
            can avoid it by availing in-home medical support services.
          </p>
          <p className="my-2">
            {" "}
            Have you been in contact with a person affected with COVID-19? Are
            you a frequent traveler? Are you above the age of 60 yrs? Do you
            have Diabetes/High BP, Flu like symptoms, fall sick often. Just call
            Drugcarts to support you medically for self quarantine at home.
          </p>
          <p className="my-2">
            {" "}
            People with mild suspected cases or those discharged from hospital
            post treatment of COVID-19 can take home care services for
            continuity of medical care. These medical support services are
            provided through Drugcarts experienced nurses, doctors and health
            professionals
          </p>
          <p className="my-2">
            {" "}
            We also provide Home Quarantine services for COVID-19 and also
            provide disinfectant kits.
          </p>
          <p className="my-2">
            <b>
              {" "}
              DRUGCARTS WILL PROVIDE THE PROMINENT HOME SERVICES SOME OF THEM:
            </b>
          </p>
          <p className="my-2">
            {" "}
            * Nursing services at home (Nurse for cancer care, Nubilization,
            etc)
          </p>
          <p className="my-2"> * Nursing Attendants at home</p>
          <p className="my-2"> * Physiotherapy at home</p>
          <p className="my-2">
            {" "}
            * Medical Equipment like Respiratory Care products and others
            (Oxygen Concentrator, CPAP and BiPAP System etc,.){" "}
          </p>
          <p className="my-2"> * Eldercare at home</p>
          <p className="my-2">
            {" "}
            * Diabetic care packages (Diabetic peoples are more sensitive
          </p>
          <p className="my-2"> * Adult vaccinations at home</p>
          <p className="my-2"> * Lab tests at home (except COVID-19 tests)</p>
          <Image
            priority
            src={IMAGES.COVIDBANNER5}
            alt="COVIDBANNER5"
            className="w-[60%] mx-auto"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
        <h2 className="text-md md:text-xl font-bold my-2">FAQ</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`flex justify-between w-full p-4 text-left text-lg uppercase font-medium focus:outline-none ${
                openIndex === index
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {faq.question}
              {openIndex === index ? (
                <ArrowUpwardIcon className="w-6 h-6" />
              ) : (
                <ArrowDownwardIcon className="w-6 h-6" />
              )}
            </button>

            {openIndex === index && (
              <div className="p-4 text-gray-600 bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 bg-blue-800 p-2 text-white text-center">
        <p>
          Save Money & Time : Book a appointment for your convenience and save
          your time and money.
        </p>
      </div>
    </section>
  );
};

export default ClientCovidCare;
