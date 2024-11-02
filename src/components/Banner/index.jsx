import React, { useEffect, useState } from 'react';
import { IoArrowBackCircle, IoArrowForwardCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Banner = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, currentImage]);

  return (
    <div id="banner" className="relative w-full h-full">
      <div className="relative flex min-h-full max-h-[80vh] overflow-hidden rounded-lg">
        {bannerData.map((data, index) => (
          <div key={index} className="relative min-w-full min-h-full transition-all rounded-lg overflow-hidden" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent rounded-lg"></div>
            <div className="absolute mt-12 ml-14 flex items-center justify-center p-3 w-[150px] rounded-full backdrop-blur-lg bg-white/15 z-50">
              <img src="/src/assets/images/fire.png" className="w-[20px]" alt="Trending" />
              <h2 className="ml-2 text-white font-semibold">Now Trending</h2>
            </div>

            <div id="content-container" className="absolute left-14 bottom-[15%] text-white w-[50%]">
              <h1 className="font-bold text-[3.5rem]">{data?.title}</h1>
              <p className="font-light text-[1.2rem] mt-2">{data?.overview}</p>
              <button type="button" className="py-5 px-20 bg-white rounded-full text-black mt-8 font-semibold">
                View Detail
              </button>
            </div>

            <div className="w-full h-full rounded-lg overflow-hidden">
              <img src={imageURL + data?.backdrop_path} className="w-full h-full object-cover" alt={data?.title} />
            </div>
          </div>
        ))}
      </div>

      <div id="arrow-button-container" className="absolute flex items-center text-[5rem] bottom-10 right-14 gap-2">
        {currentImage > 0 && (
          <div id="prev-button">
            <IoArrowBackCircle className="cursor-pointer text-white hover:text-slate-300" onClick={handlePrevImage} />
          </div>
        )}
        {currentImage < bannerData.length - 1 && (
          <div id="next-button">
            <IoArrowForwardCircle className="cursor-pointer text-white hover:text-slate-300" onClick={handleNextImage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
