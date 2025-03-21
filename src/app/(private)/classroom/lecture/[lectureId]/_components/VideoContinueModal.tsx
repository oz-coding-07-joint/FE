import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useVideoStore } from '@/store/useLectureStore';
import { useModalStore } from '@/store/useModalStore';
import { Video } from '@/types/video';
import { MutableRefObject } from 'react';
import type ReactPlayerType from 'react-player';

type VideoContinueModalProps = {
  progressData?: Video | null,
  playerRef: MutableRefObject<ReactPlayerType | null>,
}

const VideoContinueModal = ({ progressData, playerRef }: VideoContinueModalProps) => {
  const { closeModal } = useModalStore();
  const {duration, setPlaying} = useVideoStore()

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

  return (
    <Modal modalKey={'continueVideo'}>
      <p className='flex justify-center mb-10'>이어서 보시겠습니까?</p>
      <div className='w-full flex justify-center gap-10'>
        <Button onClick={handleBegin} size='small' variant='outline' label='처음부터' />
        <Button onClick={handleContinue} size='small' label='이어보기' />
      </div>
    </Modal>
  );
};

export default VideoContinueModal;