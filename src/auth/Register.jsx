import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoePrints } from "@fortawesome/pro-duotone-svg-icons";
import { API_KEY } from "../constants/apiKeys";
import { API_BASE_URL, API_REGISTER_URL } from "../constants/apiUrls";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/form/TextInput";
import CheckboxInput from "../components/form/CheckboxInput";

/**
 * Register component allows users to create a new account by providing
 * their details (username, email, password). It validates the input fields,
 * checks password confirmation, and sends the data to the API for registration.
 *
 * @returns {JSX.Element} A registration form with validations and UI feedback.
 */
export default function Register() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    venueManager: false,
  });

  // State for displaying error messages
  const [error, setError] = useState("");

  // State to check if passwords match
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { login } = useAuth(); // Authentication context hook
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Validate if passwords match whenever they change
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  /**
   * Handles input field changes and updates the form state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Validates the form and submits the registration data to the API.
   * If successful, logs the user in and navigates to the login page.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match before proceeding
    if (!passwordMatch) {
      setError("Passwords do not match");
      return;
    }
    setError(""); // Clear any previous errors

    // Prepare payload for the API request
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

      // Log the user in and navigate to the login page
      login(data.userProfile);
      navigate("/project-exam-two/login");
    } catch (error) {
      // Display error messages to the user
      setError(error.message);
    }
  };

  /**
   * Checks if the password meets the minimum length requirement.
   *
   * @param {string} password - The password to check.
   * @returns {boolean} True if the password is at least 8 characters.
   */
  const isPasswordLongEnough = (password) => {
    return password.length >= 8;
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Registration form heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            You're just a few steps away from your dream vacation...
          </h2>
          <div className="flex mx-auto">
            {/* Animated footprints */}
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
          {/* Registration form */}
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
            {/* Password strength indicator */}
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
          {/* Registration guidelines */}
          <div className="bg-accent p-4 rounded-md text-sm text-black mt-4 lg:mt-0 lg:w-1/3">
            <h4 className="font-semibold">Guidelines:</h4>
            <ul className="space-y-2 pl-0 mt-2">
              <li>
                The username must not contain punctuation symbols apart from
                underscore (_).
              </li>
              <li>The email must be a valid stud.noroff.no email address.</li>
              <li>The password must be at least 8 characters long.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
