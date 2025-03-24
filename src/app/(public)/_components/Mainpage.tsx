import Image from "next/image";
import Logoimg from "../../../assets/images/sangsangLogo.png";

export default function Mainpage() {
  return (
    <div className="relative h-screen flex justify-center items-center ">
      {/* 배경 이미지 + 투명도 적용 */}
      <div className="absolute inset-0 bg-mainImage bg-cover bg-no-repeat bg-center opacity-40"></div>

      <div className="relative flex flex-col gap-6 items-center">
        <span className="text-white text-6xl font-normal tracking-tighter">
          음악의 상<span className="text-[#3eceff]">上</span>상
          <span className="text-[#3eceff]">上</span>을 현실로,
        </span>
        {/* <span className="text-accent-200 text-7xl"> */}
        <Image src={Logoimg} alt="logoimg" className="w-[280px]" />
        {/* </span> */}
      </div>
    </div>
  );
}
