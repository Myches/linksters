'use client';


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Create() {
  const [error, setError] = useState<string>("");
  const { signUp } = useAuth();
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") as any, null], "Passwords must match")
      .required("Confirm Password is required"),
  });
 

 
  const handleSignUp = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError("");
    try {
      await signUp(values.email, values.password);
      console.log("User signed up successfully");

      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred during sign up");
      }
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full h-full md:w-[476px] md:h-[573px] bg-white flex flex-col justify-center items-center md:rounded-lg shadow-lg">
        <h1 className="flex justify-center items-center m-8">
          <Image src="/images/Group 252.svg" width={146} height={32} alt="logo" />
        </h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSignUp(values)}
        >
          <Form className="w-full max-w-md p-4 md:p-8">
            <h1 className="text-2xl md:text-[32px] text-gray-600 pb-2">
              Create Account
            </h1>
            <p className="text-sm md:text-[16px] text-gray-400">
              Let&apos;s get you started sharing your links
            </p>

            <div className="pt-4 text-xs md:text-[12px] text-gray-600 space-y-2">
              <label htmlFor="email">Email address</label>

              <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
                <span className="flex justify-center items-center">
                  <Image
                    src="/images/ph_envelope-simple-fill.svg"
                    width={16}
                    height={16}
                    alt="address logo"
                  />
                </span>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="eg. michael@gmail.com"
                  className="focus:outline-none text-black w-full text-[16px]"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error text-red-500 "
              />
            </div>

            <div className="pt-4 text-xs md:text-[12px] text-gray-600 space-y-2">
              <label htmlFor="password">Create Password</label>

              <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
                <span className="flex justify-center items-center">
                  <Image
                    src="/images/ph_lock-key-fill.svg"
                    width={16}
                    height={16}
                    alt="address logo"
                  />
                </span>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="focus:outline-none text-black w-full text-[16px]"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error text-red-500 "
              />
            </div>

            <div className="pt-4 text-xs md:text-[12px] text-gray-600 space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="p-2 w-full h-[48px] flex space-x-4 border rounded-lg">
                <span className="flex justify-center items-center">
                  <Image
                    src="/images/ph_lock-key-fill.svg"
                    width={16}
                    height={16}
                    alt="address logo"
                  />
                </span>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  className="focus:outline-none text-black w-full text-[16px]"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error text-red-500 "
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full h-[46px] bg-violet-600 text-white text-[16px] my-4 border rounded-lg"
            >
              Create your account
            </button>
            <h2 className="text-sm md:text-[16px] pt-2 flex justify-center items-center">
              Already have an account?{" "}
              <Link href="/" className="px-2 text-violet-600">
                Login
              </Link>
            </h2>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
