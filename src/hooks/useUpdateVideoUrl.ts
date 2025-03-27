import { useChapterVideo } from "@/api/lectureDetailApi";
import { useVideoStore } from "@/store/useLectureStore";

export const useUpdateVideoUrl = ({ selectedVideoId }) => {
    const { setCurrentUrl, setPendingSeekTime, isUpdatingUrl, setIsUpdatingUrl } = useVideoStore()
    const { refetch } = useChapterVideo(selectedVideoId)

    const updateVideoUrl = async (currentTime) => {
        if (isUpdatingUrl) return;
        setIsUpdatingUrl(true);
        try {
            const { data: newVideo } = await refetch();
            if (newVideo?.videoUrl) {
                setCurrentUrl(newVideo.videoUrl)
                setPendingSeekTime(currentTime)
            } else {
                console.error('Not receiving new videoUrl');
            }
        } catch (error) {
            console.error('Error updating video url:', error)
        }finally {
            setIsUpdatingUrl(false);
        }
    }
    return {updateVideoUrl}
};