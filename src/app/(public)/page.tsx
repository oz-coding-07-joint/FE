import Image from "next/image";
import Logoimg from "../../assets/images/logo.png";
import Mainpage from "./_components/Mainpage";
import Features from "./_components/Features";
import Teacher from "./_components/Teacher";
import Class from "./_components/Class";
import Review from "./_components/Review";

export default function MainPage() {
  return (
    <div className="bg-primary-900 w-dvw flex flex-col text-xl font-bold">
      {/* header - layout로 빠지는게 좋음*/}
      <div
        className="bg-[#131723] w-dvw h-24 text-center fixed shadow-white shadow-sm flex items-center justify-between bg-opacity-90
      text-white pl-10 z-10"
      >
        <Image src={Logoimg} alt="Logo" className="w-32 flex items-start " />

        <div className="flex gap-3 pr-10">
          <span>강의소개</span>
          <span>강의실</span>
          <span>로그인</span>
        </div>
      </div>
      <Mainpage />
      <Features />
      <Teacher />
      <Class />
      <Review />
    </div>
  );
}
