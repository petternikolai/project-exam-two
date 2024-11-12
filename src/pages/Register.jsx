import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/pro-duotone-svg-icons";
import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL, API_REGISTER_URL } from "../constants/apiUrls";
import { useAuth } from "../hooks/useAuth"; // Import useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    venueManager: false,
  });

  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { login } = useAuth(); // Get login function from useAuth
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      venueManager: formData.venueManager, // Ensure boolean value
    };

    try {
      const response = await fetch(`${API_BASE_URL}${API_REGISTER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid registration details");
        } else if (response.status === 409) {
          throw new Error("User already exists");
        } else {
          throw new Error("Registration failed");
        }
      }

      const data = await response.json();
      console.log("Form submitted", data);

      // Log in the user after successful registration
      login(data.userProfile);

      // Redirect to the desired page
      navigate("/project-exam-two/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            You're just a few steps away from your dream vacation...
          </h2>
          <div className="flex mx-auto">
            {[...Array(6)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faShoePrints}
                className={`mt-6 mx-auto text-accent text-xl/6 icon-animation`}
                style={{ animationDelay: `${index * 0.5}s` }}
                swapOpacity={index % 2 === 0} // Applies to every other icon
              />
            ))}
          </div>
          <h3 className="mt-10 text-center text-lg tracking-tight text-gray-900">
            ...enter your details and let's find your perfect getaway!
          </h3>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password" // Add autocomplete attribute
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
                  autoComplete="new-password" // Add autocomplete attribute
                />
              </div>
              {!passwordMatch && (
                <p className="text-red-500 text-sm mt-2">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="venueManager"
                name="venueManager"
                type="checkbox"
                checked={formData.venueManager}
                onChange={handleChange}
                className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label
                htmlFor="venueManager"
                className="ml-2 block text-sm/6 text-gray-900"
              >
                I want to be a venue manager
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm/6 font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
