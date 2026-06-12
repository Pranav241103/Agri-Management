"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function VeterinaryPage() {
  const [doctors, setDoctors] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    doctorName: "",
    serviceName: "",
    serviceRate: "",
    phoneNumber: "",
    whatsappNumber: "",
    experience: "",
    location: "",
  });

  async function fetchDoctors() {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!currentUser?.id) return;

      const res = await fetch(
        `/api/veterinary?userId=${currentUser.id}`
      );

      const data = await res.json();

      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!currentUser?.id) {
        alert("Please login again");
        return;
      }

      await fetch("/api/veterinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,

          doctorName: formData.doctorName,
          serviceName: formData.serviceName,
          serviceRate: Number(formData.serviceRate),
          phoneNumber: formData.phoneNumber,
          whatsappNumber: formData.whatsappNumber,
          experience: Number(formData.experience),
          location: formData.location,
        }),
      });

      setFormData({
        doctorName: "",
        serviceName: "",
        serviceRate: "",
        phoneNumber: "",
        whatsappNumber: "",
        experience: "",
        location: "",
      });

      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      await fetch(`/api/veterinary/${id}`, {
        method: "DELETE",
      });

      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            🩺 Veterinary Doctors
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              Add Veterinary Doctor
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-4 gap-4"
            >
              <input
                type="text"
                placeholder="Doctor Name"
                value={formData.doctorName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doctorName: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <select
                value={formData.serviceName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    serviceName: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              >
                <option value="">
                  Select Service
                </option>

                <option value="Vaccination">
                  Vaccination
                </option>

                <option value="Artificial Insemination">
                  Artificial Insemination
                </option>

                <option value="Pregnancy Checkup">
                  Pregnancy Checkup
                </option>

                <option value="Surgery">
                  Surgery
                </option>

                <option value="Emergency Treatment">
                  Emergency Treatment
                </option>

                <option value="Deworming">
                  Deworming
                </option>
              </select>

              <input
                type="number"
                placeholder="Service Rate ₹"
                value={formData.serviceRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    serviceRate: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="WhatsApp Number"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatsappNumber: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Experience (Years)"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white rounded-lg py-3"
              >
                Add Doctor
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-green-700">
                  {doctor.doctorName}
                </h3>

                <p className="mt-2">
                  🩺 Service: {doctor.serviceName}
                </p>

                <p>
                  💰 Rate: ₹{doctor.serviceRate}
                </p>

                <p>
                  📞 Phone: {doctor.phoneNumber}
                </p>

                <p>
                  🎓 Experience: {doctor.experience} Years
                </p>

                <p>
                  📍 Location: {doctor.location}
                </p>

                <div className="flex gap-3 mt-4">
                  <a
                    href={`https://wa.me/91${doctor.whatsappNumber}`}
                    target="_blank"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    WhatsApp
                  </a>

                  <button
                    onClick={() =>
                      deleteDoctor(doctor._id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}