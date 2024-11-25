import Notification from "../common/Notification";

const AdminPagesLayout = ({ title, children, notificationProps }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {/* Main Content */}
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
