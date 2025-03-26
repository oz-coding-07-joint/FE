export const getFileNameFromUrl = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      return decodeURIComponent(pathname.substring(pathname.lastIndexOf('/') + 1));
    } catch {
      return '첨부파일';
    }
  };
  