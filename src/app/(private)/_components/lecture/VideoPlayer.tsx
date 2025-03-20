import { useGetVideoProgress, useUpdateVideoProgress } from '@/api/lectureDetailApi';
import Modal from '@/components/Modal';
import { throttle } from '@/utils/throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import type ReactPlayerType from 'react-player';
import ReactPlayer from 'react-player';

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
  const [isWindow, setIsWindow] = useState(false)
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef(0);
  const playerRef = useRef<ReactPlayerType | null>(null);
  const [continueModal, setContinueModal] = useState(false);
  const [calculatedLastWatchedTime, setCalculatedLastWatchedTime] = useState<number>(0)
  const [hasPlayed, setHasPlayed] = useState(false)

  const updateProgress = useUpdateVideoProgress();
  const { data: progressData, refetch, isLoading: getProgressLoading } = useGetVideoProgress(chapterVideoId)

  useEffect(() => {
    setIsWindow(true)
  }, [])

  // 다른 영상으로 갔을 때 상태 초기화
  useEffect(() => {
    progressRef.current = 0;
    setPlaying(false);
    setCalculatedLastWatchedTime(0);
    setHasPlayed(false);
  }, [videoUrl]);

  // lastWatchedTime계산
  useEffect(() => {
    if (progressData?.progress !== '0.00' && !progressData?.isCompleted && duration > 0) {
      const progressAsNumber = Number(progressData?.progress);

      if (!isNaN(progressAsNumber) && progressAsNumber > 0) {
        const lastWatchedTime = (progressAsNumber / 100) * duration;
        setCalculatedLastWatchedTime(lastWatchedTime);
      }
    }
  }, [progressData?.progress])

  // 모달
  useEffect(() => {
    if (playing && !hasPlayed && progressData?.progress !== '0.00' && !progressData?.isCompleted && duration > 0) {
      setContinueModal(true);
      setPlaying(false);
      setHasPlayed(true);
    }
  }, [playing]);

  const handleContinue = () => {
    if (progressData?.progress !== '0.00' && duration > 0) {
      const progressAsNumber = Number(progressData?.progress);
      const lastWatchedTime = (progressAsNumber / 100) * duration;
      playerRef.current?.seekTo(lastWatchedTime, 'seconds')
    } else {
      console.log('handleContinue error')
    }
    setContinueModal(false);
    setPlaying(true);
  }

  const handleBegin = () => {
    setContinueModal(false);
    setPlaying(true);
  }

  const handlePlay = async () => {
    if (getProgressLoading) return;
    await refetch();

    setPlaying(true)
  }

  const handlePause = async () => {
    setPlaying(false);
  }

  const handleEnded = async () => {
    setPlaying(false);
    setContinueModal(false)
    await updateProgress.mutateAsync({ chapterVideoId, lastWatchedTime: duration, duration });
  };

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      const playedSeconds = state.playedSeconds;
      progressRef.current = playedSeconds;

      if (!continueModal &&chapterVideoId && !progressData?.isCompleted && playedSeconds > (calculatedLastWatchedTime || 0)) {
        updateProgress.mutate({
          chapterVideoId,
          lastWatchedTime: playedSeconds,
          duration,
        });
      }
    }, 3000),
    [playing, chapterVideoId, calculatedLastWatchedTime, duration]
  );

  const handleDuration = (totalDuration: number) => {
    setDuration(totalDuration);
  }

  return (
    <>
      {isWindow && (
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

          <Modal isOpen={continueModal} onClose={() => setContinueModal(false)}>
            <p>이어서 보시겠습니까?</p>
            <button onClick={handleContinue}> 이어보기 </button>
            <button onClick={handleBegin}> 처음부터 </button>
          </Modal>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;