// Desc: Upload a CSV file to update products
import { useState, useEffect } from "react";

import { Button } from "../generalComponents/Button";
import ProductPhotosFromCSV from "./ProductPhotosFromCSV";

const UploadSrcToProductsByCSV = () => {

  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const useMedia = () => {

  const handleSetPhotos = (photo) => {
    if (photos.filter( e => e.idProduct == photo.idProduct).length >= 6)
    return alert("Solo se pueden subir un 6 fotos por producto")
    setPhotos( [...photos, {...photo}]  )
  }
  
  const handleSetVideos = (video) => {
    if (videos.some( (e) => e.idProduct == video.idProduct ))
    return alert("Solo se puede subir un video por producto")
    setVideos( [...videos, {...video}]  )
  }

  const handleClickDeletePhoto = (name) => {
    const blob = new Blob([name], { type: "image/png" });
    const type = isImageOrVideo(blob);

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

  const handleClickDeleteVideo = (name) => {
    setVideos( videos.filter((e) => e.name != name))
  }

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

    return {
      photos,
      videos,
      handleSetPhotos,
      handleSetVideos,
      handleClickDeletePhoto,
      handleClickDeleteVideo,
    }
  }

  return (
    <div className="contentByCSV">
      <section className="productsByCSVContainer uploadPhotos">
        <h1>Carga de imagenes</h1>
        <section className="productItemsContent">
          <div className="itemUploadingContainer">
            <h3 className="titleItemUploading">Wine - Sogrape Mateus Rose</h3>
            <ProductPhotosFromCSV idProduct={"01"} useMedia={useMedia}/>
           </div>
          <div className="itemUploadingContainer">
            <h3 className="titleItemUploading">Wine - Del super</h3>
            <ProductPhotosFromCSV idProduct={"2"} useMedia={useMedia}/>
          </div>
          
        </section>
        <div className="footerProductsByCSV">
          <Button innerText="Guardar"  width="120px"/>
          <Button innerText="Cancelar" width="120px"/>
        </div>
      </section>
    </div>
  );
};

export default UploadSrcToProductsByCSV;
