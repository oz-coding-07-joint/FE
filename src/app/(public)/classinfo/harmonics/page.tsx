"use client";

import Image from "next/image";
import Harmony from "../../../../assets/images/harmony.jpg";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";

import api from "@/api/api";
import { isAxiosError } from "axios";
import { useModalStore } from "@/store/useModalStore";

interface ResponseDataType {
  detail: string;
}

const ClassDetailPage = () => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const handleRegistrationClick = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      openModal( "login" ); // Zustand 기반 로그인 모달 열기
      return;
    }
    
    try {
      const response = await api.post<ResponseDataType>(
        "registrations/enrollment/1/"
      );
      // 201 성공 처리
      // response.data.detail;
      if (response.status === 201) {
        alert("수강 신청이 완료 되었습니다.");
      }

      // console.log(response);
      openModal("registration");
    } catch (error) {
      if (isAxiosError<ResponseDataType>(error)) {
        if (error.response) {
          // status 값에 따른 처리
          // 에러처리 로직
          switch (error.response.status) {
            // 400 : 이미 수강 신청이 되었습니다.
            case 400:
              alert("이미 수강 신청이 되었습니다.");
              openModal("registration");
              break;

            // 401 : 비로그인
            case 401:
              alert("로그인이 필요합니다.");
              break;

            // 403 : 수강생 아님
            case 403:
              alert("수강생만 신청할 수 있습니다.");
              break;

            // 404 : 요청주소 에러 ( 404, 500 한번에 처리)
            // 500 : 서버 에러
            default:
              alert(
                "알수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요"
              );
          }
        } else {
          alert("네트워크 오류가 발생했습니다.");
        }
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="bg-primary-900 flex-grow h-full pt-40 flex flex-col items-center gap-12 text-white ">
        <span className="text-white text-[40px] text-center">
          클래식 화성학
        </span>
        <div className="w-[1000px] flex flex-col items-center gap-5">
          <span className="text-white text-2xl font-semibold">
            합격을 향한 첫걸음!
          </span>
          <span className="text-white text-xl lg:text-2xl font-thin text-center leading-8">
            전문적인 커리큘럼과 맞춤형 지도로 클래식 작곡 입시를 준비하세요.
            <br />
            입시 준비는 체계적인 학습이 핵심입니다.
            <br />
            클래식 작곡과 입시를 위한 작곡, 화성학, 피아노, 시창·청음을 완벽하게
            준비할 수 있도록 도와드립니다!
          </span>
        </div>
        <div className="bg-cover">
          <Image
            src={Harmony}
            alt="harmony image"
            className="w-[700px] h-[400px] lg:w-[1200px] lg:h-[600px] flex items-start rounded-lg object-cover object-top"
          />
        </div>
        <div className="w-[700px] lg:w-[1200px] flex flex-col gap-8 mt-10 pl-5">
          <span className="text-yellow-400 font-bold text-[30px]">
            화성학 (음악 이론의 기초부터 심화까지)
          </span>
          <span className="font-semibold text-2xl lg:text-[30px]">
            강좌의 장점
          </span>
          <ul className="text-lg lg:text-2xl list-disc list-inside leading-8">
            <li>맞춤형 1:1 레슨: 개개인의 수준에 맞춘 커리큘럼으로 진행</li>
            <li>
              경력 15년 이상의 전문 강사진: 서울대 및 서울예고 출신 강사와 함께
              체계적 학습
            </li>
            <li>
              실전 대비 모의 시험: 실제 입시와 유사한 환경에서 모의 시험을 통해
              실전 감각을 익힙니다.
            </li>
          </ul>

          <span className="font-semibold text-2xl lg:text-[30px] mt-10">
            수업 안내
          </span>
          <ul className="text-lg lg:text-2xl list-disc list-inside leading-8">
            <li>맞춤형 1:1 레슨: 개개인의 수준에 맞춘 커리큘럼으로 진행</li>
            <li>
              경력 15년 이상의 전문 강사진: 서울대 및 서울예고 출신 강사와 함께
              체계적 학습
            </li>
            <li>
              실전 대비 모의 시험: 실제 입시와 유사한 환경에서 모의 시험을 통해
              실전 감각을 익힙니다.
            </li>
          </ul>
        </div>
        {/* footer */}
        <div
          className="sticky bottom-0 text-black bg-white w-[900px] lg:w-[1200px] h-[100px]  my-10 bg-opacity-80
        flex justify-center items-center rounded-md gap-52 lg:gap-96"
        >
          <div className="flex flex-col text-2xl">
            <span className="font-bold text-2xl text-muted-600">
              화성학 온라인 강의
            </span>
            <span className="text-muted-400 text-lg">
              수강기간: 2025. 02. 01 ~ 2025. 02.28 / 수강료 330,000원
            </span>
          </div>
          <Button
            label="수강신청하기"
            size="large"
            variant="primary"
            onClick={handleRegistrationClick}
          />
        </div>
      </div>
    </>
  );
};

export default ClassDetailPage;
