// import "./_assets/css/index.css";
import SigninForm from "./_components/SigninForm";
import Title from "./_components/Title";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <Title />
      <SigninForm />
    </div>
  );
}
