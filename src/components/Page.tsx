import { PropsWithChildren } from "react";

interface PageProps {
  title: string;
}

function Page({ title, children }: PropsWithChildren<PageProps>) {
  return (
    <div className="bg-muted-100 h-screen p-10">
      <h1 className="text-3xl font-bold pb-6">{title}</h1>

      {children}
    </div>
  );
}

export default Page;
