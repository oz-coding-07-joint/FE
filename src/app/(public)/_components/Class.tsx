import Image from "next/image";
import Classimg from "../../../assets/images/classimg.jpg";

export default function Class() {
  return (
    <div className="h-[1080px] flex flex-col justify-center items-center gap-5">
      <span className="text-white text-4xl mb-10">온라인 음악교육 클래스</span>
      <div className="flex flex-col text-white w-[700px] lg:w-[1080px]">
        <span className="text-2xl lg:text-3xl mb-3">화성학</span>
        <span className="font-normal text-lg lg:text-xl mb-10">
          클래식 화성학에 대한 강의 정보가 들어갑니다.클래식 화성학에 대한 강의
          정보가 들어갑니다.클래식 화성학에 대한 강의 정보가 들어갑니다.클래식
          화성학에 대한 강의 정보가 들어갑니다. 간단한 강의소개도 함께
          들어갑니다.
        </span>
      </div>
      <div className="flex gap-10 w-[700px] lg:w-[1080px]">
        <div className="flex flex-col justify-start gap-8">
          <Image
            src={Classimg}
            alt="Logo"
            className="w-[400px] lg:w-[660px] h-[400px] flex items-start rounded-lg object-cover object-top"
          />
          <span className="text-white font-normal lg:text-xl text-lg">
            <li>수강기간 : </li>
            <li>수강인원 : </li>
            <li>강사 : </li>
          </span>
        </div>
        <div className="w-[500px] text-white flex flex-col">
          <span>교육과정 안내</span>
          {/* <label> */}
          <select
            name="class-name"
            className="w-[350px] lg:w-[500px] h-[50px] text-[#666666] pl-5 rounded-lg border-white bf-none appearance-none"
          >
            <option value="화성학의 기초">화성학의 기초</option>
            <option value="고급 화성학">고급 화성학</option>
          </select>
          {/* </label>__ */}
          <div className="border border-solid font-thin w-[350px] lg:w-[500px] h-52 mt-8 p-4">
            <span>강의 과정 뜨는곳</span>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="text-center w-[350px] lg:w-[500px] h-12 bg-white
              rounded-xl bg-yellow text-black "
            >
              강의 자세히 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
