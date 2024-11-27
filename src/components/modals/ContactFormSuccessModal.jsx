"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

/**
 * ContactFormSuccessModal renders a modal that indicates successful submission of a contact form.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Function} props.onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} A modal component for contact form success messages.
 */
export default function ContactFormSuccessModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      {/* Background overlay */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* Success icon */}
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/50">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-black" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                {/* Modal title */}
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Message Sent
                </DialogTitle>
                <div className="mt-2">
                  {/* Success message */}
                  <p className="text-sm text-gray-500">
                    Your message has been sent successfully!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              {/* Close button */}
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
