import useFetchDetails from '../../hooks/useFetchDetails';

const VideoPlay = ({ data, media_type }) => {
  const { data: videoData } = useFetchDetails(`${media_type}/${data?.id}/videos`);
  return (
    <section className="relative z-40 bg-opacity-50 flex bg-red-400  rounded-lg">
      <div className="w-full max-h-full max-w-full aspect-video rounded-lg relative ">
        <iframe src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} className="w-full h-full rounded-lg" allowFullScreen />
      </div>
    </section>
  );
};

export default VideoPlay;
