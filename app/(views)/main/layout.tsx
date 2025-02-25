import "./_assets/css/main.css";
import "./_assets/fontawesome-6-pro/css/all.min.css";
import Header from "./_components/Header";
import LeftMenu from "./_components/LeftMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="align-items-start">
      <div id="main-container-div" className="container-fluid">
        <Header />
        <div id="main-body-div" className="row align-items-start">
          <LeftMenu />
          {children}
        </div>
      </div>
    </div>
  );
}
