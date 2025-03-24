import { Suspense } from "react";
import KakaoCallback from "../../_components/KakaoCallback";

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<p>로그인 처리 중입니다...</p>}>
      <KakaoCallback />
    </Suspense>
  );
}
