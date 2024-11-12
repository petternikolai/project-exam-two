import ProfileForm from "../components/common/ProfileForm";
import Bookings from "../pages/Bookings";
import Venues from "../pages/MyVenues";

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
        <>
          <div className="col-span-1">
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
        </>
      );
    case "Bookings":
      return <Bookings />;
    case "Venues":
      return <Venues />;
    default:
      return null;
  }
}
