"use client";

import React, { useEffect, useReducer, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // As soon as the page loads lets retrieve the token from the url params
    // WAY 1 : use of window and core javascript
    // const urlToken = window.location.search.split("=")[1];
    // console.log(window.location);
    // console.log(window.location.search); // ?token=111
    // console.log(urlToken);
    // setToken(urlToken);

    const token = searchParams.get("token");

    if (token) {
      setToken(token);
    }
  }, []);

  const handleAccountVerification = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });

      if (response.data.success) {
        setIsVerified(true);
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(response.data.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error: any) {
      console.log(`Error while verifying email.`);
      toast.error(error.data.message);
    }
  };

  return (
    <main className="w-full h-auto p-10 ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl md:text-5xl">
          Verify Your Email...
        </h1>
        <button
          className="border rounded-lg my-10 p-4"
          onClick={handleAccountVerification}
        >
          VERIFY
        </button>
        {isVerified && (
          <p>You are verified and will be now redirected to login page...</p>
        )}
      </div>
    </main>
  );
}

export default VerifyEmailPage;
