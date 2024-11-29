import loginImg from "../assets/login-img.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { API_BASE_URL, API_LOGIN_URL } from "../constants/apiUrls";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/form/TextInput";
import { usePreviousLocation } from "../context/PreviousLocationContext";
import { Helmet } from "react-helmet-async";

/**
 * Login component handles user authentication by allowing users
 * to sign in with their email and password. Upon successful login,
 * the user is redirected to their intended destination or a default page.
 *
 * @returns {JSX.Element} A login form with input fields and a submit button.
 */
export default function Login() {
  // State to manage form data for email and password
  const [formData, setFormData] = useState({ email: "", password: "" });

  // State to store any error messages during login
  const [error, setError] = useState("");

  const { login } = useAuth(); // Authentication context hook for login logic
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Access the current route's location object
  const previousLocation = usePreviousLocation(); // Access the previous route location from context

  /**
   * Handles input changes in the form.
   * Updates the state with the new values for email and password.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Handles form submission to log in the user.
   * Sends login credentials to the API and updates authentication state on success.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    try {
      // Make a POST request to the login API
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

      // Save token to localStorage and update authentication state
      localStorage.setItem("authToken", data.data.accessToken);
      login(data.data, data.data.accessToken);

      // Redirect user to the intended destination or fallback to a default page
      const afterLogin =
        location.state?.from ||
        previousLocation?.pathname ||
        "/project-exam-two/profile";

      navigate(afterLogin);
    } catch (error) {
      // Display error message to the user
      setError(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Holidaze</title>
        <meta
          name="description"
          content="Log in to your Holidaze account to manage bookings and venues."
        />
      </Helmet>
      <div className="flex custom-height">
        {/* Left-side form container */}
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
              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input field */}
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
                {/* Password input field */}
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
                {/* Error message display */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                  {/* Submit button */}
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
        {/* Right-side image container */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt="Login page background"
            src={loginImg}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
