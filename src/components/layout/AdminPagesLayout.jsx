import Notification from "../notification/Notification";

/**
 * AdminPagesLayout provides a structured layout for admin pages.
 * It includes a main content area and an optional notification section.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page, used for accessibility.
 * @param {React.ReactNode} props.children - The content to display in the main section.
 * @param {Object} [props.notificationProps] - Optional props for the Notification component.
 * @param {Object} [props.notificationProps.showNotification] - Controls whether the notification is visible.
 * @param {Function} [props.notificationProps.setShowNotification] - Function to toggle the notification visibility.
 *
 * @returns {JSX.Element} A layout component with main content and notifications.
 */
const AdminPagesLayout = ({ title, children, notificationProps }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {/* Main Content Section */}
          <main>
            <h1 className="sr-only">{title}</h1>
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Notification Section */}
      {notificationProps && (
        <Notification
          showNotification={notificationProps.showNotification}
          setShowNotification={notificationProps.setShowNotification}
        />
      )}
    </>
  );
};

export default AdminPagesLayout;
