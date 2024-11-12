import ProfileForm from "./ProfileUpdateForm";
import Bookings from "../../pages/Bookings";
import Venues from "../../pages/MyVenues";

export default function RenderContent({
  selectedNav,
  formData,
  handleChange,
  handleSelectChange,
  handleSubmitWrapper,
  isLoading,
}) {
  switch (selectedNav) {
    case "Profile":
      return (
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

            <ProfileForm
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmitWrapper}
              isLoading={isLoading}
            />
          </div>
        </div>
      );
    case "Bookings":
      return <Bookings />;
    case "Venues":
      return <Venues />;
    default:
      return null;
  }
}
