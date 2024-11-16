import ProfileForm from "../admin/ProfileUpdateForm";
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
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Personal Information
            </h1>
            <p className="mt-2 text-lg text-gray-500">
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
