import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center">

        <h1 className="text-5xl font-bold text-green-700 mb-4">
          🌾 Agri Management System
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Smart platform to manage crops, farmers, inventory,
          analytics and agricultural productivity.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700">
              🌱 Crops
            </h3>
            <p className="mt-2 text-gray-600">
              Manage crop production and harvesting.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700">
              👨‍🌾 Farmers
            </h3>
            <p className="mt-2 text-gray-600">
              Maintain farmer information and records.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700">
              📦 Inventory
            </h3>
            <p className="mt-2 text-gray-600">
              Monitor stock, seeds and fertilizers.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}