"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Loginbanner from "@/assets/common/loginbanner.png";
import { useDispatch, useSelector } from "react-redux";
import { sendOTPService } from "@/services/userService";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      dispatch(sendOTPService(data, router));
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 justify-center">
        <div className="justify-self-center p-5 md:order-none order-2">
          <Image src={Loginbanner} alt="Login Banner" className="w-full" />
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-8">
            {/* Logo */}
            <div className="flex justify-center mb-10">
              <Image
                src={IMAGES.DRUGLOGO}
                alt="Drugcarts Logo"
                className="h-24"
              />
            </div>

            {/* Login Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
              Log in
            </h2>
            <p className="text-sm text-gray-600 text-left mb-6">
              Please enter your login details
            </p>

            {/* Input Field */}
            <div>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-bold text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formik.values.phone}
                  onChange={formik.handleChange("phone")}
                  placeholder="Enter your mobile number"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-red-600">
                  {formik.touched.phone ? formik.errors.phone : null}
                </p>
              </div>

              {/* Keep Me Logged In */}
              <div className="flex items-center mb-4">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Keep me logged in
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-bgcolor text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition"
                onClick={formik.handleSubmit}
              >
                Log in
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Do you have any account?{" "}
                <a href="/register" className="text-bgcolor hover:underline">
                  Sign up
                </a>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-6 border-t border-gray-300 pt-4 text-center">
              <p className="text-sm text-gray-600 mb-3">or continue with</p>
              <div className="flex justify-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-6 h-6 rounded-full shadow-md hover:bg-gray-200 transition"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-6 h-6 rounded-full shadow-md hover:bg-gray-200 transition"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="w-6 h-6 rounded-full shadow-md hover:bg-gray-200 transition"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#03a9f4"
                    d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12"
                  ></path>
                </svg>
                {/* <button className="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition">
              <img src="/google-icon.svg" alt="Google" className="h-6 w-6" />
            </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
