'use client';


import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";




export default function Profile (){

  const { profileInfo, setProfileInfo } = useAuth();


  const handleProfileChange = (field: keyof typeof profileInfo, value: string) => {
    setProfileInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileInfo(prev => ({ ...prev, profileImage: reader.result as string }));
        
      };
      reader.readAsDataURL(file);
    }
  }

    return (


        

        <div className=" h-full bg-white p-4  lg:ml-2 overflow-y-auto ">
            <h1 className="text-[32px] text-gray-700 font-bold">Profile Details</h1>
            <p className="text-[16px] text-gray-400">Add details to add a personal touch to your profile</p>

           <div className="bg-gray-200 lg:grid lg:grid-cols-3 grid grid-cols-1 w-full h-[233px] mt-4">
           <p className="text-[16px] text-gray-400 w[-[20%] flex justify-center items-center">Profile Picture</p>
          
            <div className=" bg-white flex-col flex justify-center items-center" style={{
            backgroundImage: profileInfo.profileImage ? `url(${profileInfo.profileImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} >
            <label htmlFor="profileImage" className="cursor-pointer">
      <div className="w-[32px] h-[32px] bg-violet-600 ml-8"></div>
  
      
          <p className="text-[16px] text-violet-600">+ Upload Image</p>
       
    </label>
    <input
      type="file"
      id="profileImage"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    /> 
</div>
             
     <p  className="text-[12px] text-gray-400 flex justify-center items-center p-4">image must be 1024px 1024px.Use PNG or JPG format </p>
            </div>
            
        <form className="bg-white pt-8  " >

<div className="pt-6 text-[12px] text-gray-600 flex space-x-12 flex justify-around items-center">
  <label htmlFor="firstName" className="text-[16px]">First Name</label>

  <div className="p-2 w-[432px] h-[48px] flex space-x-4 border rounded-lg">
    <span className="flex justify-center items-center">
      <Image src="/images/ph_envelope-simple-fill.svg" width={16} height={16} alt="address logo" />
    </span>
    <input
      type="text"
      id="firstName"
      value={profileInfo.firstName}
      onChange={(e) => handleProfileChange('firstName', e.target.value)}
      placeholder="eg. Michael"
     
      className="focus:outline-none text-gray-400 w-full text-[16px]"
    />
  </div>
</div>

<div className="pt-6 text-[12px] text-gray-600 flex space-x-12 flex justify-around items-center ">
  <label htmlFor="name" className="text-[16px]">Last Name</label>

  <div className="p-2 w-[432px] h-[48px] flex space-x-4 border rounded-lg">
    <span className="flex justify-center items-center">
      <Image src="/images/ph_lock-key-fill.svg" width={16} height={16} alt="address logo" />
    </span>
    <input
      type="text"
      id="lastName"
      value={profileInfo.lastName}
      onChange={(e) => handleProfileChange('lastName', e.target.value)}
      placeholder="eg. Blackson"
    
      className="focus:outline-none text-gray-400 w-full text-[16px]"
    />
  </div>
</div>

<div className="pt-6 text-[12px] text-gray-600 flex space-x-12  flex justify-around items-center">
  <label htmlFor="email"className="text-[16px]" >  Email </label>

  <div className="p-2  w-[432px] h-[48px] flex space-x-4 border rounded-lg ">
    <span className="flex justify-center items-center">
      <Image src="/images/ph_envelope-simple-fill.svg" width={16} height={16} alt="address logo" />
    </span>
    <input
      type="email"
      id="email"
        value={profileInfo.email}
        onChange={(e) => handleProfileChange('email', e.target.value)}
        placeholder="eg. michael@gmail.com"
      className="focus:outline-none text-gray-400 w-full text-[16px] "
    />
  </div>
</div>

</form>
        </div>

       
      
    )
}