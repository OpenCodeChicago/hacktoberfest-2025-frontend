import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Loader from '../Loader';

const UserProfile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [freshUser, setFreshUser] = useState(user);

    useEffect(() => {
        async function fetchUser() {
        try {
            const res = await axiosInstance.get("/auth/profile");
            setFreshUser(res.data.user || res.data);
        } catch (error){
            console.log("Failed to fetch user:", error);
        }
    }

        if (token) 
            fetchUser();
    }, [token]);

    if (!freshUser) 
        return <Loader />;
    return (
        <div className=' w-full min-h-screen flex flex-col items-center justify-normal gap-y-10 py-7 px-20 sm:px-50 '>
            <div className='w-full flex items-center justify-between gap-2'>
                <h1 className='text-3xl font-[600] font-inter'>Profile</h1>
                <button className=' px-3 sm:px-15 py-3 border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-200 font-inter'>Logout</button>
            </div>
            <div className='w-full border-2 border-gray-300 rounded-xl py-3 px-5'>
                <h2 className='font-medium text-center sm:text-left text-xl mb-4 font-montserrat'>{user.name}</h2>
                <div className='flex flex-col sm:flex-row gap-5 sm:gap-40 justify-center items-center sm:items-start sm:justify-start mb-2'>
                    <div>
                        <p className='text-gray-400 font-montserrat '>Email:</p>
                        <p className='font-montserrat'>{user.email}</p>
                    </div>
                    <div>
                        <p className='text-gray-400 font-montserrat text-center'>Phone Number:</p>
                        <p>+1 123-456-7788</p>
                    </div>
                </div>
            </div>
            <div className='w-full border-2 border-gray-300 rounded-xl py-3 px-5'>
                <h2 className='font-medium text-xl mb-4 font-montserrat text-center sm:text-left'>Address</h2>
                <div className='flex flex-col gap-1 mb-2 items-center justify-center sm:items-start sm:justify-start'>
                    <p className='text-gray-400 font-montserrat'>Default Address</p>
                    <p className='font-montserrat'>{user.name}</p>
                    <p className='font-montserrat text-center sm:text-left'>1234 N Main St.</p>
                    <p className='font-montserrat text-center sm:text-left'>Chicago, Il 60607</p>
                    <p className='font-montserrat'>United States</p>
                    <p>+1 123-456-7788</p>
                </div>
            </div>
            <div className='w-full border-2 border-gray-300 rounded-xl py-3 px-5 '>
                <div className='flex flex-col sm:flex-row items-center justify-center sm:items-end gap-10 mb-2'>
                    <div>
                        <h2 className='font-medium text-xl text-center mb-2 font-montserrat'>Adding a payment method for subscription orders?</h2>
                        <p className='font-montserrat text-center'>Once you've added the payment you want to use, assign it to your subscriptions.</p>
                    </div>
                    <div>
                        <button className='text-white bg-blue-900 p-4 rounded-xl cursor-pointer hover:bg-blue-800 font-inter'>Assign a payment method to subscriptions</button>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <hr className='mb-2 text-gray-400' />
                <h1 className='font-bold text-3xl mb-10 font-inter'>DISCLAIMER</h1>
                <p className='font-medium text-xl mb-20 font-inter'>⚠️ Core<span className='text-red-600'>X</span> Nutrition is a community open-source project. The site does not sell or deliver products. All content is for demonstration purposes only.</p>
            </div>
        </div>
    )
}

export default UserProfile