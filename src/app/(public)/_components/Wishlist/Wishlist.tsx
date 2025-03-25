"use client";

import WishlistTitle from "./WishlistTitle";
import WishlistItem from "./WishlistItem";

// 위시리스트 데이터
const wishlistData = [
  {
    content: `저는 예중·예고의 작곡과에 가고 싶은 학생인데, 주변에 화성학을 배울 곳이 마땅치 않아서 고민이에요.
    화성학 성적이 제대로 나와야 수업을 따라가든 대학교에 진학하든 할 수 있을 텐데
    학원을 다니기엔 시간이 맞지않고, 독학하려니 채점도 안 되고, 맞게 하고 있는지도 모르겠어요...
    저처럼 입시를 준비하는 학생들에게 꼭 필요한 과정이었으면 좋겠어요.`,
    author: "10대 예중/예고 진학생",
  },
  {
    content: `작곡을 하면서 음이라든가, 화성학이 중요하다는 게 많이 와닿았어요.
    하지만 기존의 화성학 강의들은 직접 찾아가야 하고, 온라인으로 찾을 수 있는 강의는
    단방향이라 문제에 대한 피드백을 받는 게 어려워서 계속 미루고 있어요`,
    author: "20대 작곡 새내기",
  },
  {
    content: `저는 예중·예고의 작곡과에 가고 싶은 학생인데, 주변에 화성학을 배울 곳이 마땅치 않아서
    고민오래 전부터 음악을 만들고 싶어서 여러 것들을 찾아보고 있는데,
    막상 뭔가 만들어도 어딘가 부자연스러워서 좀더 공부하고 싶지만 어디서부터 시작해야 할지 모르겠어요.
    유튜브에서 무료 강의를 봐도 체계적인 학습이 어렵고, 독학하려니 방향을 잡기가 쉽지 않네요.
    제대로 된 기초부터 배우고 싶어요.`,
    author: "자신만의 곡을 만들고 싶은, 모든 음악을 사랑하는 사람들",
  },
];

export default function Wishlist() {
  return (
    <div className="h-[1080px] flex flex-col justify-center items-center">
      {/* 타이틀 컴포넌트 */}
      <WishlistTitle />

      {/* 위시리스트 콘텐츠 */}
      <div className="flex flex-col gap-20">
        {wishlistData.map((item, index) => (
          <WishlistItem
            key={index}
            content={item.content}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
}
