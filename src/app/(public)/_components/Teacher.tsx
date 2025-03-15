import Image from "next/image";
import Teacherimg from "../../../assets/images/teacher.jpg";

export default function Teacher() {
  return (
    <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-20 pt-[150px]">
      <div className="text-white text-4xl">
        <span className="text-accent-200">서울대 / 서울예고 </span>
        <span>출신 강사의 전문적인 강의</span>
      </div>
      <div className="flex border rounded-md w-auto h-[600px] p-10 text-white gap-28">
        <div className="flex flex-col gap-28">
          <div className="text-[40px] lg:text-[60px] text-white opacity-25 flex flex-col gap-1 lg:gap-7 pt-10">
            <span>HONG</span>
            <span className="leading-9">GIL DONG</span>
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
          <div className="flex flex-col justify-end items-end gap-2 lg:gap-3 pb-[20px]">
            <span className="text-[25px] lg:text-[30px] font-semibold flex items-end">
              홍길동 강사
            </span>
            <span className="font-normal text-lg lg:text-xl">
              클래식 화성학
            </span>
          </div>
          <div className="flex flex-col bg-cover w-[320px] lg:w-[400px] lg:h-[500px] bg-center ml-4">
            <Image
              src={Teacherimg}
              alt="teacherimg"
              className="w-[400px] h-[500px] flex items-start object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
