import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="custom-height">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
