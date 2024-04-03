import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../assets/css/carrousel.css";
import { useMemo } from "react";

const ProductByIdShowPhotos = ({ photos, video }) => {
  const [current, setCurrent] = useState(0);

  const images = useMemo(() => [...photos, video ?? null], [photos, video]);
  const imageSlides = document.getElementsByClassName("slide-image");
  const bubbles = document.getElementsByClassName("bubble-outer");
  const nextImage = () => {
    let newIndex = current === images.length - 1 ? 0 : current + 1;
    imageSlides[current].className = "slide-image leftOut";
    imageSlides[newIndex].className = "slide-image leftIn";
    updateBubbles(newIndex);
    setCurrent(newIndex);
  };
  const prevImage = () => {
    let newIndex = current === 0 ? images.length - 1 : current - 1;
    imageSlides[current].className = "slide-image rightOut";
    imageSlides[newIndex].className = "slide-image rightIn";
    updateBubbles(newIndex);
    setCurrent(newIndex);
  };
  const jumpImage = (e) => {
    let jumpIndex = parseInt(e.target.id);
    if (jumpIndex === current) return;
    if (jumpIndex - current >= 0) {
      imageSlides[current].className = "slide-image leftOut";
      imageSlides[jumpIndex].className = "slide-image leftIn";
    } else {
      imageSlides[current].className = "slide-image rightOut";
      imageSlides[jumpIndex].className = "slide-image rightIn";
    }
    updateBubbles(jumpIndex);
    setCurrent(jumpIndex);
  };
  const updateBubbles = (highlight) => {
    bubbles[highlight].style.backgroundColor = "black";
  };
  useEffect(() => {
    images.length > 0
      ? (bubbles[current].style.backgroundColor = "white")
      : null;
  }, [bubbles, current, images, photos]);
  return (
    <div className="gallery-container">
      <span className="button-prev" onClick={prevImage}>
        chevron_left
      </span>
      <span className="button-next" onClick={nextImage}>
        chevron_right
      </span>
      <div className="gallery-track">
        {images.map((image, index) => (
          <div
            className="slide-image"
            key={index}
            style={{
              //   backgroundImage: `url(${image.url ?? image})`,
              backdropFilter: "blur(50px)",

              backgroundBlendMode: "difference",
              backgroundSize: "cover",
              backgroundPositionY: "center",

              ...(index === 0 && { transform: "translateX(0%)" }),
              ...(index !== 0 && { transform: "translateX(100%)" }),
            }}
          >
            {" "}
            {!image.url ? (
              <img src={image} alt="" />
            ) : (
              <video
                src={image.url}
                controls
                loop={true}
                onPlay={true}
                muted
              ></video>
            )}
            {/* <img src={image.url ?? image} alt="" /> */}
          </div>
        ))}
      </div>
      <div className="gallery-footer">
        {images.map((image, index) => (
          <div
            key={index}
            className="bubble-outer"
            onClick={jumpImage}
            id={index}
          >
            <div className="bubble-inner" id={index}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductByIdShowPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
  video: PropTypes.object.isRequired,
};

export default ProductByIdShowPhotos;
