"use client";

import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLoginUser = async () => {
    try {
      // Validate the user data
      setIsDisabled(true);
      if (
        formData.email.trim().length > 0 &&
        formData.password.trim().length > 0
      ) {
        const response = await axios.post("/api/users/login", formData);

        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Kindly provide both the fields...");
      }
      setIsDisabled(false);
    } catch (error: any) {
      console.log(`Error while loggin in user. Please try again later.`);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-10 px-5 sm:p-24">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl sm:text-7xl text-center">Login Page</h1>

        <div className="my-10 space-y-6">
          <div className="sm:flex sm:justify-end sm:items-center gap-x-2">
            <label className="w-1/2 inline-block" htmlFor="email">
              EMAIL :{" "}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="sm:flex sm:justify-end sm:items-center gap-x-2">
            <label className="w-1/2 inline-block" htmlFor="password">
              PASSWORD :{" "}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*************"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div>
          <div className="w-full flex justify-center items-center my-6">
            <button
              disabled={isDisabled}
              className="w-1/2 border rounded-lg text-center py-2 sm:py-2 hover:bg-slate-500"
              onClick={handleLoginUser}
            >
              Login
            </button>
          </div>
          <div className="py-10 text-sm sm:text-base">
            <span>Do not have an account. Go to</span>
            <Link
              className="underline underline-offset-2 rounded-lg my-2 p-2"
              href={"/signup"}
            >
              Create an account
            </Link>
            page.
          </div>
        </div>
      </div>
    </main>
  );
}
