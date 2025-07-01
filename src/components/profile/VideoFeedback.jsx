import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { PostVideoFeedbackService } from '../../services/videoFeedbackService';
import VideoInput from "@/components/admin/input/VideoInput";

function VideoFeedback() {
    const { profile } = useSelector((state) => state.profileData)
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: profile?.username || "",
            phone: profile?.phone || "",
            useremail: profile?.useremail || "",
            phone: profile?.phone || "",
            uploadvideo: "",
            discount: "4",
        },
        validationSchema: yup.object({
            uploadvideo: yup.string().required("Video is required"),
        }),
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PostVideoFeedbackService(data, resetForm))
        },
    });

    const handleVideo = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("uploadvideo", file.name);
    };

    return (
        <div>
            <h3 className="text-md font-semibold mb-2">Text Feedback (Get 4% extra discount on next order)</h3>
            <form onSubmit={formik.handleSubmit}>
                <VideoInput
                    title={""}
                    fileName={formik.values.uploadvideo}
                    onChange={handleVideo}
                    error={
                        formik.touched.uploadvideo
                            ? formik.errors.uploadvideo
                            : null
                    }
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

export default VideoFeedback