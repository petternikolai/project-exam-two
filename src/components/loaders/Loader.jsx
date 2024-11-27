/**
 * Loader displays a full-screen loading spinner with a message.
 * It is used to indicate that content is being loaded.
 *
 * @returns {JSX.Element} A full-screen loader component.
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animation */}
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>

        {/* Loading message */}
        <p className="text-lg font-medium text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
