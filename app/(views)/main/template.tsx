import LeftMenu from "./_layout/LeftMenu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div id="main-body-div" className="row align-items-start">
      <LeftMenu />
      {children}
    </div>
  );
}
