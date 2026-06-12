"use client";

import { useEffect, useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface DairyRecord {
  _id: string;
  userId: string;
  milkType: string;
  litre: number;
  milkRate: number;
  totalAmount: number;
  date: string;
}

interface FormData {
  milkType: string;
  litre: string;
  milkRate: string;
  date: string;
}

export default function DairyPage() {
  const [records, setRecords] = useState<DairyRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    milkType: "",
    litre: "",
    milkRate: "",
    date: "",
  });

  const fetchRecords = async () => {
    try {
      setLoading(true);

      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/dairy?userId=${currentUser.id}`
      );

      const data = await res.json();

      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await fetch("/api/dairy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,

          milkType: formData.milkType,
          litre: Number(formData.litre),
          milkRate: Number(formData.milkRate),
          date: formData.date,
        }),
      });

      setFormData({
        milkType: "",
        litre: "",
        milkRate: "",
        date: "",
      });

      fetchRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const totalMilk = records.reduce(
    (sum, item) => sum + item.litre,
    0
  );

  const totalRevenue = records.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const today = new Date();

  const todayMilk = records
    .filter(
      (item) =>
        new Date(item.date).toDateString() ===
        today.toDateString()
    )
    .reduce((sum, item) => sum + item.litre, 0);

  const weeklyMilk = records
    .filter((item) => {
      const diff =
        (today.getTime() -
          new Date(item.date).getTime()) /
        (1000 * 60 * 60 * 24);

      return diff >= 0 && diff <= 7;
    })
    .reduce((sum, item) => sum + item.litre, 0);

  const monthlyMilk = records
    .filter((item) => {
      const d = new Date(item.date);

      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, item) => sum + item.litre, 0);

  const yearlyMilk = records
    .filter(
      (item) =>
        new Date(item.date).getFullYear() ===
        today.getFullYear()
    )
    .reduce((sum, item) => sum + item.litre, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            🥛 Dairy Management
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-gray-500">
                Total Milk Collection
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {totalMilk} L
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-gray-500">
                Total Revenue
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                ₹{totalRevenue}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Today</h3>
              <p className="text-3xl font-bold">
                {todayMilk} L
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>This Week</h3>
              <p className="text-3xl font-bold">
                {weeklyMilk} L
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>This Month</h3>
              <p className="text-3xl font-bold">
                {monthlyMilk} L
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>This Year</h3>
              <p className="text-3xl font-bold">
                {yearlyMilk} L
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Add Milk Record
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-5 gap-4"
            >
              <select
                value={formData.milkType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    milkType: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              >
                <option value="">
                  Select Milk Type
                </option>

                <option value="Cow">
                  🐄 Cow Milk
                </option>

                <option value="Buffalo">
                  🐃 Buffalo Milk
                </option>

                <option value="Goat">
                  🐐 Goat Milk
                </option>
              </select>

              <input
                type="number"
                placeholder="Milk Quantity"
                value={formData.litre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    litre: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Milk Rate"
                value={formData.milkRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    milkRate: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white rounded-lg"
              >
                Add Record
              </button>
            </form>
          </div>
<div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
  <h2 className="text-xl font-semibold mb-4">
    Milk Records
  </h2>

  {loading ? (
    <div className="text-center py-8 text-gray-500">
      Loading records...
    </div>
  ) : (
    <table className="w-full min-w-[700px] border-collapse">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-4 py-3 text-left font-semibold text-gray-700">
            Milk Type
          </th>

          <th className="px-4 py-3 text-center font-semibold text-gray-700">
            Date
          </th>

          <th className="px-4 py-3 text-center font-semibold text-gray-700">
            Quantity (L)
          </th>

          <th className="px-4 py-3 text-center font-semibold text-gray-700">
            Rate (₹)
          </th>

          <th className="px-4 py-3 text-right font-semibold text-gray-700">
            Total (₹)
          </th>
        </tr>
      </thead>

      <tbody>
        {records.length > 0 ? (
          records.map((record, index) => (
            <tr
              key={record._id}
              className={`border-b transition hover:bg-green-50 ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-3 text-left">
                {record.milkType}
              </td>

              <td className="px-4 py-3 text-center">
                {new Date(record.date).toLocaleDateString(
                  "en-IN"
                )}
              </td>

              <td className="px-4 py-3 text-center">
                {record.litre} L
              </td>

              <td className="px-4 py-3 text-center">
                ₹{record.milkRate}
              </td>

              <td className="px-4 py-3 text-right font-semibold text-green-600">
                ₹{record.totalAmount}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              className="py-8 text-center text-gray-500"
            >
              No milk records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>
        </main>
      </div>
    </div>
  );
}