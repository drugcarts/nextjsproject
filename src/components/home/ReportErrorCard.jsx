"use client"
import React from 'react'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { PostReportErrorService } from '@/services/reportErrorService';

function ReportErrorCard() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            country: "",
            subject: "",
        },
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PostReportErrorService(data, resetForm))
        },
    });

    return (
        <form className="bg-[#DAEAF7] p-3" onSubmit={formik.handleSubmit}>
            <h2 className="text-lg text-[#CA292C] py-3">Report on Error</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-[98%] p-1 rounded-md mb-3"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                required
            />
            <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                className="w-[98%] p-1 rounded-md mb-3"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email Id"
                className="w-[98%] p-1 rounded-md mb-3"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                required
            />
            <input
                type="text"
                name="countrycode"
                placeholder="Country"
                className="w-[98%] p-1 rounded-md mb-3"
                value={formik.values.country}
                onChange={formik.handleChange("country")}
                required
            />
            <textarea
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-[98%] p-1 rounded-md mb-3 h-24"
                value={formik.values.subject}
                onChange={formik.handleChange("subject")}
                required
            />
            <button
                type="submit"
                className="bg-[#1877F2] text-white p-2 px-6 mx-auto flex"
            >
                Report
            </button>
        </form>
    )
}


export default ReportErrorCard
