import "./_assets/css/main.css";
import "./_assets/fontawesome-6-pro/css/all.min.css";
import Header from "./_layout/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="align-items-start">
      <div id="main-container-div" className="container-fluid">
        <Header />
        {children}
      </div>
    </div>
  );
}
