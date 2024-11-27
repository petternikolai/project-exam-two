import imgPetterNikolai from "../assets/petter.png";
import Stats from "../components/stats/Stats";
import imgAbout from "../assets/about.jpg";
import imgPetterLandscape from "../assets/petter-landscape.png";

/**
 * About renders the "About Holidaze" page, providing information about the company,
 * its mission, history, and testimonials from customers.
 *
 * @returns {JSX.Element} The About page layout with sections for mission, history, and testimonials.
 */
export default function About() {
  return (
    <>
      {/* About Holidaze Section */}
      <div className="bg-white px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            About Holidaze
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Holidaze is a platform that connects travelers with unique and
            memorable accommodation experiences. We offer a wide range of
            venues, from cozy cabins to luxurious villas, to ensure you find the
            perfect place for your next vacation.
          </p>
          <img
            src={imgAbout}
            alt="A girl wearing a hoodie that says 'I know something about you'"
            className="mt-8 rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mission is to provide travelers with unique and memorable
            accommodation experiences, connecting them with hosts who offer
            exceptional hospitality and distinctive venues.
          </p>

          {/* History Section */}
          <h3 className="mt-10 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our History
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Holidaze was founded in 2020 with the goal of revolutionizing the
            travel industry by offering unique and personalized accommodation
            experiences. Since then, we have grown to become a trusted platform
            for travelers and hosts alike.
          </p>

          {/* Customer Testimonials */}
          <h3 className="mt-10 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Customer Testimonials
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear what our satisfied customers have to say about their
            experiences with Holidaze.
          </p>
          <blockquote className="mt-8 border-l-4 border-accent pl-4 text-lg italic text-gray-600">
            "Holidaze made our vacation unforgettable. The venue was stunning,
            and the booking process was seamless."
          </blockquote>
          <p className="mt-2 text-base leading-6 text-gray-600">
            - John & Jane Doe
          </p>

          {/* Contact Information */}
          <h3 className="mt-10 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions or need assistance? Reach out to our support team at{" "}
            <a href="mailto:support@holidaze.com" className="text-accent">
              support@holidaze.com
            </a>{" "}
            or call us at +47 123 45 678.
          </p>
        </div>
      </div>

      {/* CEO Section */}
      <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32">
        <div className="bg-accent pb-20 sm:pb-24 xl:pb-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  alt="A man leaning on a railing looking out at the sea"
                  src={imgPetterNikolai}
                  className="hidden xl:block inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                />
                <img
                  alt="A man leaning on a railing looking out at the sea"
                  src={imgPetterLandscape}
                  className="xl:hidden inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <blockquote className="text-xl/8 font-semibold text-black sm:text-2xl/9">
                  <p>
                    Holidaze is a company that offers a wide range of holiday
                    accommodations, including hotels, guest houses, and bed and
                    breakfasts. We are committed to providing our customers with
                    the best possible service and ensuring they have a memorable
                    and enjoyable holiday experience.
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-black">
                    Petter-Nikolai Kristoffersen
                  </div>
                  <div className="mt-1 text-gray-600">CEO of Holidaze</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />
    </>
  );
}
