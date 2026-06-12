"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("✅ Profile Updated Successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              👤 My Profile
            </h1>

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 w-full">
              {/* Avatar Section */}
              <div className="flex flex-col items-center pb-8 border-b border-gray-200">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mt-4">
                  {user.name || "User"}
                </h2>

                <p className="text-gray-500 mt-2">
                  {user.email}
                </p>
              </div>

              {/* Form Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    placeholder="Enter Location"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-10">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : "💾 Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}