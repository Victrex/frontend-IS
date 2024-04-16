import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

const UploadImages = ({ photos, videos, handleSetPhotos, handleSetVideos, handleClickDeletePhoto, handleClickDeleteVideo, onSelectPhoto }) => {

    const getFile = () => {
        document.getElementById("media").click();
    };
        
    const renderImage = (photo) => {
        if (typeof photo === "string") {
            // Si la foto es una URL, usarla directamente
            return photo;
        } else if (photo?.file) {
            // Si la foto es un objeto, crear una URL de objeto
            return URL.createObjectURL(photo.file);
        }
    };

  return (
    <>
        <input
            type="file"
            id={"media"}
            onChange={onSelectPhoto}
            accept=".jpg, .jpeg, .png, .mp4"
            style={{ height: "0px", width: "0px", overflow: "hidden" }}
            multiple
        />

        <div className="mediaContainer">
            {photos && photos?.map((photo, i) => {
                return (
                <div key={photo.name + i} className="picturePreview">
                    <button
                        className="btn-delete-media"
                        type="button"
                        onClick={() => handleClickDeletePhoto(photo)}
                    >
                        x
                    </button>
                    <img src={renderImage(photo)} alt="Profile" />
                </div>)
            })}

            {videos && videos?.map((video, i) =>  {
                return (
                <div key={video.name + i} className="picturePreview">
                <button
                    className="btn-delete-media"
                    type="button"
                    onClick={() => handleClickDeleteVideo(video.name)}
                >
                    x
                </button>
                <video
                    width="640"
                    height="360"
                    src={
                    video?.file instanceof Blob
                        ? URL.createObjectURL(video.file)
                        : video
                    }
                    autoPlay
                    muted
                    loop
                />
                </div>)
            })}
            
            {/* <div id="uploadBtn" className="uploadStatus" onClick={getFile}>
            <AddIcon />
            </div> */}
        </div>
        </>
  )
}

export default UploadImages
