"use client";
import Image from "next/image";
import Classimg from "../../../assets/images/classimg.jpg";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Class() {
  const [selectedCourse, setSelectedCourse] = useState<string>("화성학의 기초");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <div className="relative w=[350px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full h-[50px] text-muted-400 pl-5 pr-10 rounded-lg border border-white bg-white text-left flex justify-between items-center font-semibold"
            >
              {selectedCourse}
              <ChevronDownIcon
                className={`w-6 h-6 text-gray-700 transform transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {/* 드롭다운 리스트 */}
            {isOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-opacity opacity-100 z-10 text-muted-400 font-semibold">
                <li
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCourse("화성학의 기초");
                    setIsOpen(false);
                  }}
                >
                  화성학의 기초
                </li>
                <li
                  className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCourse("고급 화성학");
                    setIsOpen(false);
                  }}
                >
                  고급 화성학
                </li>
              </ul>
            )}
          </div>

          {/* <select
              name="class-name"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-[350px] lg:w-[500px] h-[50px] text-[#666666] pl-5 rounded-lg border-white bg-none appearance-none after:content-['▼'] after:absolute after:right-5"
            >
              <option value="화성학의 기초">화성학의 기초</option>
              <option value="고급 화성학">고급 화성학</option>
            </select> */}
          {/* Heroicons 화살표 아이콘 */}
          {/* <ChevronDownIcon className="absolute right-4 top-1/2 w-6 h-6 text-black transform -translate-y-1/2 pointer-events-none" />
          </div> */}

          <div className="border border-solid font-thin w-[350px] lg:w-[500px] h-52 mt-8 p-4">
            <span className="font-medium">선택된 과정 : {selectedCourse}</span>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="text-center w-[350px] lg:w-[500px] h-12 bg-white
              rounded-xl bg-yellow text-black hover:bg-primary-800 hover:text-white"
            >
              강의 자세히 보러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
