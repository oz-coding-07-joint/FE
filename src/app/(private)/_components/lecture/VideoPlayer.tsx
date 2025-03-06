import { Video } from '@/types/video';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

type VideoPlayerProps = Pick<Video, 'videoUrl'>

const VideoPlayer = ({videoUrl}: VideoPlayerProps) => {

  return (
    <div className='mt-6'>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width={'57vw'}
        height={646}
      />
    </div>
  );
};

export default VideoPlayer;