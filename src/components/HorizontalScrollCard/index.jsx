import React, { useState, useRef, useEffect } from 'react';
import Card from '../Card';

const HorizontalScrollCard = ({ data, heading, media_type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef(null);

  const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 0;

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative w-full my-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{heading}</h1>
        <div className="flex items-center">
          <button onClick={handlePrev} disabled={currentIndex === 0} className={`mr-4 text-xl hover:text-red-500 ${currentIndex === 0 ? 'text-gray-400 cursor-not-allowed' : ''}`}>
            Prev
          </button>
          <button onClick={handleNext} disabled={currentIndex >= data.length - 1} className={`ml-4 text-xl hover:text-red-500 ${currentIndex >= data.length - 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}>
            Next
          </button>
        </div>
      </div>
      <div className="flex overflow-hidden py-6">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}>
          {data.map((item, index) => (
            <Card key={item.id} data={item} media_type={media_type} cardRef={index === 0 ? cardRef : null} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
