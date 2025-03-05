import dynamic from 'next/dynamic';
import React from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const VideoPlayer = () => {

  return (
    <div>
      <ReactPlayer
        url={'https://youtu.be/z50DbJcrEsY?si=rJkoF6nGNXzMlTkx'}
        controls={true}
        width={'55vw'}
        height={646}
      />
    </div>
  );
};

export default VideoPlayer;