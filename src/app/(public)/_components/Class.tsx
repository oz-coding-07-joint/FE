"use client";
import Image from "next/image";
import Classimg from "../../../assets/images/classimg.jpg";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
// import VideoPlayer from "@/app/(private)/_components/lecture/VideoPlayer";

export default function Class() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const courseData = [
    {
      title: "화성학의 기초",
      lectures: [
        "01. 동영상 강의명이 들어갑니다.",
        "02. 동영상 강의명이 들어갑니다.",
        "03. 동영상 강의명이 들어갑니다.",
      ],
    },
    {
      title: "화성학의 기초2",
      lectures: [
        "01. 동영상 강의명이 들어갑니다.",
        "02. 동영상 강의명이 들어갑니다.",
        "03. 동영상 강의명이 들어갑니다.",
      ],
    },
    {
      title: "화성학 실습",
      lectures: [],
    },
    {
      title: "화성학 실습",
      lectures: [],
    },
  ];

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
      <div className="flex justify-center gap-10 w-[700px] lg:w-[1080px]">
        <div className="flex flex-col justify-start gap-8">
          {/* <div className="w-[400px] lg:w-[550px] h-[400px] rounded-lg">
            <VideoPlayer
              videoUrl={"https://youtu.be/GnvztDUhH3w"}
              chapterVideoId={null}
            />
          </div> */}
          <Image
            src={Classimg}
            alt="Logo"
            className="w-[400px] lg:w-[660px] h-[400px] flex items-start rounded-lg object-cover object-top"
          />
          <div>
            <ul className="text-white font-normal lg:text-xl text-lg list-disc list-inside">
              <li>수강기간 : </li>
              <li>수강인원 : </li>
              <li>강사 : </li>
            </ul>
          </div>
        </div>

        {/* 교육과정 */}
        <div className="w-[500px] text-white flex flex-col gap-2 ">
          <span className="text-2xl font-normal mb-3">교육과정 안내</span>

          {/* 목록   */}
          <div className="w-full text-white flex flex-col gap-2 font-normal text-lg items-center">
            <div className="h-[350px] mb-3 flex  flex-col gap-1">
              {courseData.map((course, index) => (
                <div key={index} className="relative w-[350px] lg:w-[500px]">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full h-[50px] px-5 rounded-sm border border-white text-white font-normal text-left flex justify-between items-center"
                  >
                    {course.title}
                    <ChevronDownIcon
                      className={`w-6 h-6 text-white transform transition-transform ${
                        openIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openIndex === index && course.lectures.length > 0 && (
                    <div className="border border-white p-4 mt-1 rounded-sm">
                      {course.lectures.map((lecture, idx) => (
                        <p key={idx} className="leading-7">
                          {lecture}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center h-24">
              <button
                className="text-center w-[350px] lg:w-[500px] h-14 bg-white
              rounded-sm bg-yellow text-muted-600 font-semibold cursor-pointer"
              >
                강의 자세히 보러가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
