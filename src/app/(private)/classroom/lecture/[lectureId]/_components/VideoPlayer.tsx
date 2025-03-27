'use client'

import { useGetVideoProgress, useUpdateVideoProgress } from '@/api/lectureDetailApi';
import Button from '@/components/Button';
import { useLectureStore, useVideoStore } from '@/store/useLectureStore';
import { useModalStore } from '@/store/useModalStore';
import { throttle } from '@/utils/throttle';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type ReactPlayerType from 'react-player';
import ReactPlayer from 'react-player';
import VideoContinueModal from './VideoContinueModal';
import { AxiosError } from 'axios';
import { useUpdateVideoUrl } from '@/hooks/useUpdateVideoUrl';

type VideoPlayerProps = {
  videoUrl: string;
  lectureId: number;
}

type ProgressState = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const VideoPlayer = ({ videoUrl, lectureId }: VideoPlayerProps) => {
  const { selectedChapterId, selectedVideoId } = useLectureStore()
  const { openModal, closeModal } = useModalStore();
  const { playing, duration, currentUrl, isUpdatingUrl, setPlaying, setDuration, setCurrentUrl } = useVideoStore()
  
  const router = useRouter()
  const progressRef = useRef(0);
  const playerRef = useRef<ReactPlayerType | null>(null);
  
  const [isWindow, setIsWindow] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [pendingSeekTime, setPendingSeekTime] = useState<number | null>(null)
  
  const { updateVideoUrl } = useUpdateVideoUrl({ selectedVideoId })
  const updateProgress = useUpdateVideoProgress();
  const { data: progressData, refetch, isLoading: getProgressLoading } = useGetVideoProgress(selectedVideoId)

  useEffect(() => {
    setIsWindow(true)
  }, [])

  useEffect(() => {
    if (videoUrl) {
      setCurrentUrl(videoUrl);
    }
  }, [videoUrl]);

  const handleError = async (error: AxiosError) => {
    console.log('handleError', error);
    if (isUpdatingUrl) return;
    setPlaying(false)
    try {
      const internalPlayer = playerRef.current?.getInternalPlayer();
      const currentTime = internalPlayer?.currentTime;
      await updateVideoUrl(currentTime);
    } catch (error) {
      console.log('handleErrorCatch', error)
    }
  };

  const handleSeek = (seekTime: number) => {
    progressRef.current = seekTime; // 현재 재생 위치 업데이트
    setPlaying(true); // 영상이 멈추지 않도록 유지
  };

  const handleReady = () => {
    if (pendingSeekTime !== null && playerRef.current) {
      playerRef.current.seekTo(pendingSeekTime, 'seconds');
      setPendingSeekTime(null); // 적용 후 초기화
      setPlaying(true); // 다시 재생
    }
  };

  // 다른 영상으로 갔을 때 상태 초기화
  useEffect(() => {
    progressRef.current = 0;
    setPlaying(false);
    setHasPlayed(false);
  }, [currentUrl]);

  // 모달
  useEffect(() => {
    if (progressData?.isCompleted === false) {
      if (!playing && !hasPlayed && progressData?.progress !== '0.00' && duration > 0) {
        openModal('continueVideo')
        setPlaying(false);
        setHasPlayed(true);
      }
    }
  }, [videoUrl]);

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
    updateProgress.mutateAsync({ chapterVideoId: selectedVideoId, lastWatchedTime: duration, duration });
  };

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      const playedSeconds = state.playedSeconds;
      progressRef.current = playedSeconds;

      const progressAsNumber = Number(progressData?.progress);
      const lastWatchedTime = (progressAsNumber / 100) * duration;

      if (selectedVideoId && !progressData?.isCompleted && playedSeconds > (lastWatchedTime || 0)) {
        updateProgress.mutate({
          chapterVideoId: selectedVideoId,
          lastWatchedTime: playedSeconds,
          duration,
        });
      }
    }, 3000),
    [selectedVideoId, duration]
  );

  const handleDuration = (totalDuration: number) => {
    setDuration(totalDuration);
  }

  const handleAssignment = () => {
    router.push(`/classroom/assignment/${lectureId}?chapterId=${selectedChapterId}&videoId=${selectedVideoId}`)
  }

  return (
    <>
      {isWindow && (
        <div className='w-full aspect-video flex flex-col items-center justify-center gap-3'>
          <ReactPlayer
            ref={playerRef}
            url={currentUrl}
            playing={playing}
            onDuration={handleDuration}
            controls={true}
            onProgress={handleProgress}
            onPause={handlePause}
            onPlay={handlePlay}
            onEnded={handleEnded}
            onError={handleError}
            onSeek={handleSeek}
            onReady={handleReady}
            width='100%'
            height='100%'
          />
          {progressData?.isCompleted && (
            <div className='w-full flex justify-end'>
              <Button label='과제하러가기' onClick={handleAssignment} />
            </div>
          )}
          <VideoContinueModal progressData={progressData ?? undefined} playerRef={playerRef} />
        </div>
      )}
    </>
  );
};

export default VideoPlayer;