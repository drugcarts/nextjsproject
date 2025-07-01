'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { PostSendFeedbackService } from '@/services/sendFeebackService';

const questions = [
    "Quality of Medicine",
    "Quality of Service",
    "Friendliness of Staff",
    "Speed of Service",
    "Appearance of Staff",
    "Value of Money",
    "Quality of Delivery",
    "Uses of Product"
];

const ratings = ["Excellent", "Good", "Average", "Poor"];

const ratingToScore = {
    Excellent: 5,
    Good: 4,
    Average: 3,
    Poor: 1
};

const scoreToText = (avg) => {
    if (avg < 2) return "1";
    if (avg < 3) return "2";
    if (avg < 4) return "3";
    if (avg < 4.7) return "4";
    return "5";
};

const scoreToTextStatus = (avg) => {
    if (avg < 2) return "Worst";
    if (avg < 3) return "Bad";
    if (avg < 4) return "Average";
    if (avg < 4.7) return "Good";
    return "Excellent";
};

const scoreToTextColor = (avg) => {
    if (avg < 2) return "text-red-700";
    if (avg < 3) return "text-orange-500";
    if (avg < 4) return "text-yellow-400";
    if (avg < 4.7) return "text-green-400";
    return "text-green-700";
};


export default function CustomerReviewForm() {
    const { profile } = useSelector((state) => state.profileData)
    const [overall, setOverall] = useState("");
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            comments: "",
            ...Object.fromEntries(questions.map(q => [q, ""])),
            rating: overall || "",
            username: profile?.username || "",
            picture: profile?.picture || ""
        },
        validationSchema: Yup.object({
            comments: Yup.string()
                .min(100, "Minimum 100 characters allowed")
                .required("Comments are required"),
            ...Object.fromEntries(questions.map(q => [q, Yup.string().required("Required")]))
        }),
        onSubmit: async (values, {resetForm}) => {
            const selectedScores = questions.map(q => ratingToScore[values[q]]);
            const avg = selectedScores.reduce((a, b) => a + b, 0) / selectedScores.length;
            setOverall(scoreToText(avg));
            let saveData = {
                comments: values?.comments,
                rating: scoreToText(avg),
                ratingStatus: scoreToTextStatus(avg),
                username: values?.username,
                picture: values?.picture
            }
            await dispatch(PostSendFeedbackService(saveData, resetForm))
        },
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">Customer Review</h2>
            {overall && <p className="text-center mb-6">Thank you for choosing us. Your feedback helps us improve!</p>}

            <form onSubmit={formik.handleSubmit}>
                <table className="w-full table-auto border-collapse mb-6">
                    <thead>
                        <tr>
                            <th className="text-left text-sm text-gray-600">Question</th>
                            {ratings.map((rate) => (
                                <th key={rate} className="text-center text-sm text-gray-600">{rate}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => (
                            <tr key={question} className="border-t">
                                <td className="py-2 text-sm">{question}</td>
                                {ratings.map((rate) => (
                                    <td key={rate} className="text-center">
                                        <label className="inline-flex items-center justify-center w-6 h-6 border rounded cursor-pointer transition-all hover:bg-pink-100">
                                            <input
                                                type="radio"
                                                name={question}
                                                value={rate}
                                                onChange={formik.handleChange}
                                                checked={formik.values[question] === rate}
                                                className="hidden peer"
                                            />
                                            <div className="w-4 h-4 border-2 border-gray-400 rounded peer-checked:bg-pink-600 peer-checked:border-pink-600" />
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {questions.map(q => formik.touched[q] && formik.errors[q] && (
                    <div key={q} className="text-sm text-red-500 mb-1">{q}: {formik.errors[q]}</div>
                ))}

                <div className="mb-6">
                    <label className="block mb-1 font-semibold">Any Other Comments or Suggestions</label>
                    <textarea
                        name="comments"
                        className="w-full border p-2 rounded"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comments}
                    />
                    {formik.touched.comments && formik.errors.comments && (
                        <div className="text-sm text-red-500">{formik.errors.comments}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 transition"
                >
                    Submit Review
                </button>
            </form>

            {overall && (
                <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold text-gray-700">Overall Rating</h3>
                    <p className={`text-3xl mt-2 font-bold ${scoreToTextColor(overall)}`}>{scoreToTextStatus(String(overall))}</p>
                </div>
            )}
        </div>
    );
}
