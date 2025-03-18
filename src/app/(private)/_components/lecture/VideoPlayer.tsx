import { useCreateVideoProgress, useGetVideoProgress, useUpdateVideoProgress } from '@/api/lectureDetailApi';
import { throttle } from '@/utils/throttle';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type ReactPlayerType from 'react-player';

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
  const [duration, setDuration] = useState(0);
  // const [initialized, setInitialized] = useState(false);
  // const [showContinuwModal, setShowContinueModal] = useState(false);

  const createProgress = useCreateVideoProgress();
  const updateProgress = useUpdateVideoProgress();
  const { data: progressData, refetch, isLoading: getProgressLoading } = useGetVideoProgress(chapterVideoId)

  const playerRef = useRef<ReactPlayerType | null>(null);

  // 새로운 비디오 선택했을 때 상태 초기화
  useEffect(() => {
    setProgress(0);
    // setInitialized(false);
    setPlaying(false);
    console.log('duration', duration)
  }, [videoUrl, chapterVideoId]);

  // useEffect(() => {
  //   if (progressData) {
  //     if (parseFloat(progressData.last_watched_time) > 0 && !progressData.is_completed) {
  //       setShowContinueModal(true);
  //     } else {
  //       setShowContinueModal(false);
  //       if (progressData.is_completed) {
  //         setInitialized(true);
  //       }
  //     }
  //   }
  // }, [progressData]);

  const handlePlay = async () => {
    if (getProgressLoading) return;
    setPlaying(true);
    await refetch();
    if (progressData || progressData?.progress !== 0) {
      await updateProgress.mutateAsync({ chapterVideoId, lastWatchedTime: progress, duration });
    } else {
      await createProgress.mutateAsync({ chapterVideoId, lastWatchedTime: progress, duration });
    }
  }

  const handlePause = async () => {
    setPlaying(false);
    await refetch();
  }

  const handleEnded = async () => {
    setPlaying(false);
    await updateProgress.mutateAsync({ chapterVideoId, lastWatchedTime: progress, duration });
    await refetch();
  };

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      setProgress(state.playedSeconds);

      updateProgress.mutate({
        chapterVideoId, lastWatchedTime: state.playedSeconds, duration
      })
    }, 3000),
    [playing, chapterVideoId, progressData, duration]
  );

  const handleDuration = (totalDuration: number) => {
    setDuration(totalDuration);
  }

  return (
    <div className='w-[95%] aspect-video mt-5 flex items-center justify-center bg-gray-200'>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        onDuration={handleDuration}
        controls={true}
        onProgress={handleProgress}
        onPause={handlePause}
        onPlay={handlePlay}
        onEnded={handleEnded}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;