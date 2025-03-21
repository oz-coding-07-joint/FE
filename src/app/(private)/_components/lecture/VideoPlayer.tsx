import { useGetVideoProgress, useUpdateVideoProgress } from '@/api/lectureDetailApi';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useModalStore } from '@/store/useModalStore';
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
  const [hasPlayed, setHasPlayed] = useState(false)

  const { openModal, closeModal } = useModalStore();

  const updateProgress = useUpdateVideoProgress();
  const { data: progressData, refetch, isLoading: getProgressLoading } = useGetVideoProgress(chapterVideoId)

  useEffect(() => {
    setIsWindow(true)
  }, [])

  // 다른 영상으로 갔을 때 상태 초기화
  useEffect(() => {
    progressRef.current = 0;
    setPlaying(false);
    setHasPlayed(false);
  }, [videoUrl]);

  // 모달
  useEffect(() => {
    if (playing && !hasPlayed && progressData?.progress !== '0.00' && !progressData?.isCompleted && duration > 0) {
      // setContinueModal(true);
      openModal('continueVideo')
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
    closeModal("continueVideo");
    setPlaying(true);
  }

  const handleBegin = () => {
    closeModal("continueVideo");
    setPlaying(true);
  }

  const handlePlay = async () => {
    if (getProgressLoading) return;
    await refetch();

    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false);
  }

  const handleEnded = () => {
    setPlaying(false);
    closeModal("continueVideo");
    updateProgress.mutateAsync({ chapterVideoId, lastWatchedTime: duration, duration });
  };

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      const playedSeconds = state.playedSeconds;
      progressRef.current = playedSeconds;

      const progressAsNumber = Number(progressData?.progress);
      const lastWatchedTime = (progressAsNumber / 100) * duration;

      if (chapterVideoId && !progressData?.isCompleted && playedSeconds > (lastWatchedTime || 0)) {
        updateProgress.mutate({
          chapterVideoId,
          lastWatchedTime: playedSeconds,
          duration,
        });
      }
    }, 3000),
    [chapterVideoId, duration]
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

          <Modal modalKey={'continueVideo'}>
            <p className='flex justify-center mb-10'>이어서 보시겠습니까?</p>
            <div className='w-full flex justify-center gap-10'>
              <Button onClick={handleBegin} size='small' variant='outline' label='처음부터' />
              <Button onClick={handleContinue} size='small' label='이어보기' />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;