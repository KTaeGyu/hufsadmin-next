import "./_assets/css/index.css";
import SigninForm from "./_components/SigninForm";
import Title from "./_components/Title";

export default function Home() {
  return (
    <div className="text-center">
      <div className="form-signin">
        <Title />
        <SigninForm />
      </div>
    </div>
  );
}
