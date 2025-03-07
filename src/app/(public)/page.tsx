import Mainpage from "./_components/Mainpage";
import Features from "./_components/Features";
import Teacher from "./_components/Teacher";
import Class from "./_components/Class";
import Review from "./_components/Review";

export default function MainPage() {
  return (
    <div className="bg-primary-900 w-dvw flex flex-col text-xl font-bold">
      <Mainpage />
      <Features />
      <Teacher />
      <Class />
      <Review />
    </div>
  );
}
