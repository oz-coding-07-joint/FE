import Image from "next/image";

import Logoimg from "../../assets/images/logo.png";
import Teacher from "../../assets/images/teacher.jpg";
// import mainImg from "../../assets/images/main.jpg";

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

      {/* main */}
      <div className="relative h-[1080px] flex justify-center items-center ">
        {/* 배경 이미지 + 투명도 적용 */}
        <div className="absolute inset-0 bg-mainImage bg-cover bg-no-repeat bg-center opacity-50"></div>

        <div className="relative flex flex-col gap-6 items-center">
          <span className="text-white text-7xl font-medium">
            더 높은 곳으로,
          </span>
          <span className="text-accent-200 text-7xl">소리상상</span>
        </div>
        {/* 텍스트 콘텐츠 */}
      </div>

      {/* features */}
      <div className="w-dvw h-[1080px] flex flex-col justify-center items-center gap-[80px] pt-[150px] text-white">
        <span className="text-4xl block text-center">소리상상 특장점</span>
        <div className="flex gap-[50px] h-[700px] pt-12">
          {/* 특장점 01 */}
          <div className="bg-[#051637] w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
            <span className="font-bold text-[50px] opacity-50 m-10">#01</span>
            <div className="flex flex-col justify-center items-center font-bold text-3xl">
              <span>음대임시를 위한</span>
              <span>전문교육</span>
            </div>
            <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
              음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
              최대 넓이는 250PX입니다.
            </span>
          </div>
          {/* 특장점 02 */}
          <div className="bg-[#4c6189] w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
            <span className="font-bold text-[50px] opacity-50 m-10">#02</span>
            <div className="flex flex-col justify-center items-center font-bold text-3xl">
              <span>전문 강사진</span>
              <span>1:1 튜터링</span>
            </div>
            <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
              음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
              최대 넓이는 250PX입니다.
            </span>
          </div>
          <div className="bg-accent-400 w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
            <span className="font-bold text-[50px] opacity-50 m-10">#03</span>
            <div className="flex flex-col justify-center items-center font-bold text-3xl">
              <span>공간제약 없는</span>
              <span>온라인 교육</span>
            </div>
            <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
              음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
              최대 넓이는 250PX입니다.
            </span>
          </div>
        </div>
      </div>

      {/* teacher */}
      <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-20 pt-[150px]">
        <div className="text-white text-4xl">
          <span className="text-accent-200">서울대 / 서울예고 </span>
          <span>출신 강사의 전문적인 강의</span>
        </div>
        <div className="flex border rounded-md w-auto h-[600px] p-10 text-white gap-28">
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
            <div className="flex flex-col bg-cover w-[400px] h-[500px] bg-center ml-4">
              <Image
                src={Teacher}
                alt="Logo"
                className="w-[400px] h-[500px] flex items-start "
              />

            </div>
          </div>
        </div>
      </div>

      {/* class */}
      <div className="h-[1080px] flex flex-col justify-center items-center gap-5">
        <span className="text-white text-4xl mb-10">
          온라인 음악교육 클래스
        </span>
        <div className="flex flex-col text-white w-[1080px]">
          <span className="text-3xl mb-3">화성학</span>
          <span className="font-normal mb-10">
            클래식 화성학에 대한 강의 정보가 들어갑니다.클래식 화성학에 대한
            강의 정보가 들어갑니다.클래식 화성학에 대한 강의 정보가
            들어갑니다.클래식 화성학에 대한 강의 정보가 들어갑니다. 간단한
            강의소개도 함께 들어갑니다.
          </span>
        </div>
        <div className="flex gap-10 w-[1080px]">
          <div className="flex flex-col justify-start gap-8">
            <Image
              src={Teacher}
              alt="Logo"
              className="w-[660px] h-[400px] flex items-start rounded-lg"
            />
            <span className="text-white font-normal">
              <li>수강기간 : </li>
              <li>수강인원 : </li>
              <li>강사 : </li>
            </span>
          </div>
          <div className="w-[500px] text-white flex flex-col">
            <span>교육과정 안내</span>
            <label>
              <select
                name="class-name"
                className="w-[500px] h-[50px] text-[#666666] pl-5 rounded-lg border-white bf-none"
              >
                <option value="화성학의 기초">화성학의 기초</option>
              </select>
            </label>
            <div className="border border-solid font-thin w-[500px0] h-52 mt-8 p-4">
              <span>강의 과정 뜨는곳</span>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                className="text-center w-[500px] h-12
              rounded-xl bg-yellow text-black "
              >
                강의 자세히 보러가기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* review */}
      <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-5">
        <span className="text-white text-4xl mb-10">수강생 후기</span>

        <div className="w-[1200px] md:w-3/4 sm:w-1/2 h-60 bg-white rounded-xl p-6 flex flex-row">
          <div className="bg-gray-400 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0"></div>

          <div className="flex flex-col font-normal ml-5">
            <div className="flex justify-between pt-3">
              <span className="font-bold mb-2"> 수강생 이름</span>
              <span className="text-2xl">⭐︎⭐︎⭐︎⭐︎⭐︎</span>
            </div>
            <span className="text-base text-navy] pb-1">
              클래식 화성학 1기 수강행
            </span>
            <hr />
            <span className="line-clamp-3 overflow-hidden text-ellipsis p-2">
              강의에 대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고
              짧아질 수 도 있습니다. 한번에 몇명이나 표시하는게 좋을까요..강의에
              대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질 수 도
              있습니다.한번에 몇명이나 표시하는게 좋을까요..강의에 대한 평가
              내용이 들어갑니다.
            </span>
          </div>
        </div>
        <div className="w-[1200px] md:w-3/4 sm:w-1/2 h-60 bg-white rounded-xl p-6 flex flex-row">
          <div className="bg-gray-400 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0"></div>
          <div className="flex flex-col font-normal ml-5">
            <div className="flex justify-between pt-3">
              <span className="font-bold mb-2"> 수강생 이름</span>
              <span className="text-2xl">⭐︎⭐︎⭐︎⭐︎⭐︎</span>
            </div>
            <span className="text-base text-navy] pb-1">
              클래식 화성학 1기 수강행
            </span>
            <hr />
            <span className="line-clamp-3 overflow-hidden text-ellipsis p-2">
              강의에 대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고
              짧아질 수 도 있습니다. 한번에 몇명이나 표시하는게 좋을까요..강의에
              대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질 수 도
              있습니다.한번에 몇명이나 표시하는게 좋을까요..강의에 대한 평가
              내용이 들어갑니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
