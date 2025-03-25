"use client";

export default function Footer() {
  return (
    <div>
      <div className="h-[180px] py-5 text-white font-normal bg-[rgb(13,21,38)] text-sm px-10 flex flex-col gap-5">
        <div className="flex flex-col leading-6">
          <div>
            <span>사업자명 : 음악 더하기</span>
            <span>대표자 : 김진성</span>
          </div>
          <div>
            <span>사업장주소: 서울 광진구 천호대로118길 50 2층</span>
            <span>대표전화 : 0507-1352-4682</span>
            <span>이메일: jinseongkim@addmusicplus.com</span>
          </div>
          <span>사업자등록번호: 450-20-01366</span>
          <span>통신판재업자번호 : (준비중)</span>
        </div>
        <div>COPYRIGHT @2025 소리상상</div>
      </div>
    </div>
  );
}
