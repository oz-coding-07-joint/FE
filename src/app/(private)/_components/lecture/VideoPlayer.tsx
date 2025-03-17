// import { getVideoState, updateVideoProgress } from '@/api/lectureDetailApi';
import { createVideoProgress, updateVideoProgress } from '@/api/lectureDetailApi';
import { throttle } from '@/utils/throttle';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

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
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [hasCreatedProgress, setHasCreatedProgress] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      setProgress(state.playedSeconds)
    }, 5000), []
  );

  const handleDuration = (duration: number) => {
    setVideoDuration(duration)
  }
  const handlePlay = async () => {
    setPlaying(true);

    if(!hasCreatedProgress && chapterVideoId) {
      try {
        await createVideoProgress(chapterVideoId, 0);
        setHasCreatedProgress(true);
        console.log('Progress created');
      } catch(error) {
        console.error('Failed to create progress', error);
      }
    }
  }

  const handlePause = async () => {
    console.log('영상 멈춤', progress)
    setPlaying(false);

    if(chapterVideoId) {
      const isCompleted = progress >= (videoDuration - 5);
      try {
        await updateVideoProgress(chapterVideoId, progress, isCompleted);
        console.log('update success')
      } catch (error) {
        console.error('update failed', error);
      }
    }
  }

  useEffect(() => {
    return () => {
      if(chapterVideoId) {
        const isCompleted = progress >= (videoDuration - 5);
        updateVideoProgress(chapterVideoId, progress, isCompleted);
      }
    }
  }, [chapterVideoId, progress])

  return (
    <div className='w-[95%] aspect-video mt-5 flex items-center justify-center bg-gray-200'>
      <ReactPlayer
        url={videoUrl}
        playing={playing}
        onDuration={handleDuration}
        controls={true}
        onProgress={handleProgress}
        onPause={handlePause}
        onPlay={handlePlay}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;