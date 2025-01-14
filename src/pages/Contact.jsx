import React, { useState } from "react";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ContactFormSuccessModal from "../components/modals/ContactFormSuccessModal";
import { Helmet } from "react-helmet-async";

/**
 * Contact component displays the contact form with fields for first name, last name, email, phone number, and message.
 * It also shows a success modal after form submission and includes contact details like address, phone, and email.
 *
 * @returns {JSX.Element} The contact form with its input fields and success modal.
 */
export default function Contact() {
  // State to hold form data values for first name, last name, email, phone number, and message
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // State to track if the success modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles changes to the form fields and updates the form data state.
   *
   * @param {Object} e - The event object for the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the respective field
    });
  };

  /**
   * Handles form submission, clears the form, and opens the success modal.
   *
   * @param {Object} e - The event object for form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Clear the form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
    // Open the success modal upon form submission
    setIsModalOpen(true);
  };

  /**
   * Closes the success modal.
   */
  const closeModal = () => {
    setIsModalOpen(false); // Set the modal to closed
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Holidaze</title>
        <meta
          name="description"
          content="Have questions? Contact Holidaze for support or inquiries."
        />
      </Helmet>

      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          {/* Contact information section */}
          <div className="relative px-6 pb-10 pt-12 sm:pt-32 lg:static lg:px-4 lg:py-24">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Get in touch
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600">
                If you have any questions or need assistance, please don't
                hesitate to reach out to us. Our team is here to help you with
                any inquiries you may have. You can contact us via email, phone,
                or by filling out the contact form below. We look forward to
                hearing from you!
              </p>
              <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent"
                    />
                  </dt>
                  <dd>
                    Parkveien 1, 0350
                    <br />
                    Oslo, Norway
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent"
                    />
                  </dt>
                  <dd>
                    <a
                      href="tel:+1 (555) 234-5678"
                      className="hover:text-gray-900"
                    >
                      +47 123 45 678
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-accent"
                    />
                  </dt>
                  <dd>
                    <a
                      href="mailto:hello@holidaze.com"
                      className="hover:text-gray-900"
                    >
                      hello@holidaze.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="px-6 pb-12 pt-10 sm:pb-16 lg:px-4 lg:py-24"
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* First Name Input */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
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
                </div>

                {/* Last Name Input */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
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

                {/* Email Input */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
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
                </div>

                {/* Phone Number Input */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
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

                {/* Message Textarea */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-semibold text-gray-900"
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
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentbg-accent"
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
        <ContactFormSuccessModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}
