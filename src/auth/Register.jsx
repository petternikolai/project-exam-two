import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/pro-duotone-svg-icons";
import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL, API_REGISTER_URL } from "../constants/apiUrls";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/form/TextInput";
import CheckboxInput from "../components/form/CheckboxInput";

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
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      venueManager: formData.venueManager,
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

      login(data.userProfile);
      navigate("/project-exam-two/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const isPasswordLongEnough = (password) => {
    return password.length >= 8;
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
                swapOpacity={index % 2 === 0}
              />
            ))}
          </div>
          <h3 className="mt-10 text-center text-lg tracking-tight text-gray-900">
            ...enter your details and let's find your perfect getaway!
          </h3>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl flex flex-col lg:flex-row lg:space-x-8">
          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            <TextInput
              id="name"
              name="name"
              type="text"
              label="Username"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="username"
            />
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
              autoComplete="new-password"
            />
            {formData.password && (
              <div className="mt-2">
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                      isPasswordLongEnough(formData.password)
                        ? "bg-green-500 w-full"
                        : "bg-red-500 w-1/3"
                    }`}
                  ></div>
                </div>
                {!isPasswordLongEnough(formData.password) && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>
            )}
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match
              </p>
            )}
            <CheckboxInput
              id="venueManager"
              name="venueManager"
              label="I want to be a venue manager"
              checked={formData.venueManager}
              onChange={handleChange}
            />
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
          <div className="bg-accent p-4 rounded-md text-sm text-black mt-4 lg:mt-0 lg:w-1/3">
            <h4 className="font-semibold">Guidelines:</h4>
            <ul className="space-y-2 pl-0 mt-2">
              <li className="pl-0">
                The username must not contain punctuation symbols apart from
                underscore (_).
              </li>
              <li className="pl-0">
                The email must be a valid stud.noroff.no email address.
              </li>
              <li className="pl-0">
                The password must be at least 8 characters long.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
