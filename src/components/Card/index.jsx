import { useSelector } from 'react-redux';
import { voteColor } from '../../contants/voteColor';
import { Link } from 'react-router-dom';

const Card = ({ data, media_type }) => {
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const mediaType = data.media_type ?? media_type;

  return (
    <Link to={`${mediaType}/${data.id}`}>
      <div id="card" className="relative w-64 min-h-[200px] bg-transparent rounded-lg overflow-hidden mr-8 cursor-pointer transform transition-transform duration-200 ease-in-out group">
        <div>
          <div className="relative w-full h-full">
            <img src={imageURL + data?.poster_path} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="py-4">
            <h2 className="text-lg font-bold text-gray-900 truncate mb-4">{data?.title || data?.name}</h2>
            <div className="flex items-center justify-between">
              {data?.vote_average && <p className={`${voteColor(data.vote_average)} font-semibold`}>⭐ {data.vote_average.toFixed(1)}</p>}
              {data?.release_date && <p className="text-sm text-gray-600">{new Date(data?.release_date).getFullYear()}</p>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
