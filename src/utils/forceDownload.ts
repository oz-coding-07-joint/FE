// utils/forceDownload.ts
export const forceDownload = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("❌ 파일 다운로드 실패:", error);
  }
};
