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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const response = await axios.post("/api/users/signup", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
        setFormData({ username: "", email: "", password: "" });
      }

      setLoading(false);
      setButtonDisabled(false);
    } catch (error: any) {
      console.log(`Error while resgistering user. Please try again...`);
      setButtonDisabled(false);
    }
  };

  return (
    <main className="w-full h-auto p-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-screen">
        <h1 className="text-center text-3xl md:text-5xl">
          Create Your Account
        </h1>
        <div className=" my-10 flex flex-col justify-center items-center space-y-3">
          <div className="flex flex-row justify-start items-center gap-4">
            <label htmlFor="username">USERNAME : </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="text-black"
            />
          </div>
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
            <button disabled={buttonDisabled} onClick={handleSignUpUser}>
              SIGNUP
            </button>
          </div>
          <div>
            Already have a account. Go to <Link href={"/login"}>LOGIN</Link>{" "}
            page.
          </div>
          <div className="text-3xl my-10">
            {loading && "CREATING YOUR ACCOUNT..."}
          </div>
        </div>
      </div>
    </main>
  );
}
