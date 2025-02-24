import Image from "next/image";

export default function Title() {
  return (
    <div className="">
      <Image src="/img/symbol_navy-bold.gif" alt="symbol_navy-bold" width={38} height={38} />
      <h2 className="">한국외대 </h2>
      <h3 className="">관리자 시스템</h3>
    </div>
  );
}
