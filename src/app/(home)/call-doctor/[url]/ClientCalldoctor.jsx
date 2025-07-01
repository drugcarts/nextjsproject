"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  PostCallDoctorService,
  GetDoctorNameUrlService,
} from "@/services/doctorService";

const ClientCalldoctor = () => {
  const { profile } = useSelector((state) => state.profileData);
  const { doctorUrl, doctor_name_url } = useSelector(
    (state) => state.doctorData
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doctor_name: doctor_name_url?.doctor_name || "",
      customer_phone: profile?.phone,
      customer_name: profile?.username || "",
      consult_type: "Call Doctor",
      reason: "",
      payment_type: "",
    },
    validationSchema: yup.object({
      reason: yup.string().required("reason type is required"),
      payment_type: yup.string().required("payment_type is required"),
    }),
    onSubmit: async (data, { resetForm }) => {
      await dispatch(PostCallDoctorService(data, resetForm));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetDoctorNameUrlService(params?.url));
  }, [params?.url]);

  // useEffect(() => {
  //     if (Object.values(profile).length === 0) {
  //         router.push(`/login`)
  //     }
  // }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          This call is for in-person appointment related enquiries. What’s the
          reason for your in-person visit?
        </h2>
        <div className="space-y-2 mb-4">
          {["Consultation", "Follow up"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value={option}
                checked={formik.values.reason === option}
                onChange={formik.handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="text-center font-medium text-gray-600 my-4">OR</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {[
            "Abnormal Behavior Treatment",
            "ADHD Counselling",
            "Adult Treatment",
            "Anger Management",
            "Autism Treatment",
            "Stress Treatment",
          ].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="reason"
                value={option}
                checked={formik.values.reason === option}
                onChange={formik.handleChange}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">
              PAYMENT OPTIONS (Choose Any One)
            </span>
            <span className="text-sm">
              Amount Payable: <strong>₹{doctor_name_url?.consult_fees}</strong>
            </span>
          </div>

          <div className="space-y-2">
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
        </div>

        <div className="text-right mt-6">
          <button
            onClick={formik.handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!formik.values.reason || !formik.values.payment_type}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCalldoctor;
