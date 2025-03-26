export default function Footer() {
  return (
    <div>
      <div className="h-[180px] py-5 text-white font-normal bg-[#121C30] text-sm px-10 flex flex-col gap-6">
        <div className="flex flex-col leading-6">
          <div>
            <span className="font-semibold">사업자명</span>
            <span> : 음악더하기</span>
            <span className="font-semibold">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대표자
            </span>
            <span> : 김진성</span>
          </div>
          <div>
            <span className="font-semibold">사업장주소</span>
            <span> : 서울 광진구 천호대로118길 50 2층</span>
            <span className="font-semibold">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대표번호
            </span>
            <span> : 0507-1352-4682</span>

            <span className="font-semibold">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이메일
            </span>
            <span> : jinseongkim@addmusicplus.com</span>
          </div>
          <div className="flex flex-row">
            <span className="font-semibold">사업자등록번호</span>
            <span>&nbsp;: 450-20-01366</span>
            <span className="font-semibold">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;통신판매업자번호
            </span>
            <span>&nbsp;: (준비중)</span>
          </div>
        </div>
        <div>COPYRIGHT @2025 소리상상</div>
      </div>
    </div>
  );
}
