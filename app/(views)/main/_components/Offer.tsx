interface Props {
  icon: string;
  title: string;
  description: string;
  useage: string[];
}

export default function Offer({ icon, title, description, useage }: Props) {
  return (
    <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
      <span className="service-icon rounded-circle mx-auto mb-3">
        <i className={icon}></i>
      </span>
      <h5>
        <strong>{title}</strong>
      </h5>
      <p className="text-faded mb-0 text-left mb-1">
        <i className="fa-solid fa-caret-right"></i> {description}
      </p>
      <p className="text-faded mb-0 text-left" style={{ fontSize: 14 }}>
        <i className="fa-solid fa-caret-right"></i> 사용 부서 : {useage.join(", ")}
      </p>
    </div>
  );
}
