"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/authContext";
import { ColorRing } from 'react-loader-spinner';

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      setError("An error occurred during login. Please check your credentials and try again.");
    }finally {
      setLoading(false); 
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full h-full md:w-[476px] md:h-[573px] bg-white flex flex-col justify-center items-center md:rounded-lg shadow-lg">
        <h1 className="flex justify-center items-center m-8">
          <Image src="/images/Group 252.svg" width={146} height={32} alt="logo" />
        </h1>

        <form className="w-full max-w-md p-4 md:p-8" onSubmit={handleSignIn}>
          <h1 className="text-2xl md:text-[32px] text-gray-600 pb-2">Login</h1>
          <p className="text-sm md:text-[16px] text-gray-400">Add your details below to get back into the app</p>

          <div className="pt-4 text-xs md:text-[12px] text-black space-y-2">
            <label htmlFor="email">Email address</label>
            <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
              <span className="flex justify-center items-center">
                <Image src="/images/ph_envelope-simple-fill.svg" width={16} height={16} alt="address logo" />
              </span>
              <input
                type="email"
                id="email"
                placeholder="eg. michael@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none text-gray-400 w-full text-[16px]"
              />
            </div>
          </div>

          <div className="pt-4 text-xs md:text-[12px] text-gray-600 space-y-2">
            <label htmlFor="password">Password</label>
            <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
              <span className="flex justify-center items-center">
                <Image src="/images/ph_lock-key-fill.svg" width={16} height={16} alt="address logo" />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none text-gray-400 w-full text-[16px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[46px] bg-violet-600 text-white text-[16px] my-4 border rounded-lg"
          >
          {loading ? (

<div className='flex justify-center items-center'>
  <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="blocks-loading"
  colors={['#080808', '#D2D2D2', '#AAAAAA', '#BDBDBD', '#FFFFFFF']}
  
/>
</div> ) : (
              'Login'
            ) }
            
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <h2 className="text-sm md:text-[16px] pt-2 flex justify-center items-center">
            Don't have an account?{" "}
            <Link href="/create" className="px-2 text-violet-600">
              Create account
            </Link>
          </h2>
        </form>
      </div>
    </main>
  );
}
