// utils/downloadBlob.ts
export const downloadFileBlob = async (fileUrl: string, fileName: string) => {
  try {
    const res = await fetch(fileUrl, { credentials: "include" }); // 쿠키 인증이 필요하다면 포함
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error("📂 파일 다운로드 실패:", err);
  }
};
