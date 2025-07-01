'use client';
import { useState } from 'react';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { profile } = useSelector((state) => state.profileData)
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 min-h-screen">
        <ul className="space-y-4">
          <li className="bg-pink-600 text-white p-3 rounded-md">My Profile</li>
          <li className="p-3 cursor-pointer">My Order</li>
          <li className="p-3 cursor-pointer">My Address</li>
          <li className="p-3 cursor-pointer">My Prescription</li>
          <li className="p-3 cursor-pointer">My Lab Test</li>
          <li className="p-3 cursor-pointer">My Appointment</li>
          <li className="p-3 cursor-pointer">My Family</li>
          <li className="p-3 cursor-pointer">Health Records</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">My Account Information</h2>

        {/* Personal Information */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <button onClick={() => setEdit(!edit)} className="flex items-center gap-2">
              <EditLocationAltIcon /> {edit ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Full Nameddd" disabled={!edit} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Mobile Number" value={profile?.phone} disabled={true} className="border p-2 rounded w-full" />
            <input type="email" placeholder="E-Mail Address" disabled={!edit} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Gender" disabled={!edit} className="border p-2 rounded w-full" />
            <input type="date" placeholder="Date of Birth" disabled={!edit} className="border p-2 rounded w-full" />
            <input type="text" placeholder="Blood Group" disabled={!edit} className="border p-2 rounded w-full" />
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Address Details</h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded">+ Add Address</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Mobile Number" className="border p-2 rounded w-full" />
            <textarea placeholder="Address 1" className="border p-2 rounded w-full col-span-3"></textarea>
            <input type="text" placeholder="Pincode" className="border p-2 rounded w-full" />
            <input type="text" placeholder="Landmark" className="border p-2 rounded w-full" />
            <input type="text" placeholder="City" className="border p-2 rounded w-full" />
            <input type="text" placeholder="State" className="border p-2 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;