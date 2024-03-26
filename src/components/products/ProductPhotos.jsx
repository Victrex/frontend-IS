/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "../../assets/css/productPhotos.css";
import { Context } from "./Products";
import AddIcon from "@mui/icons-material/Add";

const ProductPhotos = ({ isEditing }) => {
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const {
    setPhotos: setPhotosContext,
    photos: photosContext,
    setVideo: setVideoContext,
    video: videoContext,
    setFirstPhoto,
  } = useContext(Context);
  // const { photos, setPhotos, video, setVideo } = useContext(Context);

  const sub = (e) => {
    const file = Array.from(e.target.files);
    if (!file) return;

    file?.forEach((file) => {
      if (file.type == "video/mp4") {
        setVideo({ file, name: fileNameCure(file.name) });
        setVideoContext({ file, name: fileNameCure(file.name) });
      } else {
        setPhotos((currentPhotos) => {
          if (currentPhotos.length < 6) {
            console.log(file);
            return [...currentPhotos, { file, name: fileNameCure(file.name) }];
          } else {
            alert("Solo es permitido 6 fotos y un video");
            return currentPhotos;
          }
        });
        setPhotosContext((currentPhotos) => {
          if (currentPhotos.length < 6) {
            return [...currentPhotos, { file, name: fileNameCure(file.name) }];
          } else {
            return currentPhotos;
          }
        });
      }
    });
    // setFormData({ ...formData, profilePhoto: file.name });
    // const $uploadBtn = $(".uploadStatus");
    // if (file) {
    //   $uploadBtn.classList.add = "successUpload";
    //   $uploadBtn.innerHTML = "Imagen Cargada Exitosamente!";
    // }
    e.preventDefault();
  };

/*   useEffect(() => {
    console.log(photosContext);
  }, [photosContext]); */

  const subFirstPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type == "video/mp4") {
      return;
    } else {
      if (photos.length < 6) {
        setFirstPhoto({ file, name: fileNameCure(file.name) });
      } else {
        alert("Solo es permitido 6 fotos y un video");
      }
    }
    e.preventDefault();
  };

  const getFile = () => {
    document.getElementById("media").click();
  };

  const fileNameCure = (name) => {
    let special = [
      "/",
      "\\",
      "|",
      " ",
      " +",
      "-",
      "@",
      "#",
      "^",
      "-",
      ";",
      ":",
      "`",
      "'",
      '"',
      "*",
    ];
    special.forEach((i) => {
      name = name.replaceAll(i, "");
    });
    return Math.floor(Math.random() * Date.now() * 10000).toString(36) + name;
  };

  const handleClickDeletePhoto = (name) => {

    setPhotosContext(photosContext.filter((e)=> {
      const condition = typeof name === 'string' ? name : name.name
      if (typeof e === 'string') {
        return e != condition
      } else if(typeof e === 'object') {
        return e.name != condition
      }
    }))

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
      <div className="mediaContainer">
        {isEditing === false && photosContext
          ? photosContext?.map((photo, i) => (
            <div key={"photo" + i} className="picturePreview">
              <button
                className="btn-delete-media"
                type="button"
                onClick={() => handleClickDeletePhoto(photo.name)}
              >
                x
              </button>
              <img src={renderImage(photo)} alt="Profile" />
            </div>
          ))
          : photosContext?.map((photo, i) => (
              <div key={"photo" + i} className="picturePreview">
                <button
                  className="btn-delete-media"
                  type="button"
                  onClick={() => handleClickDeletePhoto(photo)}
                >
                  x
                </button>
                <img src={renderImage(photo)} alt="Profile" />
              </div>
            ))}
        {video && (
          <div className="picturePreview">
            <button
              className="btn-delete-media"
              type="button"
              onClick={() => setVideo(null)}
            >
              x
            </button>
            <video
              width="640"
              height="360"
              src={URL.createObjectURL(videoContext.file)}
              autoPlay
              muted
              loop
            />
          </div>
        )}
        <div id="uploadBtn" className="uploadStatus" onClick={getFile}>
          <AddIcon />
        </div>
      </div>
      <h4 style={{ fontWeight: "100", fontSize: "0.8rem", margin: "0px" }}>
        Imágenes <br></br>
        <small>La primera imagen será la principal</small>
      </h4>

      <input
        type="file"
        id="media"
        onChange={sub}
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
        multiple
      />
      <input
        type="file"
        id="firstPhoto"
        onChange={subFirstPhoto}
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
      />
    </>
  );
};
export default ProductPhotos;
