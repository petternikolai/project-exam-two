import loginImg from "../assets/login-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { API_BASE_URL, API_LOGIN_URL } from "../constants/apiUrls";
import { useAuth } from "../hooks/useAuth"; // Import useAuth hook

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get login function from useAuth
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      // Redirect to dashboard or desired page
      navigate("/project-exam-two/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${API_LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid email or password");
        } else if (response.status === 401) {
          throw new Error("Unauthorized access");
        } else {
          throw new Error("Login failed");
        }
      }

      const data = await response.json();
      console.log("Form submitted", data);

      // Store the token in local storage
      localStorage.setItem("authToken", data.data.accessToken);

      // Log in the user
      login(data.data, data.data.accessToken);

      // Redirect to dashboard or desired page
      navigate("/project-exam-two/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
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
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      autoComplete="current-password"
                    />
                  </div>
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
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src={loginImg}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
