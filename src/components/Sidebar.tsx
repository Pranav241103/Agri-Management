"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Farmers",
      path: "/farmers",
      icon: "👨‍🌾",
    },
    {
      name: "Dairy",
      path: "/dairy",
      icon: "🐄",
    },
    {
      name: "Veterinary",
      path: "/veterinary",
      icon: "🩺",
    },
    {
      name: "Tractor Services",
      path: "/tractor-services",
      icon: "🚜",
    },
    {
      name: "Fertilizer Shops",
      path: "/fertilizer-shops",
      icon: "🏪",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <aside
      className="
        w-64
        lg:w-72
        min-h-screen
        bg-gradient-to-b
        from-green-700
        via-green-800
        to-green-900
        text-white
        flex
        flex-col
        flex-shrink-0
        shadow-2xl
        overflow-hidden
      "
    >
      {/* Logo */}
      <div className="p-6 border-b border-green-600">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-wide">
          🌾 AgriMS
        </h1>

        <p className="text-green-100 mt-2 text-sm">
          Smart Farm Solution
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {menus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.name}
              href={menu.path}
              className={`
                flex items-center gap-4
                px-5 py-4
                mx-2 mb-2
                rounded-2xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-green-700 font-bold shadow-lg scale-[1.02]"
                    : "hover:bg-green-600 hover:translate-x-1"
                }
              `}
            >
              <span className="text-2xl">
                {menu.icon}
              </span>

              <span className="text-sm lg:text-base">
                {menu.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-600">
        <button
          onClick={handleLogout}
          className="
            w-full
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            shadow-md
          "
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}