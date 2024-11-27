import TextInput from "../form/TextInput";

/**
 * ProfileUpdateForm renders a form for updating the user's profile.
 * It includes fields for avatar URL, bio, and venue manager status.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The current state of the form data.
 * @param {Function} props.handleChange - Callback function for handling input changes.
 * @param {Function} props.handleSelectChange - Callback function for handling dropdown selection changes.
 * @param {Function} props.handleSubmit - Callback function for handling form submission.
 * @param {boolean} props.isLoading - Indicates whether the form is in a loading state.
 *
 * @returns {JSX.Element} A user profile update form component.
 */
export default function ProfileUpdateForm({
  formData,
  handleChange,
  handleSelectChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <form className="md:col-span-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        {/* Avatar Section */}
        <div className="col-span-full flex items-center gap-x-8">
          <img
            alt="User Avatar"
            src={formData.avatar || "https://via.placeholder.com/256"}
            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
          <div>
            {/* Avatar URL input */}
            <TextInput
              id="avatar"
              name="avatar"
              type="text"
              label="Avatar URL"
              value={formData.avatar}
              onChange={handleChange}
            />
            <p className="mt-2 text-xs/5 text-gray-400">
              Must be a fully formed URL that links to a live and publicly
              accessible image.
            </p>
          </div>
        </div>

        {/* Bio Section */}
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

        {/* Venue Manager Section */}
        <div className="col-span-full">
          <label
            htmlFor="venueManager"
            className="block text-sm/6 font-medium text-black"
          >
            Venue Manager
          </label>
          <div className="mt-2">
            {/* Dropdown for venue manager selection */}
            <select
              id="venueManager"
              name="venueManager"
              value={formData.venueManager ? "Yes" : "No"} // Boolean -> String
              onChange={handleSelectChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex">
        <button
          type="submit"
          className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
