"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      console.log(
        "Signup Response:",
        data
      );

      if (data.success) {
        alert(
          "✅ Signup Successful! Redirecting to Login..."
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          location: "",
          password: "",
        });

        // Redirect to Login Page
        router.push("/login");
      } else {
        alert(
          data.message ||
            "Signup Failed"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            🌾 AgriMS
          </h1>

          <p className="text-green-100 mt-2">
            Create New Account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-xl outline-none text-black"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-xl outline-none text-black"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-3 rounded-xl outline-none text-black"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-xl outline-none text-black"
            required
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

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Village / City"
            className="w-full p-3 rounded-xl outline-none text-black"
            required
          />

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-xl outline-none text-black"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-3 text-gray-600"
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-100 transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}