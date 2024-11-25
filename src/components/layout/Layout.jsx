import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="custom-height">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
