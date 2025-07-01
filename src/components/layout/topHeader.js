"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IMAGES } from "@/components/common/images";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SearchBar from "../common/SearchBar";
import { GetSendFeedbackListService } from "@/services/sendFeebackService";
import LogoutModal from "@/components/common/LogoutModal";
import { setMenuTab } from "@/reduxToolkit/slices/commonSlice";

const TopHeader = () => {
  const { items } = useSelector((state) => state.cartData);
  const router = useRouter();
  const { profile } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    dispatch(GetSendFeedbackListService(1, 4));
  }, []);

  const logout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("cart");
    window.location.href = "/";
  };

  return (
    <>
      <section className="mt-3 px-5 md:px-16">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/6">
            <div className="flex justify-center items-center">
              <Image
                priority
                src={IMAGES.DRUGLOGO}
                alt="Logo"
                className="w-40"
              />
            </div>
          </div>
          <div className="w-full md:w-3/6 my-5 md:my-0">
            <SearchBar />
          </div>
          <div className="w-full md:w-2/6 lg:w-3/3">
            <div className="flex justify-center items-center gap-10">
              <div className="flex">
                <div className="relative" onClick={() => router.push("/cart")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-black mt-1 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {items?.length > 0 && (
                    <div className="absolute top-0 right-0 left-8 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                      {items?.length}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative inline-block">
                  {/* User Profile Button */}
                  {profile?.username ? (
                    <>
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center bg-bgcolor py-1 px-2 rounded-lg text-white hover:text-white hover:bg-green-600 transition"
                      >
                        <AccountCircleIcon className="text-white" />
                        &nbsp; {profile?.username}
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-40">
                          <ul className="text-gray-700">
                            <li
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await router.push("/profile");
                                dispatch(setMenuTab("profile"));
                                setIsOpen(false);
                              }}
                            >
                              Profile
                            </li>
                            <li
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await router.push("/profile");
                                dispatch(setMenuTab("orders"));
                                setIsOpen(false);
                              }}
                            >
                              Orders
                            </li>
                            <li
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await router.push("/profile");
                                dispatch(setMenuTab("prescription"));
                                setIsOpen(false);
                              }}
                            >
                              Prescription
                            </li>
                            <li
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await router.push("/profile");
                                dispatch(setMenuTab("refills"));
                                setIsOpen(false);
                              }}
                            >
                              Refills
                            </li>
                            <li
                              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await router.push("/profile");
                                dispatch(setMenuTab("appointment"));
                                setIsOpen(false);
                              }}
                            >
                              Appointments
                            </li>
                            <li
                              className="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                              onClick={() => setIsLogout(true)}
                            >
                              Logout
                            </li>
                          </ul>
                          <LogoutModal
                            open={isLogout}
                            onClose={() => setIsLogout(false)}
                            onConfirm={logout}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                      <Link
                        href="/login"
                        className="flex items-center bg-bgcolor py-1 px-2 rounded-lg text-white  hover:text-white hover:bg-green-600 transition"
                      >
                        <LockOpenIcon className="text-white" />
                        &nbsp; Login
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link
                        href="/register"
                        className="flex items-center bg-bgcolor py-1 px-2 rounded-lg text-white hover:text-white hover:bg-green-600 transition"
                      >
                        <AccountCircleIcon className="text-white" />
                        &nbsp; Signup
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="flex justify-center items-center">
                <h2 className="text-md text-center">English</h2>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopHeader;
