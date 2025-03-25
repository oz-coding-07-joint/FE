"use client";

interface WishlistItemProps {
  content: string;
  author: string;
}

export default function WishlistItem({ content, author }: WishlistItemProps) {
  return (
    <div className="flex flex-col justify-center items-center w-[910px]">
      <p className="text-white font-normal text-center text-lg whitespace-pre-line">
        {content}
      </p>
      <span className="text-accent-300 font-normal text-sm mt-1">{author}</span>
    </div>
  );
}
