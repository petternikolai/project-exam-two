import SecondaryNavigation from "../common/SecondaryNavigation";
import Notification from "../common/Notification";

export default function CommonLayout({
  secondaryNavigation,
  handleNavClick,
  selectedNav,
  renderContent,
  showNotification,
  handleCloseNotification,
}) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <main>
            <h1 className="sr-only">{selectedNav}</h1>
            <SecondaryNavigation
              secondaryNavigation={secondaryNavigation}
              handleNavClick={handleNavClick}
            />
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Notification
        showNotification={showNotification}
        setShowNotification={handleCloseNotification}
      />
    </>
  );
}
