"use client";
import Image from "next/image";
import { useFormik } from "formik";
import { IMAGES } from "@/components/common/images";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { PostAddressService, DeleteAddressService, GetAddressIdService, GetUserAddressIdService } from '@/services/addressService';
import { useRouter } from "next/navigation";
import DeleteModal from "../admin/modal/DeleteModal";

const AddressUpload = () => {
  const { userAddress, addresses } = useSelector((state) => state.addressData)
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [type, setType] = useState('Home');
  const [activeTab, setActiveTab] = useState("add");
  const dispatch = useDispatch();
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      cus_name: "",
      type: type,
      lastname: "",
      email: "",
      lastname: "",
      phone: "",
      address: "",
      postcode: "",
      state: "",
      country: "",
      town: "",
    },
    onSubmit: async (data, { resetForm }) => {
      console.log(data);
      await dispatch(PostAddressService(data, resetForm))
    },
  });

useEffect(() => {
  if (!addresses || Object.values(addresses).length === 0) {
    setActiveTab("add");
  } else {
    setActiveTab("saved");
  }
}, [addresses]);
// console.log('userAddress', userAddress);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {/* Upload Prescription Section */}
        <div className="border p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <div className="flex border-b pb-2 mb-4">
                <button
                  className={`px-4 py-2 font-semibold rounded-md ${activeTab === "add"
                    ? "bg-pink-200 text-pink-700"
                    : "text-gray-600"
                    }`}
                  onClick={() => setActiveTab("add")}
                >
                  Add New Address
                </button>
                {userAddress.length !== 0? (
                  <button
                    className={`px-4 py-2 font-semibold rounded-md ${activeTab === "saved"
                      ? "bg-pink-200 text-pink-700"
                      : "text-gray-600"
                      }`}
                    onClick={() => setActiveTab("saved")}
                  >
                    Saved Address
                  </button>
                ) : null}
              </div>
              {activeTab === "add" && (
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border p-2 rounded w-full"
                      value={formik.values.cus_name}
                      onChange={formik.handleChange("cus_name")}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border p-2 rounded w-full"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="E-Mail Address"
                      className="border p-2 rounded w-full"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="border p-2 rounded w-full"
                      value={formik.values.phone}
                      onChange={formik.handleChange("phone")}
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Door no/Apart no/Street name"
                    className="border p-2 rounded w-full"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Postal Code"
                      className="border p-2 rounded w-full"
                      value={formik.values.postcode}
                      onChange={formik.handleChange("postcode")}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Town"
                      className="border p-2 rounded w-full"
                      value={formik.values.town}
                      onChange={formik.handleChange("town")}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="State"
                      className="border p-2 rounded w-full"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="border p-2 rounded w-full"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Type of Place
                    </label>
                    <div className="flex flex-wrap gap-4 mx-4">
                      <button
                        type="button"
                        className={`px-4 py-2 ${type === "Home" ? "bg-green-600 text-white" : "bg-gray-300 text-black"} rounded mr-2`}
                        onClick={() => {
                          setType('Home')
                          formik.setFieldValue("type", 'Home');
                        }}
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${type === "Office" ? "bg-green-600 text-white" : "bg-gray-300 text-black"} rounded mr-2`}
                        onClick={() => {
                          setType('Office')
                          formik.setFieldValue("type", 'Office');
                        }}
                      >
                        Office
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 ${type === "Others" ? "bg-green-600 text-white" : "bg-gray-300 text-black"} rounded mr-2`}
                        onClick={() => {
                          setType('Others')
                          formik.setFieldValue("type", 'Others');
                        }}
                      >
                        Others
                      </button>
                    </div>
                    <div className="flex justify-end my-3">
                      <button
                        type="submit"
                        className="w-40 bg-pink-700 text-white py-2 rounded mr-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {activeTab === "saved" ? (
                <>
                  <div className="text-start text-gray-600 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userAddress && userAddress?.map((addressItem, i) => (
                        <div
                          className={`border-2 p-3 ${addressItem?._id === addresses?._id ? "bg-[#EEFFE4]" : null} cursor-pointer`}
                          key={i}
                          onClick={() => dispatch(GetUserAddressIdService(addressItem?._id))}
                        >
                          <div className="flex justify-between">
                            <h2 className="font-semibold">Address {i + 1}</h2>
                            <button onClick={() => setSelectedAddressId(addressItem._id)}>
                              <DeleteIcon color="error" />
                            </button>
                            <DeleteModal
                              open={selectedAddressId === addressItem._id}
                              setOpen={() => setSelectedAddressId(null)}
                              title={"Delete Address"}
                              description={`Are you sure you want to delete Address ${i + 1} ?`}
                              onSubmit={async () => {
                                await dispatch(DeleteAddressService(addressItem._id));
                                await dispatch(GetAddressIdService(addressItem?.cus_id));
                                setSelectedAddressId(null);
                              }}
                            />
                          </div>
                          <p>
                            {addressItem?.cus_name} {addressItem?.lastname}, <br />
                            {addressItem?.phone},
                            <br />
                            {addressItem?.address},
                            <br />
                            {addressItem?.town},
                            <br />
                            {addressItem?.postcode},
                            <br />
                            {addressItem?.state},
                            <br />
                            {addressItem?.country}.
                            <br />
                            {addressItem?.type ? `(${addressItem?.type})` : null}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end my-3">
                    <button
                      type="submit"
                      className="w-40 bg-pink-700 text-white py-2 rounded mr-2"
                          disabled={!addresses || Object.values(addresses).length === 0}
                      onClick={() => router.push('/summary')}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {/* Valid Prescription Section */}
        <div className="flex border p-4 rounded-lg shadow-sm">
          <Image
            src={IMAGES.DELIVERYADDRESS}
            alt="address"
            className="w-[100%] mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default AddressUpload;
