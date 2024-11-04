import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen home-background">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
