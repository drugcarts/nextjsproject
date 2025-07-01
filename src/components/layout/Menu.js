"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Main menu toggle
  const [submenuOpen, setSubmenuOpen] = useState(null); // Submenu toggle
  const router = useRouter();

  return (
    <nav className="bg-white mt-5 text-black border-t-2 border-b-2 border-gray-100 font-[family-name:var(--font-poppins)] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          {/* Logo */}
          <div className="flex items-center ml-3">
            <Link href="/" className="text-md font-medium text-black">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <span>View Categories</span>{" "}
              </div>
            </Link>
          </div>

          {/* Main Menu (Desktop) */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-100">
              Home
            </Link>
            <Link
              href="/medicine"
              className="px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Medicine
            </Link>
            <div className="relative group">
              <button
                className="px-3 py-2 rounded-md hover:bg-gray-100"
                onClick={() => router.push("/ayush")}
              >
                Ayush
              </button>
              <div className="absolute z-50 left-0 mt-0 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40">
                <Link
                  href="/category/ayurvedic"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Ayurvedic
                </Link>
                <Link
                  href="/category/homeopathy"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Homeopathy
                </Link>
                <Link
                  href="/category/siddha"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Siddha
                </Link>
                <Link
                  href="/category/unani"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Unani
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-3 py-2 rounded-md hover:bg-gray-100">
                <Link href="/health-store">Health Care</Link>
              </button>
              <div className="absolute z-50 left-0 mt-0 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40">
                <Link
                  href="/category/blood-test-kit"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Blood Test Kit
                </Link>
                <Link
                  href="/category/covid-test-kit"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Covid Test Kit
                </Link>
                <Link
                  href="/category/diabetes-monitor"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Diabetes Monitor
                </Link>
                <Link
                  href="/category/fitness-equipment"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Fitness Equipment
                </Link>
                <Link
                  href="/category/hiv-test-kit"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  HIV Test Kit
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-3 py-2 rounded-md hover:bg-gray-100">
                <Link href="/health-store">Health Store</Link>
              </button>
              <div className="absolute z-50 left-0 mt-0 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40">
                <Link
                  href="/personal-care"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Personal Care
                </Link>
                <Link
                  href="/fitness-supplements"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Fitness Supplements
                </Link>
                <Link
                  href="/health-care-products"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Health Care Products
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-3 py-2 rounded-md hover:bg-gray-100">
                <Link href="/services">Services</Link>
              </button>
              <div className="absolute z-50 left-0 mt-0 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40">
                <Link
                  href="/medicine"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Order Medicines
                </Link>
                <Link
                  href="/nursing"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Nursing Attendances
                </Link>
                <Link
                  href="/physiotherapist"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Physiotherapy
                </Link>
                <Link
                  href="/covid-care"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Covid Care & Covid Protection
                </Link>
                <Link
                  href="/elder-care"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Elder Care
                </Link>
              </div>
            </div>
            <Link
              href="/lab-test"
              className="px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Lab
            </Link>
            <Link
              href="/specialty"
              className="px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Doctor
            </Link>
            <Link
              href="/scan"
              className="px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Scan
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />} */}
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-gray-200`}
      >
        <Link href="/" className="block px-4 py-2 hover:bg-white">
          Home
        </Link>
        <Link href="/medicine" className="block px-4 py-2 hover:bg-white">
          Medicine
        </Link>
        <Link
          href="#"
          className="block px-4 py-2 hover:bg-white"
          onClick={() =>
            setSubmenuOpen(submenuOpen === "ayush" ? null : "ayush")
          }
        >
          Ayush
        </Link>
        {submenuOpen === "ayush" && (
          <div className="m-2 space-y-1 bg-white">
            <Link
              href="/category/ayurvedic"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Ayurvedic
            </Link>
            <Link
              href="/category/homeopathy"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Homeopathy
            </Link>
            <Link
              href="/category/siddha"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Siddha
            </Link>
            <Link
              href="/category/unani"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Unani
            </Link>
          </div>
        )}
        <Link
          href="#"
          className="block px-4 py-2 hover:bg-white"
          onClick={() =>
            setSubmenuOpen(submenuOpen === "healthcare" ? null : "healthcare")
          }
        >
          Health Care
        </Link>
        {submenuOpen === "healthcare" && (
          <div className="m-2 space-y-1 bg-white">
            <Link
              href="/category/blood-test-kit"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Blood Test Kit
            </Link>
            <Link
              href="/category/covid-test-kit"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Covid Test Kit
            </Link>
            <Link
              href="/category/diabetes-monitor"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Diabetes Monitor
            </Link>
            <Link
              href="/category/fitness-equipment"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Fitness Equipment
            </Link>
            <Link
              href="/category/hiv-test-kit"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              HIV Test Kit
            </Link>
          </div>
        )}

        <Link
          href="#"
          className="block px-4 py-2 hover:bg-white"
          onClick={() =>
            setSubmenuOpen(submenuOpen === "healthstore" ? null : "healthstore")
          }
        >
          Health Store
        </Link>
        {submenuOpen === "healthstore" && (
          <div className="m-2 space-y-1 bg-white">
            <Link
              href="/personal-care"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Personal Care
            </Link>
            <Link
              href="/fitness-supplements"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Fitness Supplements
            </Link>
            <Link
              href="/health-care-products"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Health Care Products
            </Link>
          </div>
        )}

        <Link
          href="#"
          className="block px-4 py-2 hover:bg-white"
          onClick={() =>
            setSubmenuOpen(submenuOpen === "services" ? null : "services")
          }
        >
          Services
        </Link>
        {submenuOpen === "services" && (
          <div className="m-2 space-y-1 bg-white">
            <Link
              href="/medicine"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Order Medicines
            </Link>
            <Link
              href="/nursing"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Nursing Attendances
            </Link>
            <Link
              href="/physiotherapist"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Physiotherapy
            </Link>
            <Link
              href="/covid-care"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Covid Care & Covid Protection
            </Link>
            <Link
              href="/elder-care"
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Elder Care
            </Link>
          </div>
        )}

        <Link href="/lab-test" className="block px-4 py-2 hover:bg-white">
          Lab
        </Link>
        <Link href="/specialty" className="block px-4 py-2 hover:bg-white">
          Doctor
        </Link>
        <Link href="/scan" className="block px-4 py-2 hover:bg-white">
          Scan
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
