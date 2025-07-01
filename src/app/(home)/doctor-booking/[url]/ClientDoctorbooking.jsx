"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  PostDoctorBookingService,
  GetDoctorNameUrlService,
} from "@/services/doctorService";

function ClientDoctorbooking() {
  const { profile } = useSelector((state) => state.profileData);
  const { doctor_name_url } = useSelector((state) => state.doctorData);
  const dispatch = useDispatch();
  const params = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doctor_name: doctor_name_url?.doctor_name || "",
      name: "",
      age: "",
      email: "",
      phone: profile?.phone || "",
      gender: "",
      city: "",
      date: "",
      time: "",
      payment_type: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("name is required"),
      email: yup.string().required("email is required"),
      age: yup.string().required("age is required"),
      phone: yup.string().required("phone is required"),
      gender: yup.string().required("gender is required"),
      city: yup.string().required("city is required"),
      date: yup.string().required("appoinment date is required"),
      time: yup.string().required("appoinment time is required"),
      payment_type: yup.string().required("payment options is required"),
    }),
    onSubmit: async (data, { resetForm }) => {
      await dispatch(PostDoctorBookingService(data, resetForm));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetDoctorNameUrlService(params?.url));
  }, [params?.url]);

  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="">
              <img
                src="https://assets3.drugcarts.com/colors/doctor-icon.png"
                alt="doctor"
                className="w-24 h-24"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">
                {doctor_name_url?.doctor_name}
              </h2>
              <p>
                <span className="font-medium">Specialist:</span>{" "}
                {doctor_name_url?.specialist_name}
              </p>
              <p>
                <span className="font-medium">Qualification:</span>{" "}
                {doctor_name_url?.qualification}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {doctor_name_url?.experience}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>🎓 3 year</p>
              <p>
                <span className="font-medium">Language:</span>{" "}
                {doctor_name_url?.language}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded text-center text-sm text-gray-700 border">
            <p className="font-semibold">
              Please share some basic info about yourself:
            </p>
            <p className="text-xs">
              (Required as per medical guidelines and visible only to the
              doctor)
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  className="ask-input"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block">Email</label>
                <input
                  name="email"
                  type="email"
                  className="ask-input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Phone</label>
                <input
                  name="phone"
                  type="number"
                  className="ask-input"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Age</label>
                <input
                  name="age"
                  type="number"
                  className="ask-input"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.age}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Gender</label>
                <select
                  name="gender"
                  className="ask-input"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">--Please Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.gender}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">City</label>
                <input
                  name="city"
                  type="text"
                  className="ask-input"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.city}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center text-sm text-gray-700 border">
              <p className="font-semibold">Appointment Details:</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Appointment Date
                </label>
                <input
                  name="date"
                  type="date"
                  className="ask-input"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.date}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Appointment Time
                </label>
                <input
                  name="time"
                  type="text"
                  className="ask-input"
                  placeholder="12:00pm"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.time && formik.errors.time && (
                  <p className="text-red-500 text-[12px] m-1">
                    {formik.errors.time}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center font-semibold pt-4">
              PAYMENT OPTIONS (Choose Any One)
            </div>
            <div className="flex flex-col md:flex-row gap-4 space-y-2">
              {[
                "Credit Card/ Debit Card/ Netbanking/ via [Pay U Money]",
                "UPI [Google Pay, Phone pe]",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment_type"
                    value={option}
                    checked={formik.values.payment_type === option}
                    onChange={formik.handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            {formik.touched.payment_type && formik.errors.payment_type && (
              <p className="text-red-500 text-[12px] m-1">
                {formik.errors.payment_type}
              </p>
            )}
            <div className="text-right">
              <button
                className="bg-bgcolor hover:bg-[#3b5998]/90 text-white font-semibold py-2 px-4 rounded"
                onClick={formik.handleSubmit}
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ClientDoctorbooking;
