"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const [farmerCount, setFarmerCount] = useState(0);
  const [userName, setUserName] = useState("Farmer");

  useEffect(() => {
    fetchDashboardData();

    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || "Farmer");
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setFarmerCount(data.farmerCount || 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-[1600px] mx-auto">

            {/* Header */}
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              🌾 Agri Management Dashboard
            </h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Crops"
                value="1240"
                description="12% increase this month"
              />

              <DashboardCard
                title="Farmers"
                value={String(farmerCount)}
                description="Registered farmers"
              />

              <DashboardCard
                title="Inventory"
                value="350"
                description="Products in stock"
              />

              <DashboardCard
                title="Revenue"
                value="₹2.5L"
                description="Current monthly revenue"
              />
            </div>

            {/* Welcome Banner */}
            <div className="mt-8 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 rounded-3xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold">
                Welcome Back, {userName} 👋
              </h2>

              <p className="mt-3 text-lg text-green-100">
                Manage crops, farmers, dairy records,
                fertilizers, veterinary services and
                agricultural operations from one platform.
              </p>
            </div>

            {/* Tips Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-green-700 mb-3">
                  🌱 Today's Farming Tip
                </h2>

                <p className="text-gray-600">
                  Water crops during early morning or
                  evening hours to reduce evaporation
                  and improve irrigation efficiency.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-blue-700 mb-3">
                  🐄 Dairy Management Tip
                </h2>

                <p className="text-gray-600">
                  Provide clean drinking water and
                  balanced nutrition to increase milk
                  production and livestock health.
                </p>
              </div>

            </div>

            {/* Agriculture Information */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-5">
                📚 Agriculture Information Center
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="border rounded-xl p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">
                    🌾 Wheat
                  </h3>

                  <p className="text-gray-600">
                    Best temperature: 15°C - 25°C.
                    Requires fertile soil and moderate irrigation.
                  </p>
                </div>

                <div className="border rounded-xl p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">
                    🌽 Maize
                  </h3>

                  <p className="text-gray-600">
                    Thrives in warm climates and requires
                    nitrogen-rich fertilizer for maximum yield.
                  </p>
                </div>

                <div className="border rounded-xl p-5 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">
                    🌱 Soybean
                  </h3>

                  <p className="text-gray-600">
                    Improves soil fertility through nitrogen
                    fixation and produces protein-rich grains.
                  </p>
                </div>

              </div>
            </div>

            {/* Service Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-700">
                  🚜 Tractor Services
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-2">
                  Active
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-700">
                  🌱 Fertilizers
                </h3>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                  Available
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-700">
                  🩺 Veterinary
                </h3>

                <p className="text-4xl font-bold text-red-500 mt-2">
                  Ready
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-700">
                  🥛 Dairy Records
                </h3>

                <p className="text-4xl font-bold text-yellow-500 mt-2">
                  Updated
                </p>
              </div>

            </div>

            {/* Market Prices */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-5">
                💹 Market Prices
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                <div className="bg-green-50 rounded-xl p-5">
                  <h3 className="font-bold">🌾 Wheat</h3>
                  <p className="text-2xl font-bold text-green-700">
                    ₹2450/q
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-5">
                  <h3 className="font-bold">🌽 Maize</h3>
                  <p className="text-2xl font-bold text-yellow-700">
                    ₹2200/q
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="font-bold">🌱 Soybean</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    ₹4800/q
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-5">
                  <h3 className="font-bold">🌾 Paddy</h3>
                  <p className="text-2xl font-bold text-red-700">
                    ₹2300/q
                  </p>
                </div>

              </div>

            </div>

            {/* Agricultural Insights */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-5">
                📈 Agricultural Insights
              </h2>

              <ul className="space-y-4 text-gray-700">

                <li className="border-b pb-2">
                  🌦 Rainfall expected this week. Plan irrigation accordingly.
                </li>

                <li className="border-b pb-2">
                  🌱 Fertilizer application recommended for soybean fields.
                </li>

                <li className="border-b pb-2">
                  🐄 Schedule livestock vaccinations this month.
                </li>

                <li>
                  🚜 Tractor demand is increasing during sowing season.
                </li>

              </ul>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}