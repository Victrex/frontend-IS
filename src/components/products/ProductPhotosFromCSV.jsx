/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../assets/css/productPhotos.css";
import AddIcon from "@mui/icons-material/Add";

const ProductPhotosFromCSV = ({ idProduct }) => {
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [data, setData] = useState({ idProduct, photos: [], video: null});
  const [id, setId] = useState(idProduct);
  
  // const { photos, setPhotos, video, setVideo } = useContext(Context);

  const sub = (e) => {
    console.log(id)
    const file = Array.from(e.target.files);
    if (!file) return;

    file?.forEach((file) => {
      // console.log(file);
      if (file.type == "video/mp4") {
        // console.log("es video");
        setVideo({ file, name: fileNameCure(file.name) });
      } else {
        if(idProduct === data.idProduct){
          setData({ ...data, photos: [...data.photos, { file, name: fileNameCure(file.name) }] });
        }
        // setData({ ...data, photos: [...data.photos, { file, name: fileNameCure(file.name) }] });
        // console.log("no es video");
        setPhotos((currentPhotos) => {
          if (currentPhotos.length < 6) {
            console.log(file);
            return [...currentPhotos, { file, name: fileNameCure(file.name) }];
          } else {
            alert("Solo es permitido 6 fotos y un video");
            return currentPhotos;
          }
        });
      }
    });
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

  const isImageOrVideo = (blob) => {
    const type = blob.type;

    if (type.startsWith("image/")) {
      return "image";
    } else if (type.startsWith("video/")) {
      return "video";
    } else {
      return "unknown";
    }
  };

  const handleClickDeletePhoto = (name) => {
    const blob = new Blob([name], { type: "image/png" });
    const type = isImageOrVideo(blob);
    console.log(type, name);

    setPhotos(
      photos.filter((e) => {
        const condition = typeof name === "string" ? name : name.name;
        if (typeof e === "string") {
          return e != condition;
        } else if (typeof e === "object") {
          return e.name != condition;
        }
      })
    );
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

  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <>
      <h4 style={{ fontWeight: "100", fontSize: "0.8rem", margin: "0px" }}>
        <small> Imágenes | La primera imagen será la principal</small>
      </h4>
      <div className="mediaContainer">
        {photos?.map((photo, i) => (
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

        {video ? (
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
              src={
                video?.file instanceof Blob
                  ? URL.createObjectURL(video.file)
                  : video
              }
              autoPlay
              muted
              loop
            />
          </div>
        ) : null}
        {/* {video && (
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
        )} */}
        <div id="uploadBtn" className="uploadStatus" onClick={getFile}>
          <AddIcon />
        </div>
      </div>

      <input
        type="file"
        id="media"
        onChange={sub}
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
        multiple
      />
{/*       <input
        type="file"
        id="firstPhoto"
        onChange={subFirstPhoto}
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
      /> */}
    </>
  );
};
export default ProductPhotosFromCSV;
