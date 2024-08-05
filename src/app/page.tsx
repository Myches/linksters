'use client' ;

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuth } from "./context/authContext";
import { ColorRing } from 'react-loader-spinner';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Home() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError("");
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      setError("An error occurred during login. Please check your credentials and try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full h-full md:w-[476px] md:h-[573px] bg-white flex flex-col justify-center items-center md:rounded-lg shadow-lg">
        <h1 className="flex justify-center items-center m-8">
          <Image src="/images/Group 252.svg" width={146} height={32} alt="logo" />
        </h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSignIn(values)}
        >
          <Form className="w-full max-w-md p-4 md:p-8">
            <h1 className="text-2xl md:text-[32px] text-gray-600 pb-2">Login</h1>
            <p className="text-sm md:text-[16px] text-gray-400">Add your details below to get back into the app</p>

            <div className="pt-4 text-xs md:text-[12px] text-black space-y-2">
              <label htmlFor="email">Email address</label>
              <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
                <span className="flex justify-center items-center">
                  <Image src="/images/ph_envelope-simple-fill.svg" width={16} height={16} alt="address logo" />
                </span>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="eg. michael@gmail.com"
                  className="focus:outline-none text-black w-full text-[16px]"
                />
              </div>
              <ErrorMessage name="email" component="div" className="error text-red-800 " />
            </div>

            <div className="pt-4 text-xs md:text-[12px] text-gray-600 space-y-2">
              <label htmlFor="password">Password</label>
              <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
                <span className="flex justify-center items-center">
                  <Image src="/images/ph_lock-key-fill.svg" width={16} height={16} alt="address logo" />
                </span>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="focus:outline-none text-black w-full text-[16px]"
                />
              </div>
              <ErrorMessage name="password" component="div" className="error text-red-800 " />
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
                </div>
              ) : (
                'Login'
              )}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <h2 className="text-sm md:text-[16px] pt-2 flex justify-center items-center">
              Don&apos;t have an account?{" "}
              <Link href="/create" className="px-2 text-violet-600">
                Create account
              </Link>
            </h2>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
