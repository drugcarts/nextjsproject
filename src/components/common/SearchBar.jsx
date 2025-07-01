"use client";
import { useState, useEffect, useRef } from "react";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useDispatch, useSelector } from "react-redux";
import { GetProductNameService } from "@/services/productService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PincodeModal from "@/components/common/PincodeModal";
import { IMAGES } from "@/components/common/images";

export default function SearchBar() {
  const { postalCode } = useSelector((state) => state.locationData);
  const { productName } = useSelector((state) => state.productData);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProductNameService(1, 10, query));
    if (query) {
      setSuggestions(productName?.products);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Hide on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative max-w-3xl w-full">
      <div className="flex items-center rounded-full border border-gray-300 shadow-sm overflow-hidden bg-white">
        {/* Pincode Section */}
        <div
          className="bg-[#bf0d47] text-white px-4 py-2 flex items-center gap-2 min-w-[120px] rounded-l-full cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <AddLocationIcon size={14} />
          <span className="font-normal text-[14px]">
            {Object.values(postalCode).length !== 0
              ? postalCode?.pincode
              : "Pincode"}
          </span>
        </div>
        {showModal && <PincodeModal onClose={() => setShowModal(false)} />}
        {/* Input */}
        <input
          type="text"
          placeholder="Search For Your Medicine"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
        />

        {/* Search Icon */}
        <div className="px-4 text-gray-500">
          <SavedSearchIcon />
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {suggestions?.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions?.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setQuery(item?.product_name);
                router.push(`/product/${item?.url}`);
                setSuggestions([]);
              }}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center"
            >
              <img
                src={`https://drugcarts-nextjs.s3.ap-south-1.amazonaws.com/${item?.product_img}`}
                alt={item?.product_name}
                className="w-6 h-6"
                width={100}
                height={100}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://assets2.drugcarts.com/${item?.product_img}`;
                }}
              />
              <p className="ml-3">{item?.product_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
