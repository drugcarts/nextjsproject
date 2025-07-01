"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSpecialListService } from "@/services/specialityService";
import { useRouter } from "next/navigation";
import { GetPageBannerUrlService } from "@/services/pageBannerService";

const ClientSpecialty = () => {
  const { pageBannerUrl } = useSelector((state) => state.pageBannerData);
  const { specialList } = useSelector((state) => state.specialityData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(GetPageBannerUrlService("specialty"));
    dispatch(GetSpecialListService());
  }, []);

  return (
    <section className="max-w-7xl mt-3 mx-auto">
      <Image
        priority
        src={
          pageBannerUrl?.image
            ? `https://assets1.drugcarts.com/admincolor/homepage/pagebanner/${pageBannerUrl?.image}`
            : IMAGES.NO_IMAGE
        }
        alt="Ayush Banner"
        className="w-[100%] h-[200px] rounded-xl"
        width={500}
        height={100}
      />
      <h2 className="text-md md:text-xl font-bold my-4 px-2">
        Most Visited Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-2">
        {specialList?.specialty_lists?.map((item, i) => (
          <div
            className="bg-pink-200 rounded-md border-[1.5px] shadow-lg overflow-hidden cursor-pointer"
            key={i}
            onClick={() => router.push(`/doctorlist/${item?.url}`)}
          >
            {/* <div className="bg-gradient-to-r from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90% rounded-md border-[1.5px] shadow-lg overflow-hidden"> */}
            <Image
              className="w-full h-32 p-3 object-contain"
              src={
                item?.image
                  ? `https://assets2.drugcarts.com/${item?.image}`
                  : IMAGES.NO_IMAGE
              }
              alt={item?.specialty_name}
              width={250}
              height={250}
            />
            <h2 className="text-md md:text-xl font-bold py-2 text-center">
              {item?.specialty_name}
            </h2>
          </div>
        ))}
      </div>
      <div className="bg-[#F3F8FC] p-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#fff]">
            <Image
              priority
              src={IMAGES.CONSULTATION}
              alt="Online Consultation"
              className="w-32 rounded mx-auto bg-[white] p-2"
            />
            <h1 className="text-2xl font-bold text-green-900 text-center my-4">
              20L+
            </h1>
            <h1 className="text-2xl font-bold text-[#0970FF] text-center my-4">
              Total Consultations
            </h1>
            <p className="text-center mb-6">
              Consultation is the act of seeking assistance from another
              physician(s) or health care professional(s) for diagnostic
              studies, therapeutic interventions, or other services that may
              benefit the patient.
            </p>
          </div>
          <div className="bg-[#fff]">
            <Image
              priority
              src={IMAGES.DIALYCONSULTATION}
              alt="Daily Consultation"
              className="w-32 rounded mx-auto bg-[white] p-2"
            />
            <h1 className="text-2xl font-bold text-green-900 text-center my-4">
              2k+
            </h1>
            <h1 className="text-2xl font-bold text-[#0970FF] text-center my-4">
              Daily Consultations
            </h1>
            <p className="text-center mb-6">
              They spend a part of their workday prescribing medicines, making
              notes on patients' condition, going for rounds in hospital wards,
              interpreting test results, talking to patients' relatives and
              advising patients on ways of staying healthy. 
            </p>
          </div>
          <div className="bg-[#fff]">
            <Image
              priority
              src={IMAGES.DOCTORICONS}
              alt="Doctor"
              className="w-32 rounded mx-auto bg-[white] p-2"
            />
            <h1 className="text-2xl font-bold text-green-900 text-center my-4">
              20+
            </h1>
            <h1 className="text-2xl font-bold text-[#0970FF] text-center my-4">
              Doctor Specialities
            </h1>
            <p className="text-center mb-6">
              Specializations include General Medicine, General Surgery,
              Pediatrics, Obstetrics & Gynecology, Dermatology, Ophthalmology,
              Orthopedics, ENT (Ear, Nose and Throat), Psychiatry,
              Anesthesiology etc.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#D5F1C3] p-4 mt-5">
        <h1 className="text-md md:text-2xl font-bold py-6 text-center text-[#4C4C95]">
          Online doctor consultation with qualified doctors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="mt-1">
            <Image
              priority
              src={IMAGES.CONFIDENTIAL}
              alt="CONFIDENTIAL"
              className="w-32 rounded mx-auto p-2"
            />
            <h1 className="text-2xl font-bold text-[#4C4C95] text-center my-4">
              Confidential
            </h1>
            <p className="text-center mb-6">
               Preserving authorized restrictions on access and disclosure,
              including means for protecting personal privacy and proprietary
              information.
            </p>
          </div>
          <div className="mt-1">
            <Image
              priority
              src={IMAGES.CONVENIENCE}
              alt="CONVENIENCE"
              className="w-32 rounded mx-auto p-2"
            />
            <h1 className="text-2xl font-bold text-[#4C4C95] text-center my-4">
              Convenience
            </h1>
            <p className="text-center mb-6">
              A quality or situation that makes something easy or useful for
              someone by reducing the amount of work or time required to do
              something.
            </p>
          </div>
          <div className="mt-1">
            <Image
              priority
              src={IMAGES.DOCTORICON}
              alt="Doctor"
              className="w-32 rounded mx-auto p-2"
            />
            <h1 className="text-2xl font-bold text-[#4C4C95] text-center my-4">
              Doctors
            </h1>
            <p className="text-center mb-6">
              The National Medical Commission (NMC) has introduced a new
              licensing and registration system for doctors in India to continue
              practicing medicine.
            </p>
          </div>
          <div className="mt-1">
            <Image
              priority
              src={IMAGES.WALLETS}
              alt="WALLETS"
              className="w-32 rounded mx-auto p-2"
            />
            <h1 className="text-2xl font-bold text-[#4C4C95] text-center my-4">
              Cost Effective
            </h1>
            <p className="text-center mb-6">
              Cost-effective care strategies, which focus on controlling
              expenses associated with different treatment methods and
              institutional operations without compromising the quality of
              patient care.
            </p>
          </div>
        </div>
      </div>
      <div className="border-[1.5px] p-4 mt-5">
        <h2 className="text-md md:text-xl font-bold my-4">
          Consult Doctor Online at Drugcarts for Medical Need
        </h2>

        <p className="my-6">
          Forget the commotion of booking appointments. Consult a doctor at your
          facility with <strong>drugcarts</strong>.where offer premium
          healthcare services through the network of well experienced and best
          certified doctors. Jump the struggle of rush hour and waiting in
          queues and get advice anytime and anywhere. <strong>Drugcarts</strong>{" "}
          give you access to over 5000 highly well trained medical experts. You
          get the most Excellent medical services by <strong>drugcarts</strong>.
          Combined with best advanced treatment and most accurate diagnosis, a
          subscription to <strong>drugcarts</strong>. can help you get in touch
          with well reputed healthcare professionals.
        </p>
        <p className="my-6">
          Get online doctor consultation simply and protectively via the{" "}
          <strong>drugcarts</strong> platform where individual specialized
          general physicians, ayurvedic doctors, dietician, skin specialist,
          sexologists, gynaecologists, nutritionists, psychiatrist are connected
          to offer medical assistance via different mode of communication. Now
          you can consult with online doctors 24*7 and healthcare professionals
          from anywhere and anytime by connecting with us. Now join with online
          doctor consultation network through <strong>Drugcarts</strong>{" "}
          platform and app to get to ask health related queries freely, health
          consultations and quick appointments.
        </p>

        <p className="font-bold my-6">
          Get online doctor consultation-safe, Secure and Easy:
        </p>
        <p className="my-6">
          <strong>Drugcarts</strong> is the excellent online doctor consultation
          app that has transformed the way people in india think and take of
          their health and fitness needs. Doctors connected with drugcarts are
          well experienced and professionally trained. Many of them have an
          experience over 20 years and do the best service to their patients.
          Now connect with professional and experience physician anytime and
          anywhere you need, <strong>Drugcarts</strong> helps the patients to
          connect doctors which are out of boundaries. A smart way to get answer
          to your health queries from a well experienced doctor online
        </p>
        <p className="my-6">
          Excellent medical platform to provide online doctor consultation
          connecting over 10 million users to over 100000 top doctors of the
          country. Every doctor go through a rigid verification process on{" "}
          <strong>drugcarts</strong>. Definetely you get best solution for your
          problems and queries by just one click. Visit our official website of{" "}
          <strong>drugcarts</strong> or download <strong>drugcarts</strong> app
          to consult doctor online. Within an hour, you will get perfect
          solution for your problem
        </p>

        <p className="font-bold my-6">
          Consult with verified doctors online personally:
        </p>
        <p className="my-6">
          Health information and personal information’s provided by person or
          patients during process of consultation will always confidential.
          Drugcarts assured you 100% privacy protection, as the data provided by
          the patients is most important and we at drugcarts stick to this.
          Patients during the Proceedings of consultation will remain
          confidential. Drugcarts assured you 100% privacy protection, as the
          data provided by the patients is most important and we at drugcarts
          stick to this. Patients need not to worry as all the data is protected
          and secured.
        </p>
        <p className="my-6">
          At <strong>drugcarts</strong>, we provide best medical assistance at
          comfortable prices. Since all conversation and consultations are
          completely confidential, hence you can share a complete history of
          your medical concerns to the doctor without any hesitation. Consult
          Specialized and experienced doctors online and get immediate medical
          response and solution for your health problems only at{" "}
          <strong>drugcarts.</strong>
        </p>

        <p className="font-bold my-6">
          Different mode of consultation with doctors online:
        </p>
        <p className="my-6">
          Nowadays technologies are filling the gap in requirements of
          healthcare. These technologies also help in providing quality
          treatment to patients living in rural areas of the country and may
          need medical attention.{" "}
        </p>
        <p className="my-6">
          These various modes of online consultation with doctors are available,
          which are purely safe, secured and comfortable.
        </p>
        <p className="my-6">
          At <strong>drugcarts</strong>, patients can connect with certified
          experienced doctors using these technologies. Here we are offering 3
          consultation modes to the patient to exchange health data records via
          text or chat, phone and video consultation to get medical assistant.
          Choice of technology for consultation is yours.{" "}
        </p>
        <p className=" my-6">
          You can select the best methods to connect doctor online and get
          healthcare requests to inform of - Audio call, video call, or text
          consultation. If first aid services or minor treatments, a text
          consultation works good and patients also probably statisfied. At{" "}
          <strong>drugcarts,</strong> all of these online consultations methods
          are the more affordable and effective method to see your doctor
        </p>

        <p className="font-bold my-6">
          How online doctor consultation process works at drugcarts?
        </p>
        <p className="my-6">
          Now consult with professional doctor online at drugcarts personally by
          following steps. Online doctor consultation process works very simple.
          Here are the steps to follow:
        </p>

        <p className="font-bold my-6">
          <strong>Step 1:</strong>
        </p>
        <p className="font-bold my-6">
          <strong>Selection of doctor:</strong>
        </p>
        <p className="my-6">
          You can select the doctor based on your problems and symptoms. You can
          also search doctor easily from search panel from anywhere. Always
          checkout doctor details before you select.
        </p>

        <p className="font-bold my-6">
          <strong>Step 2:</strong>
        </p>
        <p className="font-bold my-6">
          <strong>Select preffered consultation method:</strong>
        </p>
        <p className="my-6">
          After selecting a doctor, you can think about consultation mode, which
          is comfortable for you to share your problem clearly to doctor. In
          which case doctor understands your case better. Here 3 mode of
          communication are offered, you can communicate a doctor online through
          text, phone and video call
        </p>

        <p className="font-bold my-6">
          <strong>Step 3:</strong>
        </p>
        <p className="font-bold my-6">
          <strong>Explain the purpose of consultation in details:</strong>
        </p>
        <p className="my-6">
          Here you need to share about your basic details and information about
          yourself, which is only shown to the doctor as per guidelines. Tell
          out your problems and medical history all the details.
        </p>

        <p className="font-bold my-6">
          <strong>Step 4:</strong>
        </p>
        <p className="font-bold my-6">
          <strong>pay consultation fee online:</strong>
        </p>
        <p className="my-6">
          You can select the doctor based on your problems and symptoms. You can
          also search doctor easily from search panel from anywhere. Always
          checkout doctor details before you select.
        </p>

        <p className="font-bold my-6">
          <strong>Step 5:</strong>
        </p>
        <p className="font-bold my-6">
          <strong>Connect with doctor:</strong>
        </p>
        <p className="my-6">
          Get in connect with your doctor to get diagnosis and exact treatment
          for your condition
        </p>

        <p className="font-bold my-6">
          Refund policy on online doctor consultation:
        </p>
        <p className="font-bold my-6">
          We have refund policy on consultation at <strong>drugcarts</strong>.
          If a patient is not satisfied with this consultation, they can inform
          us through mail or review. We will analyse the consultation with the
          doctor for further clearance. 100% refund will be granted in genuine
          surroundings.
        </p>
        <p className="my-6">
          <strong>Drugcarts</strong> is the best choice for your Medical needs.{" "}
          <strong>Drugcarts</strong> is very simple and best service.
        </p>
      </div>
    </section>
  );
};

export default ClientSpecialty;
