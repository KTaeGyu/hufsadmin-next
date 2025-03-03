import "simple-line-icons/css/simple-line-icons.css";
import "./_assets/css/intro.css";
import Footer from "./_components/Footer";
import Offer from "./_components/Offer";
import SubTitle from "./_components/SubTitle";
import Title from "./_components/Title";
import { OFFERS } from "./_constants/offers";

export default function Home() {
  return (
    <div id="right-intro-div" className="col" style={{ overflowY: "scroll" }}>
      <section className="content-section bg-primary text-white text-center" id="services">
        <Title />
        <div className="container px-4 px-lg-5">
          <SubTitle />
          <div className="row gx-4 gx-lg-5">
            {OFFERS.map((offer, idx) => (
              <Offer key={idx} {...offer} />
            ))}
          </div>
          <p className="mb-0 text-left text-warning">※ 추가로 권한이 필요하신 경우 정보시스템팀으로 문의 바랍니다.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
