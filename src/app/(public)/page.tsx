import Mainpage from "./_components/Mainpage";
import Features from "./_components/Features";
import Teacher from "./_components/Teacher";
import Class from "./_components/Class";
import Review from "./_components/Review";
import Footer from "./_components/Footer";
import Explanation from "./_components/Explanation";

export default function MainPage() {
  return (
    <div className="bg-primary-900 flex flex-col text-xl font-bold">
      <Mainpage />
      <Explanation />
      <Features />
      <Teacher />
      <Class />
      <Review />
      <Footer />
    </div>
  );
}
