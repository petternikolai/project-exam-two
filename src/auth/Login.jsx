import loginImg from "../assets/login-img.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { API_BASE_URL, API_LOGIN_URL } from "../constants/apiUrls";
import useAuth from "./useAuth";
import TextInput from "../components/form/TextInput";
import { usePreviousLocation } from "../context/PreviousLocationContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access the 'state' passed from the previous page
  const previousLocation = usePreviousLocation(); // Get previous location from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_LOGIN_URL}?_holidaze=true`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorMessage =
          response.status === 400 || response.status === 401
            ? "Invalid email or password"
            : "Login failed";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.data.accessToken);
      login(data.data, data.data.accessToken);

      // Check if there is a 'from' state in location, otherwise fallback to the previous location from context or a default page (e.g., profile or home)
      const afterLogin =
        location.state?.from ||
        previousLocation?.pathname ||
        "/project-exam-two/profile";

      navigate(afterLogin);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex custom-height">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500">
              Not a member?{" "}
              <Link
                to="/project-exam-two/register"
                className="font-semibold text-accent"
              >
                Sign up now
              </Link>
            </p>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <TextInput
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm/6 font-medium text-black bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src={loginImg}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
