"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface Tractor {
  _id: string;
  userId: string;
  ownerName: string;
  tractorName: string;
  tractorNumber: string;
  serviceType: string;
  serviceRate: number;
  contactNumber: string;
  status?: string;
}

interface TractorFormData {
  ownerName: string;
  tractorName: string;
  tractorNumber: string;
  serviceType: string;
  serviceRate: string;
  contactNumber: string;
}

export default function TractorPage() {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<TractorFormData>({
      ownerName: "",
      tractorName: "",
      tractorNumber: "",
      serviceType: "",
      serviceRate: "",
      contactNumber: "",
    });

  const fetchTractors = async () => {
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
        `/api/tractor?userId=${currentUser.id}`
      );

      const data = await res.json();

      setTractors(data);
    } catch (error) {
      console.error(
        "Error fetching tractors:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTractors();
  }, []);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const res = await fetch(
        "/api/tractor",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id,

            ownerName:
              formData.ownerName,

            tractorName:
              formData.tractorName,

            tractorNumber:
              formData.tractorNumber,

            serviceType:
              formData.serviceType,

            serviceRate:
              Number(
                formData.serviceRate
              ),

            contactNumber:
              formData.contactNumber,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to add tractor"
        );
      }

      setFormData({
        ownerName: "",
        tractorName: "",
        tractorNumber: "",
        serviceType: "",
        serviceRate: "",
        contactNumber: "",
      });

      fetchTractors();
    } catch (error) {
      console.error(
        "Error adding tractor:",
        error
      );
    }
  };

  const deleteTractor = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this tractor?"
      );

    if (!confirmed) return;

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const res = await fetch(
        `/api/tractor/${id}?userId=${currentUser.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to delete tractor"
        );
      }

      fetchTractors();
    } catch (error) {
      console.error(
        "Error deleting tractor:",
        error
      );
    }
  };

  const handleInputChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="mb-6 text-3xl font-bold">
            🚜 Tractor Services
          </h1>

          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Add Tractor Service
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 md:grid-cols-3"
            >
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={formData.ownerName}
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              />

              <input
                type="text"
                name="tractorName"
                placeholder="Tractor Name"
                value={formData.tractorName}
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              />

              <input
                type="text"
                name="tractorNumber"
                placeholder="Tractor Number"
                value={
                  formData.tractorNumber
                }
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              />

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              >
                <option value="">
                  Select Service
                </option>
                <option value="Ploughing">
                  Ploughing
                </option>
                <option value="Rotavator">
                  Rotavator
                </option>
                <option value="Cultivation">
                  Cultivation
                </option>
                <option value="Sowing">
                  Sowing
                </option>
                <option value="Harvesting">
                  Harvesting
                </option>
                <option value="Transport">
                  Transport
                </option>
              </select>

              <input
                type="number"
                name="serviceRate"
                placeholder="Service Rate ₹"
                value={formData.serviceRate}
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={
                  formData.contactNumber
                }
                onChange={
                  handleInputChange
                }
                className="rounded-lg border p-3"
                required
              />

              <button
                type="submit"
                className="rounded-lg bg-green-600 py-3 text-white"
              >
                Add Tractor
              </button>
            </form>
          </div>

          {loading ? (
            <div className="text-center">
              Loading tractors...
            </div>
          ) : tractors.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center shadow">
              No tractors found.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {tractors.map(
                (tractor) => (
                  <div className="grid gap-6 md:grid-cols-2">
                    {tractors.map((tractor) => (
                      <div
                        key={tractor._id}
                        className="rounded-xl bg-white p-6 shadow"
                      >
                        <h3 className="mb-2 text-xl font-bold">
                          {tractor.tractorName}
                        </h3>

                        <p>
                          <strong>Owner:</strong>{" "}
                          {tractor.ownerName}
                        </p>

                        <p>
                          <strong>Number:</strong>{" "}
                          {tractor.tractorNumber}
                        </p>

                        <p>
                          <strong>Service:</strong>{" "}
                          {tractor.serviceType}
                        </p>

                        <p>
                          <strong>Rate:</strong> ₹
                          {tractor.serviceRate}
                        </p>

                        <p>
                          <strong>Contact:</strong>{" "}
                          {tractor.contactNumber}
                        </p>

                        {tractor.status && (
                          <p className="mt-2 font-bold text-green-600">
                            {tractor.status}
                          </p>
                        )}

                        <div className="mt-4 flex gap-3 flex-wrap">

                          <a
                            href={`tel:${tractor.contactNumber}`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                          >
                            📞 Call
                          </a>

                          <a
                            href={`https://wa.me/91${tractor.contactNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                          >
                            💬 WhatsApp
                          </a>

                          <button
                            onClick={() =>
                              deleteTractor(
                                tractor._id
                              )
                            }
                            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                          >
                            🗑 Delete
                          </button>

                        </div>
                      </div>
                    ))}
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

