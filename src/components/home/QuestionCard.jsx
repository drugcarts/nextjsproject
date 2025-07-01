import React from 'react'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { PostQuestionService } from '@/services/questionService';

function QuestionCard() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            question: "",
        },
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PostQuestionService(data, resetForm))
        },
    });

    return (
        <div className="border-2 border-gray-300 p-4 rounded-md">
            <h2 className="font-bold text-center m-2 text-xl">
                How You Question ?
            </h2>
            <form className="bg-[#D5F1C3] p-4" onSubmit={formik.handleSubmit}>
                <p className="text-sm py-5">
                    Although we strive to provide the most up-to-date
                    information about our products and services
                </p>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="p-2 w-[100%] mb-3"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    required
                />
                <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile"
                    className="p-2 w-[100%] mb-3"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    className="p-2 w-[100%] mb-3"
                    required
                />
                <textarea
                    type="text"
                    name="question"
                    placeholder="Question"
                    className="p-2 w-[100%] mb-3 h-24"
                    value={formik.values.question}
                    onChange={formik.handleChange("question")}
                    required
                />
                <button
                    type="submit"
                    className="flex mx-auto grid bg-[#4CAF50] p-2 px-10 text-white rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default QuestionCard