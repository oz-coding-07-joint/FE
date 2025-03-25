import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./_providers/AuthProvider";
import LoginModal from "./(auth)/_components/LoginModal";

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
    <html lang="en">
      <body
        className="font-Pretendard"
      >
        <AuthProvider>
          {children}
          <LoginModal />
        </AuthProvider>
      </body>
    </html>
  );
}
