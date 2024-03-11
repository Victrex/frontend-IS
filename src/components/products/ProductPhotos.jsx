import { useState } from "react";
import "../../assets/css/productPhotos.css";

const ProductPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);

  const sub = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type == "video/mp4") {
      setVideo({file, name: fileNameCure(file.name)});
    } else {
      if (photos.length < 6) {
        setPhotos([...photos, {file, name: fileNameCure(file.name)}]);
      } else {
        alert("Solo es permitido 6 fotos y un video");
      }
    }
    console.log(photos);
    console.log(video);

    // setFormData({ ...formData, profilePhoto: file.name });
    // const $uploadBtn = $(".uploadStatus");
    // if (file) {
    //   $uploadBtn.classList.add = "successUpload";
    //   $uploadBtn.innerHTML = "Imagen Cargada Exitosamente!";
    // }
    e.preventDefault();
  };

  const getFile = () => {
    document.getElementById("media").click();
  };

  const fileNameCure = (name) => {
    let special = ['/', '\\', '|', ' ', ' +', '-', '@', '#', '^', '-', ';', ':', '`', '\'', '"', '*']
    special.forEach((i) => {
      name = name.replaceAll(i, '')
    })
    return Math.floor(Math.random() * Date.now() * 10000).toString(36) + name 
  }

  const handleClickDeletePhoto = (name) => {
    setPhotos( photos.filter((photo) => photo.name != name ) )
  }

  return (
    <>
      <div className="mediaContainer">
        {photos &&
          photos.map((photo, i) => (
            // if (photo.type != "video/mp4")
            <div key={"photo" + i} className="picturePreview">
              <button className="btn-delete-media" type="button" onClick={() => handleClickDeletePhoto(photo.name)}>
                x
              </button>
              <img src={URL.createObjectURL(photo.file)} alt="Profile" />
            </div>
          ))}

        {video && (
          <div className="picturePreview">
            <button className="btn-delete-media" type="button" onClick={() => (setVideo(null))}>
              x
            </button>
            <video
              width="640"
              height="360"
              src={URL.createObjectURL(video.file)}
              autoPlay
              muted
            >
              Tu navegador no soporta el tag de video.
            </video>
          </div>
        )}
      </div>

      <div id="uploadBtn" className="uploadStatus" onClick={getFile}>
        +
      </div>

      <input
        type="file"
        id="media"
        onChange={sub}
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
      />
    </>
  );
};
export default ProductPhotos;
