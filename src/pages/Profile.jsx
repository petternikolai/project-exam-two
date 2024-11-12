"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import TextInput from "../components/form/TextInput";
import { useAuth } from "../auth/useAuth"; // Import custom hook for authentication
import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL } from "../constants/apiUrls";

const secondaryNavigation = [
  { name: "Profile", href: "/project-exam-two/profile", current: true },
  { name: "Bookings", href: "/project-exam-two/bookings", current: false },
  { name: "Venues", href: "/project-exam-two/admin-venues", current: false },
];

const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export default function Example() {
  const { userProfile, setUserProfile } = useAuth(); // Ensure setUserProfile is correctly imported from useAuth
  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
  const [formData, setFormData] = useState({
    bio: "",
    avatar: "",
    venueManager: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for notification

  useEffect(() => {
    if (userProfile) {
      setFormData({
        bio: userProfile.bio || "",
        avatar: userProfile.avatar.url || "",
        venueManager: userProfile.venueManager || false,
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      venueManager: value === "Yes",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You are not authorized to perform this action.");
      return;
    }
    if (formData.avatar.length > 300) {
      alert("Avatar URL cannot be greater than 300 characters.");
      return;
    }
    const isValidUrl = await validateImageUrl(formData.avatar);
    if (!isValidUrl) {
      alert("Avatar URL is not publicly accessible.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/profiles/${userProfile.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify({
            bio: formData.bio,
            avatar: { url: formData.avatar, alt: "User avatar" }, // Add alt text for avatar
            venueManager: formData.venueManager,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Log the full error response
        throw new Error(errorData.message || "Failed to update profile");
      }
      // Handle successful save
      const updatedProfile = await response.json();
      setUserProfile(updatedProfile.data);
      setShowNotification(true); // Show notification
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("userProfile", userProfile);

  return (
    <>
      <div className="flex justify-center">
        <div>
          <main>
            <h1 className="sr-only">Profile</h1>

            <header className="border-b border-white/5">
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={item.current ? "text-accent" : ""}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>

            {/* Settings forms */}
            <div className="divide-y divide-white/5">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base/7 font-semibold text-black">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-400">
                    Update your profile information.
                  </p>
                </div>

                <form className="md:col-span-2" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                      <img
                        alt=""
                        src={
                          formData.avatar || "https://via.placeholder.com/256"
                        }
                        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                      />
                      <div>
                        <TextInput
                          id="avatar"
                          name="avatar"
                          type="text"
                          label="Avatar URL"
                          value={formData.avatar}
                          onChange={handleChange}
                        />
                        <p className="mt-2 text-xs/5 text-gray-400">
                          Must be a fully formed URL that links to a live and
                          publicly accessible image.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <TextInput
                        id="bio"
                        name="bio"
                        type="text"
                        label="Bio"
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="venueManager"
                        className="block text-sm/6 font-medium text-black"
                      >
                        Venue Manager
                      </label>
                      <div className="mt-2">
                        <select
                          id="venueManager"
                          name="venueManager"
                          value={formData.venueManager ? "Yes" : "No"}
                          onChange={handleSelectChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 mt-20"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={showNotification}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-green-400"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Profile updated
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your changes have been saved.
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotification(false);
                      }}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
