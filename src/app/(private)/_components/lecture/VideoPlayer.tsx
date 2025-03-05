import dynamic from 'next/dynamic';
import React, { useState } from 'react';

interface VideoPlayerProps {
  onDuration: (duration: number) => void;
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const VideoPlayer = ({onDuration}: VideoPlayerProps) => {

  const handleDuration = (duration: number) => {
    if (duration && duration > 0) {
      onDuration(duration); // 부모 컴포넌트로 duration 전달
    }
  };

  return (
    <div>
      <ReactPlayer
        url={'https://youtu.be/z50DbJcrEsY?si=rJkoF6nGNXzMlTkx'}
        controls={true}
        width={1169}
        height={646}
        onDuration={handleDuration}
      />
    </div>
  );
};

export default VideoPlayer;