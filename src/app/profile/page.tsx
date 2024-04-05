"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  username: string;
  _id: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [userData, setUserData] = useState<User>({
    username: "",
    _id: "",
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/users/me");

      if (response.data.success) {
        setUserData({ ...response.data.data });
      } else {
        toast.error(response.data.message);
      }
    })();
  }, []);

  const handleLogoutUser = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log(`Error while logging out user. ${error.message}`);
      toast.error(error.message);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start gap-y-6 p-12 sm:p-24">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-xl sm:text-5xl">User Profile Page 👤</h1>
      <p className="text-base sm:text-2xl">
        {userData?.username?.length > 0 ? (
          <>Welcome {userData?.username}</>
        ) : (
          <>No Data To Display</>
        )}
      </p>
      <p className="text-base">
        {userData?._id?.length > 0 && (
          <Link className="underline underline-offset-1" href={`/profile/${userData?._id}`}>Know your user id</Link>
        )}
      </p>
      <div className="absolute bottom-10 w-full flex flex-col justify-end items-center my-6">
        <button
          className="w-1/2 border rounded-lg text-center py-2 sm:py-2 hover:bg-slate-500"
          onClick={handleLogoutUser}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
