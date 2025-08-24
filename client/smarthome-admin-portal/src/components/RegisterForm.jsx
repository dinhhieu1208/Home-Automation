import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { handleRegister } from "../controllers/authController"; 

import Google from "../assets/images/logo_google.png";
import Facebook from "../assets/images/logo_facebook.png";
import Twitter from "../assets/images/logo_Twitter.png";

export default function RegisterForm() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(form, navigate);
  };

  return (
    <div className="p-8 rounded-2xl space-y-8">
      <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
      <p className="text-gray-500 text-sm mb-6">
        You are one Step away from becoming a member of Home Automation
      </p>

     <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-2 text-gray-500"
            aria-label="Toggle password"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          className="w-40 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700"
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-black" />
        <span className="mx-3 text-sm">Or Create Account with</span>
        <hr className="flex-grow border-black" />
      </div>

      <div className="flex justify-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full shadow-xl overflow-hidden">
          <img src={Google} alt="Google" className="w-6 h-6 object-cover" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full shadow-xl overflow-hidden">
          <img src={Facebook} alt="Facebook" className="w-6 h-6 object-cover" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full shadow-xl overflow-hidden">
          <img src={Twitter} alt="Twitter" className="w-7 h-7 object-cover" />
        </button>
      </div>

      <p className="text-center text-sm mt-5">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
