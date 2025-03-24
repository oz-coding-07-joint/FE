import React from "react";
import Header from "./_components/layout/Header";
import RegistrationModal from "./_components/RegistrationModal";
import Footer from "./_components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <RegistrationModal />
    </div>
  );
}
