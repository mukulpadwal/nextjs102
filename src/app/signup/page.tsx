"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      formData.username.trim().length > 0 &&
      formData.email.trim().length &&
      formData.password.trim().length
    ) {
      setButtonDisabled(false);
    }
  }, [formData]);

  const handleSignUpUser = async () => {
    try {
      setButtonDisabled(true);

      const response = await axios.post("/api/users/signup", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
        setFormData({ ...formData });
      }

      setButtonDisabled(false);
    } catch (error: any) {
      console.log(`Error while resgistering user. Please try again...`);
      setButtonDisabled(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-10 px-5 sm:p-24">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl sm:text-7xl text-center">
          Create Your Account
        </h1>
        <div className="my-10 space-y-6">
          <div className="sm:flex sm:justify-end sm:items-center gap-x-2">
            <label className="w-1/2 inline-block" htmlFor="username">
              USERNAME :{" "}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
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
              placeholder="password"
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
              className="w-1/2 border rounded-lg text-center py-2 sm:py-2 hover:bg-slate-500"
              disabled={buttonDisabled}
              onClick={handleSignUpUser}
            >
              SIGNUP
            </button>
          </div>
          <div className="py-10 text-sm sm:text-base">
            <span>Already have a account. Go to</span>
            <Link
              className="underline underline-offset-2 rounded-lg my-2 p-2"
              href={"/login"}
            >
              LOGIN
            </Link>
            <span>page.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
