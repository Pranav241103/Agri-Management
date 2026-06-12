"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  location?: string;
}

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-green-700">
          🌾 Agri Management System
        </h1>

        <p className="text-sm text-gray-500">
          Smart Agriculture Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />


        <div className="flex items-center gap-3 bg-green-50 px-3 py-2 rounded-lg">

          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-sm">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.location || "Farmer"}
            </p>
          </div>

        </div>

        {/* Profile Button */}
        <button
          onClick={() => router.push("/profile")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          👤 Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}