import React from "react";
import Header from "./_components/Header";
import RegistrationModal from "./_components/RegistrationModal";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <RegistrationModal />
    </div>
  );
}
