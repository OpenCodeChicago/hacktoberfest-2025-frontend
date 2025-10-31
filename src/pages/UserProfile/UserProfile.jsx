import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import Loader from '../../components/Loader';
import { getDisplayName, getDisplayEmail } from '../../utils/authHelpers';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || null;
  const name = getDisplayName(user);
  const email = getDisplayEmail(user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // redirect if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-normal gap-y-10 py-7 px-20 sm:px-50 ">
      <div className="w-full flex items-center justify-between gap-2">
        <h1 className="text-3xl font-[600] font-inter">Profile</h1>
        <button
          className=" px-3 sm:px-15 py-3 border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-200 font-inter"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-xl py-3 px-5">
        <h2 className="font-medium text-center sm:text-left text-xl mb-4 font-montserrat">
          {name}
        </h2>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-40 justify-center items-center sm:items-start sm:justify-start mb-2">
          <div>
            <p className="text-gray-400 font-montserrat ">Email:</p>
            <p className="font-montserrat">{email}</p>
          </div>
          <div>
            <p className="text-gray-400 font-montserrat text-center">
              Phone Number:
            </p>
            <p>{/* {freshUser?.phonenumber || `Not Provided`} */}</p>
          </div>
        </div>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-xl py-3 px-5">
        <h2 className="font-medium text-xl mb-4 font-montserrat text-center sm:text-left">
          Address
        </h2>
        <div className="flex flex-col gap-1 mb-2 items-center justify-center sm:items-start sm:justify-start">
          <p className="text-gray-400 font-montserrat">Default Address</p>
          <p className="font-montserrat">{/* {freshUser.name} */}</p>
          <p className="font-montserrat text-center sm:text-left">
            {/* {freshUser?.firstline || `Not Provided`} */}
          </p>
          <p className="font-montserrat text-center sm:text-left">
            {/* {freshUser?.secondline || `Not Provided`} */}
          </p>
          <p className="font-montserrat">
            {/* {freshUser?.country || `Not Provided`} */}
          </p>
          <p>{/* {freshUser?.phonenumber || `Not Provided`} */}</p>
        </div>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-xl py-3 px-5 ">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-end gap-10 mb-2">
          <div>
            <h2 className="font-medium text-xl text-center mb-2 font-montserrat">
              Adding a payment method for subscription orders?
            </h2>
            <p className="font-montserrat text-center">
              Once you've added the payment you want to use, assign it to your
              subscriptions.
            </p>
          </div>
          <div>
            <button className="text-white bg-blue-900 p-4 rounded-xl cursor-pointer hover:bg-blue-800 font-inter">
              Assign a payment method to subscriptions
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <hr className="mb-2 text-gray-400" />
        <h1 className="font-bold text-3xl mb-10 font-inter">DISCLAIMER</h1>
        <p className="font-medium text-xl mb-20 font-inter">
          ⚠️ Core<span className="text-red-600">X</span> Nutrition is a
          community open-source project. The site does not sell or deliver
          products. All content is for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
