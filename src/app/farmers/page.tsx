"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface Farmer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  gender?: string;
  profileImage?: string;
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [filteredFarmers, setFilteredFarmers] =
    useState<Farmer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFarmers = async () => {
    try {
      const res = await fetch("/api/farmers", {
        cache: "no-store",
      });

      const data = await res.json();

      setFarmers(data);
      setFilteredFarmers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();

    const interval = setInterval(() => {
      fetchFarmers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = farmers.filter(
      (farmer) =>
        farmer.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        farmer.location
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredFarmers(filtered);
  }, [search, farmers]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-green-50 dark:from-slate-900 dark:to-slate-950">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
              👨‍🌾 Farmers Directory
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and view all registered farmers
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6">
              <h3 className="text-gray-500">
                Total Farmers
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {farmers.length}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6">
              <h3 className="text-gray-500">
                Active Profiles
              </h3>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                {farmers.length}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6">
              <h3 className="text-gray-500">
                Locations Covered
              </h3>

              <p className="text-4xl font-bold text-purple-600 mt-2">
                {
                  new Set(
                    farmers.map(
                      (f) => f.location
                    )
                  ).size
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 Search farmers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full md:w-96 px-5 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg outline-none"
            />
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              Loading Farmers...
            </div>
          ) : filteredFarmers.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              No Farmers Found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredFarmers.map(
                (farmer) => (
                  <div
                    key={farmer._id}
                    className="
                    bg-white
                    dark:bg-slate-800
                    rounded-3xl
                    shadow-xl
                    p-6
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="
                        w-16
                        h-16
                        rounded-full
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-500
                        text-white
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                      "
                      >
                        {farmer.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h2 className="font-bold text-xl">
                          {farmer.name}
                        </h2>

                        <p className="text-gray-500 text-sm">
                          {farmer.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                      <p>
                        📞{" "}
                        {farmer.phone ||
                          "Not Added"}
                      </p>

                      <p>
                        📍{" "}
                        {farmer.location ||
                          "Not Added"}
                      </p>

                      <p>
                        👤{" "}
                        {farmer.gender ||
                          "Not Added"}
                      </p>
                    </div>

                    {farmer.phone && (
                      <a
                        href={`https://wa.me/91${farmer.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        mt-5
                        inline-block
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        transition
                      "
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}