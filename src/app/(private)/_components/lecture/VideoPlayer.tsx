import { Video } from '@/types/video';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

type VideoPlayerProps = Pick<Video, 'videoUrl'>

const VideoPlayer = ({videoUrl}: VideoPlayerProps) => {

  return (
    <div className='w-full aspect-video mt-5'>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;