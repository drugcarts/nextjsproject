import React from 'react'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { PostTextFeedbackService } from '../../services/textFeedbackService';

function TextFeedback() {
    const { profile } = useSelector((state) => state.profileData)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: profile?.username || "",
            phone: profile?.phone || "",
            useremail: profile?.useremail || "",
            phone: profile?.phone || "",
            address: "",
            discount: "2",
        },
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PostTextFeedbackService(data, resetForm))
        },
    });
    return (
        <div>
            <h3 className="text-md font-semibold mb-2">Text Feedback (Get 2% extra discount on next order)</h3>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    placeholder=""
                    className="border-2 p-2 rounded w-full h-80"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-pink-700 text-white py-2 px-4 text-center rounded my-4"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TextFeedback