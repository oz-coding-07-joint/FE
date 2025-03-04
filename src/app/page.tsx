import Image from "next/image";
import Logoimg from "../assets/logo.png";
import Teacher from "../assets/teacher.jpg";

export default function MainPage() {
  return (
    <div className="bg-[#192845] w-dvw flex flex-col text-xl font-bold">
      {/* header */}
      <div
        className="bg-[#131723] w-dvw h-24 text-center fixed shadow-white shadow-sm flex items-center justify-between bg-opacity-80
      text-white pl-10"
      >
        <Image
          src={Logoimg}
          alt="Logo"
          className="w-[100px] flex items-start "
        />

        <div className="flex gap-3 pr-10">
          <span>강의소개</span>
          <span>강의실</span>
          <span>로그인</span>
        </div>
      </div>

      {/* main */}
      <div
        className="bg-[url(../assets/main.jpg)] bg-cover bg-no-repeat bg-center h-[1080px]
       flex justify-center items-center"
      >
        <div className="flex flex-col gap-16 items-center">
          <span className=" text-white text-[80px]">더 높은 곳으로,</span>
          <span className="text-yellow text-[80px]">소리상상</span>
        </div>
      </div>

      {/* features */}
      <div className="bg-[#394868] w-dvw h-[1080px] flex flex-col justify-center items-center gap-[80px] pt-[150px]">
        <span className=" text-white text-[40px] block text-center">
          소리상상 특장점
        </span>
        <div className="flex gap-[50px]">
          <div className="bg-[#051637] w-[355px] h-[655px] rounded-full"></div>
          <div className="bg-[#4C6189] w-[355px] h-[655px] rounded-full"></div>
          <div className="bg-[#F6B500] w-[355px] h-[655px] rounded-full"></div>
        </div>
      </div>

      {/* teacher */}
      <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-20 pt-[150px]">
        <div className="text-white text-[40px]">
          <span className="text-yellow">서울대 / 서울예고 </span>
          <span>출신 강사의 전문적인 강의</span>
        </div>
        <div className="flex border rounded-[5px] w-[1080px] h-[600px] p-10 text-white gap-28">
          <div className="flex flex-col gap-28">
            <div className="text-[60px] text-white opacity-25 flex flex-col gap-7 pt-10">
              <span>HONG</span>
              <span>GIL DONG</span>
            </div>
            <div className="flex flex-col gap-28">
              <div className="flex flex-col">
                <span>학력</span>
                <span className="font-normal text-base">
                  서울대학교 클래식 음악 학사
                </span>
              </div>

              <div className="flex flex-col">
                <span>경력</span>
                <span className="font-normal text-base">
                  ~2025.01 OOO학원 강사
                </span>
              </div>
            </div>
          </div>
          {/* 강사사진 */}
          <div className="flex flex-row">
            <div className="flex flex-col justify-end items-end gap-5 pb-[20px]">
              <span className="text-[30px] font-semibold flex items-end">
                홍길동 강사
              </span>
              <span className="font-normal">클래식 화성학</span>
            </div>
            <div
              className="flex flex-col bg-cover bg-[url(../assets/teacher.jpg)]
          w-[400px] h-[500px] bg-center ml-4"
            >
              {/* <Image
              src={Teacher}
              alt="Logo"
              className="w-[400px] h-[500px] flex items-start "
            /> */}
            </div>
          </div>
        </div>
        <div>
          <div>teacher</div>
        </div>
      </div>

      {/* class */}
      <div className="h-[1080px] bg-[#ff69b4] flex justify-center items-center">
        <span className="text-white">class</span>
      </div>

      {/* review */}
      <div className="h-[1080px] bg-[#ffc0cb] flex justify-center items-center">
        <span className="text-white">review</span>
      </div>
    </div>
  );
}
