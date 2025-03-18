import { useCreateVideoProgress, useUpdateVideoProgress } from '@/api/lectureDetailApi';
import { throttle } from '@/utils/throttle';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

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

  const createProgress = useCreateVideoProgress();
  const updateProgress = useUpdateVideoProgress();

  const handlePlay = async () => {
    setPlaying(true);
    if(chapterVideoId) {
      await createProgress.mutateAsync({chapterVideoId, lastWatchedTime: 0});
    }
  };

  const handlePause = async () => {
    setPlaying(false);
    if(chapterVideoId) {
      await updateProgress.mutateAsync({chapterVideoId, lastWatchedTime: progress})
    }
  }

  const handleProgress = useCallback(
    throttle((state: ProgressState) => {
      setProgress(state.playedSeconds)
    }, 5000), []
  );

  return (
    <div className='w-[95%] aspect-video mt-5 flex items-center justify-center bg-gray-200'>
      <ReactPlayer
        url={videoUrl}
        playing={playing}
        // onDuration={handleDuration}
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