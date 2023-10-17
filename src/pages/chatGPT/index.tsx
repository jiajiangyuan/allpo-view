import React, { useState, useEffect, useRef } from "react";
import "./index.less";

const images = [
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1016/800/400",
  "https://picsum.photos/id/1018/800/400",
];

const Slide = ({ src, isActive }) => {
  const style = {
    backgroundImage: `url(${src})`,
    opacity: isActive ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };
  return <div className="slide" style={style} />;
};

const ProgressBar = ({ progress }: any) => {
  const style = {
    width: `${progress}%`,
    transition: "width 1s ease-in-out",
  };
  return <div className="progress-bar" style={style} />;
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
    setProgress(0);
  };

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setProgress(0);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
      setProgress(0);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 10);
    }, 500);
    if (progress === 100) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="carousel">
      <div className="slides">
        {images.map((src, index) => (
          <Slide key={index} src={src} isActive={index === currentIndex} />
        ))}
      </div>
      <div className="controls">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <div className="progress-bar-container">
        <ProgressBar progress={progress} />
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
