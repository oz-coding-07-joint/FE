import { getVideoState, updateVideoProgress } from '@/api/lectureDetailApi';
import { throttle } from '@/utils/throttle';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

type VideoPlayerProps = {
  videoUrl: string;
  chapterVideoId: number | null;
}

type ProgressState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const VideoPlayer = ({ videoUrl, chapterVideoId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      setProgress(state.playedSeconds)
    }, 5000), []
  );

  const handlePause = async () => {
    console.log('영상 멈춤', progress)
    const isCompletedState = await getVideoState(chapterVideoId)

    try {
      await updateVideoProgress(chapterVideoId, progress, isCompletedState.isCompleted);
      console.log('update success')
    }catch(error) {
      console.error('update failed', error);
    }
  }

  return (
    <div className={clsx(
      'w-[95%] aspect-video mt-5 flex items-center justify-center bg-gray-200',
      { 'animate-pulse': isLoading }
    )}>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        onReady={() => setIsLoading(false)}
        onProgress={handleProgress}
        onPause={handlePause}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;