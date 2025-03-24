import clsx from "clsx";

interface LoadingSkeletonProps {
  container?: string;
  styles?: string;
}

const LoadingSkeleton = ({ container, styles }: LoadingSkeletonProps) => {
  return (
    <div className={clsx('flex justiry-center animate-pulse', container)}>
      <div className={clsx('bg-gradient-to-r from-muted-100 to-muted-300 w-full h-full', styles)}>
      </div>
    </div>
  );
};

export default LoadingSkeleton;