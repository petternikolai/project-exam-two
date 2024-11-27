import React, { useState } from "react";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ContactFormSuccessModal from "../components/modals/ContactFormSuccessModal";

/**
 * Contact renders the contact page with a form for users to send inquiries.
 * The form includes fields for the user's name, email, phone number, and message.
 * Upon form submission, a success modal is displayed.
 *
 * @returns {JSX.Element} A contact form with success modal functionality.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles changes in the form inputs.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles the form submission, clears the form data, and opens the success modal.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
    // Open the success modal
    setIsModalOpen(true);
  };

  /**
   * Closes the success modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-10 pt-12 sm:pt-32 lg:static lg:px-4 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Get in touch
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              If you have any questions or need assistance, please don't
              hesitate to reach out to us. Our team is here to help you with any
              inquiries you may have. You can contact us via email, phone, or by
              filling out the contact form below. We look forward to hearing
              from you!
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-6 w-6 text-accent" />
                </dt>
                <dd className="flex-1">contact@holidaze.com</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Phone</span>
                  <PhoneIcon className="h-6 w-6 text-accent" />
                </dt>
                <dd className="flex-1">+1 123 456 7890</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Office</span>
                  <BuildingOffice2Icon className="h-6 w-6 text-accent" />
                </dt>
                <dd className="flex-1">123 Main St, City, Country</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:col-span-1 lg:col-span-2 lg:space-y-8"
        >
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-900"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-900"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-900"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
      <ContactFormSuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
