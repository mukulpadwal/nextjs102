"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  username: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<User>({
    username: "",
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

  const handleLogoutUser = async () => {};

  console.log(userData);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start gap-y-6 p-12 sm:p-24">
      <h1 className="text-xl sm:text-5xl">User Profile Page 👤</h1>
      <p className="text-base sm:text-2xl">Welcome {userData.username}</p>
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
