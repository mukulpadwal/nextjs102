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

  const handleLoginUser = async () => {
    try {
      // Validate the user data
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
    } catch (error: any) {
      console.log(`Error while loggin in user. Please try again later.`);
      toast.error(error.message);
    }
  };

  return (
    <main className="w-full h-auto p-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-screen">
        <h1 className="text-center text-3xl md:text-5xl">Login Page</h1>
        <div className=" my-10 flex flex-col justify-center items-center space-y-3">
          <div className="flex flex-row justify-start items-center gap-4">
            <label htmlFor="email">EMAIL : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD : </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="text-black"
            />
          </div>
          <div>
            <button
              className="border rounded-lg my-10 p-4"
              onClick={handleLoginUser}
            >
              Login
            </button>
          </div>
          <div>
            Do not have an account. Go to{" "}
            <Link className="border rounded-lg my-2 p-2" href={"/signup"}>
              Create a account
            </Link>{" "}
            page.
          </div>
        </div>
      </div>
    </main>
  );
}
