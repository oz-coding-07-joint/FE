import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./_providers/AuthProvider";
import LoginModal from "./(auth)/_components/LoginModal";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});


export const metadata: Metadata = {
  title: "소리상상",
  description: "음악의 상上상上을 현실로, 소리상상",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html  lang="kr" className={`${pretendard.variable}`}>
      <body
        className="font-pretendard"
      >
        <AuthProvider>
          {children}
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  );
}
