import "./_assets/css/main.css";
import "./_assets/fontawesome-6-pro/css/all.min.css";
import Header from "./_layouts/Header";
import ScrollToTop from "./_layouts/ScrollToTop";
import SideBar from "./_layouts/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="align-items-start">
      <div id="main-container-div" className="container-fluid">
        <Header />
        <div id="main-body-div" className="row align-items-start">
          <SideBar />
          {children}
          <ScrollToTop />
        </div>
      </div>
    </div>
  );
}
