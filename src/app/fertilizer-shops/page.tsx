"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function FertilizerShopsPage() {
  const [fertilizers, setFertilizers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fertilizerName: "",
    fertilizerType: "",
    companyName: "",
    rate: "",
    quantity: "",
  });

  async function fetchFertilizers() {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!currentUser?.id) return;

      const res = await fetch(
        `/api/fertilizers?userId=${currentUser.id}`
      );

      const data = await res.json();

      setFertilizers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await fetch("/api/fertilizers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,

          fertilizerName:
            formData.fertilizerName,

          fertilizerType:
            formData.fertilizerType,

          companyName:
            formData.companyName,

          rate: Number(formData.rate),

          quantity: Number(
            formData.quantity
          ),
        }),
      });

      setFormData({
        fertilizerName: "",
        fertilizerType: "",
        companyName: "",
        rate: "",
        quantity: "",
      });

      fetchFertilizers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFertilizer = async (
    id: string
  ) => {
    try {
      await fetch(
        `/api/fertilizers/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchFertilizers();
    } catch (error) {
      console.error(error);
    }
  };

  const totalStock = fertilizers.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const totalValue = fertilizers.reduce(
    (sum, item) =>
      sum + item.totalValue,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            🌱 Fertilizer Management
          </h1>

          {/* Dashboard Cards */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-gray-500">
                Total Stock
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {totalStock}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-gray-500">
                Inventory Value
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                ₹{totalValue}
              </p>
            </div>
          </div>

          {/* Add Fertilizer */}

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4">
              Add Fertilizer
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Fertilizer Name"
                value={
                  formData.fertilizerName
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fertilizerName:
                      e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <select
                value={
                  formData.fertilizerType
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fertilizerType:
                      e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              >
                <option value="">
                  Select Type
                </option>

                <option value="Urea">
                  Urea
                </option>

                <option value="DAP">
                  DAP
                </option>

                <option value="NPK">
                  NPK
                </option>

                <option value="Potash">
                  Potash
                </option>

                <option value="Organic">
                  Organic
                </option>

                <option value="Compost">
                  Compost
                </option>
              </select>

              <input
                type="text"
                placeholder="Company Name"
                value={
                  formData.companyName
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyName:
                      e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Rate ₹"
                value={formData.rate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rate: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity:
                      e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white rounded-lg py-3"
              >
                Add Fertilizer
              </button>
            </form>
          </div>

          {/* Fertilizer List */}

          <div className="grid md:grid-cols-2 gap-6">
            {fertilizers.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-green-700">
                  {item.fertilizerName}
                </h3>

                <p className="mt-2">
                  🌱 Type:{" "}
                  {item.fertilizerType}
                </p>

                <p>
                  🏭 Company:{" "}
                  {item.companyName}
                </p>

                <p>
                  💰 Rate: ₹{item.rate}
                </p>

                <p>
                  📦 Quantity:{" "}
                  {item.quantity}
                </p>

                <p className="font-bold text-blue-700">
                  Total Value: ₹
                  {item.totalValue}
                </p>

                <button
                  onClick={() =>
                    deleteFertilizer(
                      item._id
                    )
                  }
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}