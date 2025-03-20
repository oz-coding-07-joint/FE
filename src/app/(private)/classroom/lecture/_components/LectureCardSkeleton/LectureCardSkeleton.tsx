import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LectureCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border h-[280px] w-[280px] p-6">
      <Skeleton height={160} className="mb-5" />

      <Skeleton count={2} className="mt-1" />
    </div>
  );
}

export default LectureCardSkeleton;
