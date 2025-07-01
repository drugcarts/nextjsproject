"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import QuickreplyIcon from "@mui/icons-material/Quickreply";
import RecommendIcon from "@mui/icons-material/Recommend";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { PostContacUsService } from "@/services/contactService";

const options = [
  { id: "medicine", label: "Medicine" },
  { id: "doctorconsult", label: "Doctor Consult" },
  { id: "labtest", label: "Lab Test" },
  { id: "service", label: "Drugcarts Service" },
  { id: "partnership", label: "Partnership" },
  { id: "other", label: "Other" },
];

const ClientContactus = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      type: [],
      message: "",
    },
    onSubmit: async (data, { resetForm }) => {
      await dispatch(PostContacUsService(data, resetForm));
    },
  });

  const handleCheckboxChange = (id) => {
    formik.setFieldValue(
      "type",
      formik.values.type.includes(id)
        ? formik.values.type.filter((item) => item !== id)
        : [...formik.values.type, id]
    );
  };

  return (
    <section className="max-w-7xl mt-3 mx-auto">
      <div className="flex flex-wrap justify-center items-center bg-[#117DA6]">
        <div className="w-full md:w-1/2 text-center px-6 py-4">
          <p className="text-xl text-white">
            Drugcarts bringing all the service in a single digital platform
            connecting multiple services in just one touch of click
          </p>
          <button className="bg-[#51B015] py-2 px-4 text-white mt-5 rounded-lg font-bold">
            Contact Us
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            priority
            src={IMAGES.CONTACTUS24}
            alt="Ayush Banner"
            className="w-[70%] h-[300px] rounded-lg p-6 mx-auto"
          />
        </div>
      </div>
      <div className="bg-[#F0F5FF] my-4">
        <div className="text-center py-6">
          <h2 className="text-md md:text-xl font-bold">Contact Information</h2>
          <p className="text-sm">
            People can buy and send medicines from any corner of the country
            with just a few clicks of the mouse.{" "}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-2/5">
            <div className="bg-white p-3 m-4 rounded-md">
              <div className="flex justify-center items-center">
                <div className="w-[30%] flex">
                  <PermPhoneMsgIcon
                    style={{ fontSize: "70px" }}
                    className="mx-auto text-violet-950"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-xl font-bold">Phone Number</h2>
                  <h3 className="text-md">+91 99206 11567</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 m-4 rounded-md">
              <div className="flex justify-center items-center">
                <div className="w-[30%] flex">
                  <ContactMailIcon
                    style={{ fontSize: "70px" }}
                    className="mx-auto text-violet-950"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-xl font-bold">E-Mail Address</h2>
                  <h3 className="text-md">drugcartspro@gmail.com</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 m-4 rounded-md">
              <div className="flex justify-center items-center">
                <div className="w-[30%] flex">
                  <ContactSupportIcon
                    style={{ fontSize: "70px" }}
                    className="mx-auto text-violet-950"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-xl font-bold">Inquiry</h2>
                  <h3 className="text-md">+91 99206 11567</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 m-4 rounded-md">
              <div className="flex justify-center items-center">
                <div className="w-[30%] flex">
                  <QuickreplyIcon
                    style={{ fontSize: "70px" }}
                    className="mx-auto text-violet-950"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-xl font-bold">Chat with Us</h2>
                  <h3 className="text-md">Speak To Our Friendly Team</h3>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 m-4 rounded-md">
              <div className="flex justify-center items-center">
                <div className="w-[30%] flex">
                  <RecommendIcon
                    style={{ fontSize: "70px" }}
                    className="mx-auto text-violet-950"
                  />
                </div>
                <div className="w-[70%]">
                  <h2 className="text-xl font-bold">Support</h2>
                  <h3 className="text-md">support@drugcarts.com</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <div className="bg-white p-3 m-4 rounded-md">
              <h1 className="font-bold text-md md:text-xl">
                LETS GET IN TOUCH
              </h1>
              <h3>Drop Us A Message!</h3>
              <div className="mx-auto bg-white py-4">
                <form className="space-y-4 mt-4" onSubmit={formik.handleSubmit}>
                  {/* Checkbox Group */}
                  <div className="mx-auto bg-white py-4">
                    <div className="flex flex-wrap gap-4 md:gap-0 justify-center items-center text-md">
                      {options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formik.values.type.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                          />
                          <div
                            className={`w-6 h-6 flex items-center justify-center border-2 rounded-md transition-all ${
                              formik.values.type.includes(option.id)
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-400"
                            }`}
                          >
                            {formik.values.type.includes(option.id) && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-800 text-xs">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="max-w-lg mx-auto p-6">
                    <label className="block font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                      placeholder="Enter your name"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      required
                    />
                    <label className="block font-medium text-gray-700 mt-3">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                      placeholder="Enter your phone number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      required
                    />
                    <label className="block font-medium text-gray-700 mt-3">
                      Email ID
                    </label>
                    <input
                      type="mail"
                      name="email"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                      placeholder="Enter your Mail ID"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      required
                    />
                    <label className="block font-medium text-gray-700 mt-3">
                      Message
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                      placeholder="Enter your message"
                      value={formik.values.message}
                      onChange={formik.handleChange("message")}
                      required
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 mt-6 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </form>

                {/* Selected Items Display */}
                {/* <div className="mt-4 text-gray-600">
                                    <p className="font-medium">Selected:</p>
                                    {selected.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {selected.map((id) => (
                                                <li key={id}>{options.find((o) => o.id === id)?.label}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No options selected</p>
                                    )}
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#4C4C95] my-4 px-4 md:px-0">
        <div className="text-center py-3">
          <p className="text-sm text-white">
            For enquiries, bookings or support and other details give a missed
            call <span className="text-orange-300">@ +91 9920611567</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientContactus;
