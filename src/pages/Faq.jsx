import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { faqs } from "../constants/faqs";
import { Helmet } from "react-helmet-async";

/**
 * Faq renders a list of frequently asked questions with expandable answers.
 * It uses a disclosure component to show and hide each answer.
 *
 * @returns {JSX.Element} A list of FAQs with expandable sections for each question.
 */
export default function Faq() {
  return (
    <>
      <Helmet>
        <title>FAQ - Holidaze</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Holidaze."
        />
      </Helmet>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-4 lg:py-20">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently asked questions
            </h1>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {/* Map through the FAQs and display each one with a disclosure */}
              {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base/7 font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {/* Toggle the plus/minus icons based on the disclosure state */}
                        <PlusIcon
                          aria-hidden="true"
                          className="h-6 w-6 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    {/* Display the answer for the FAQ */}
                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
