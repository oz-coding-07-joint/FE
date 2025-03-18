"use client";
// import { PhoneIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <div>
      <div className="py-5 text-white font-normal flex flex-row justify-center items-center">
        <div className="flex justify-between items-center px-10">
          <span className="text-lg pr-5">
            모두의 <br />
            음악의 힘, <br />
            그 상상의
            <br />더 위로.
          </span>
        </div>
        <div className="text-sm text-muted-200 flex-1">
          <p>상호 : 음악 더하기</p>
          <p>대표자 : 김진성</p>
          <p>사업장주소: 서울 광진구 천호대로118길 50 2층</p>
          <p>사업자등록번호: 450-20-01366</p>
          <p>이메일: jinseongkim@addmusicplus.com</p>
        </div>
        <div className="leading-8 pr-20">
          <p>고객센터</p>
          <div className="flex flex-row gap-2 items-center">
            {/* <PhoneIcon className="w-6 h-6 text-white" /> */}
            <p>0507-1352-4682</p>
          </div>
        </div>
      </div>
    </div>
  );
}
