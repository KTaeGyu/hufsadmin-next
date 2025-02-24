import Image from "next/image";

export default function Title() {
  return (
    <div className="text-left">
      <Image src="/img/symbol_navy-bold.gif" alt="symbol_navy-bold" width={38} height={38} />
      <h2 className="d-inline hufs-primary-fg hufs-font-b align-bottom">한국외대 </h2>
      <h3 className="d-inline hufs-font-m align-bottom">관리자 시스템</h3>
    </div>
  );
}
