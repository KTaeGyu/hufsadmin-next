import "simple-line-icons/css/simple-line-icons.css";
import "./_assets/css/intro.css";
import Offer from "./_components/Offer";

export default function Home() {
  const offers = [
    {
      icon: "icon-user-following",
      title: "전자출결시스템 관리/조회",
      description: "전자출결시스템 관리 및 조회 기능 제공",
      useage: ["학사종합지원센터(양 캠퍼스)", "교무행정팀(양 캠퍼스)"],
    },
    {
      icon: "icon-calendar",
      title: "대학원 전자출결시스템 휴보강 관리",
      description: "대학원 전자출결시스템 휴보강 관리 기능 제공",
      useage: [
        "일반대학원",
        "TESOL대학원",
        "KFL대학원",
        "국제지역대학원",
        "경영대학원",
        "법학전문대학원",
        "교육대학원",
        "통번역대학원",
        "행정언론대학원",
      ],
    },
    {
      icon: "icon-screen-desktop",
      title: "온라인교육시스템 관리",
      description: "온라인교육시스템 관리 기능 제공",
      useage: ["인권센터", "외국인유학생종합지원센터", "HUFSDorm운영팀(글로벌)", "한문원", "인사팀", "교무행정팀"],
    },
    {
      icon: "icon-bubble",
      title: "학생상담센터 관리",
      description: "학생 상담 관리 기능 제공",
      useage: ["학생상담센터(양 캠퍼스)"],
    },
    {
      icon: "icon-link",
      title: "URL 생성 관리",
      description: "URL 생성 및 관리 기능 제공",
      useage: ["총괄지원팀(글로벌)"],
    },
  ];

  return (
    <div id="right-intro-div" className="col" style={{ overflowY: "scroll" }}>
      <section className="content-section bg-primary text-white text-center" id="services">
        <div className="container px-4 px-lg-5 text-center">
          <h2 className="mx-auto mb-4">
            <strong>한국외대 관리자 시스템</strong>에 오신 것을 환영합니다.
          </h2>
          <blockquote className="blockquote mb-5 m-auto" style={{ maxWidth: "70%" }}>
            <p className="mb-0">
              한국외대 관리자 시스템은 행정 부서 관리자 선생님들을 위해 정보시스템팀에서 개발한 다양한 행정지원 시스템의 관리 기능들을 한 곳에 모아
              놓은 시스템입니다.
            </p>
          </blockquote>
        </div>
        <div className="container px-4 px-lg-5">
          <div className="content-section-heading">
            <h3 className="text-secondary mb-0">Services</h3>
            <h2 className="mb-5">What We Offer</h2>
          </div>
          <div className="row gx-4 gx-lg-5">
            {offers.map((offer, idx) => (
              <Offer key={idx} {...offer} />
            ))}
          </div>
          <p className="mb-0 text-left text-warning">※ 추가로 권한이 필요하신 경우 정보시스템팀으로 문의 바랍니다.</p>
        </div>
      </section>
      <footer className="footer text-center">
        <div className="container px-4 px-lg-5">
          <p className="mb-0">
            <strong>정보처 정보시스템팀</strong>
          </p>
        </div>
      </footer>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
