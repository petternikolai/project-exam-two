import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout wraps the application with a consistent header and footer layout.
 * It renders the `Header` at the top, `Footer` at the bottom, and the main content in between.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered between the header and footer.
 *
 * @returns {JSX.Element} A layout component with a header, main content area, and footer.
 */
const Layout = ({ children }) => {
  return (
    <>
      {/* Application header */}
      <Header />
      {/* Main content area */}
      <main className="custom-height">{children}</main>
      {/* Application footer */}
      <Footer />
    </>
  );
};

export default Layout;
