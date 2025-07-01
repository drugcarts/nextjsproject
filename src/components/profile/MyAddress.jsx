'use client';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import {
  PostAddressService,
  DeleteAddressService,
  GetAddressIdService,
  GetUserAddressIdService
} from '@/services/addressService';
import DeleteModal from "../admin/modal/DeleteModal";

function MyAddress() {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { userAddress, addresses } = useSelector((state) => state.addressData);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <div className="text-start text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userAddress && userAddress.map((addressItem, i) => (
            <div
              key={addressItem._id}
              className={`border-2 p-4 rounded-md shadow-sm hover:shadow-md transition duration-200 ${
                addressItem?._id === addresses?._id ? "bg-[#EEFFE4]" : ""
              } cursor-pointer`}
              onClick={() => dispatch(GetUserAddressIdService(addressItem?._id))}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Address {i + 1}</h2>
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

              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                {addressItem?.cus_name} {addressItem?.lastname},<br />
                {addressItem?.phone},<br />
                {addressItem?.email},<br />
                {addressItem?.address},<br />
                {addressItem?.town},<br />
                {addressItem?.postcode},<br />
                {addressItem?.state},<br />
                {addressItem?.country}.<br />
                ({addressItem?.type})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyAddress;
