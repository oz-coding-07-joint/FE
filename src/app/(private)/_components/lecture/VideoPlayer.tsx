import { Video } from '@/types/video';
import { throttle } from '@/utils/throttle';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

type VideoPlayerProps = Pick<Video, 'videoUrl'>

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback(
    throttle((state: { playedSeconds: number }) => {
      setProgress(state.playedSeconds)
    }, 5000), []
  )

  const handlePause = () => {
    console.log('영상 멈춤', progress)
  }

  return (
    <div className='w-[95%] aspect-video mt-5'>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        onProgress={handleProgress}
        onPause={handlePause}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;