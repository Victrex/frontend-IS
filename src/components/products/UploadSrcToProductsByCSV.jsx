// Desc: Upload a CSV file to update products
import { useEffect, useState } from "react";

import { Button } from "../generalComponents/Button";
import ProductPhotosFromCSV from "./ProductPhotosFromCSV";
import {
  saveProductPhotos,
  saveProductVideo,
  updateProductStatus,
} from "../../fetch/products";
import Loading from "../generalComponents/Loading";
import { useCsvStore } from "../store/csv";

const UploadSrcToProductsByCSV = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isUploadingVideos, setIsUploadingVideos] = useState(false);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [isUpdatingProducts, setIsUpdatingProducts] = useState(false);
  const setIsUpt = useCsvStore((state) => state.setIsUpt);
  const [handleActive, setHandleActive] = useState(false);

  const productsFromCSV = useCsvStore((state) => state.products);

  const useMedia = () => {
    const handleSetPhotos = (photo) => {
      if (photos.filter((e) => e.idProduct == photo.idProduct).length >= 6)
        return alert("Solo se pueden subir un 6 fotos por producto");
      setPhotos([...photos, { ...photo }]);
    };

    const handleSetVideos = (video) => {
      if (videos.some((e) => e.idProduct == video.idProduct))
        return alert("Solo se puede subir un video por producto");
      setVideos([...videos, { ...video }]);
    };

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
      setVideos(videos.filter((e) => e.name != name));
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

    return {
      photos,
      videos,
      handleSetPhotos,
      handleSetVideos,
      handleClickDeletePhoto,
      handleClickDeleteVideo,
    };
  };

  const groupPhotosByIdProduct = (photos) => {
    const groupedPhotos = photos.reduce((acc, photo) => {
      if (acc[photo.idProduct]) {
        acc[photo.idProduct].push(photo);
      } else {
        acc[photo.idProduct] = [photo];
      }
      return acc;
    }, {});

    // console.log(Object.values(groupedPhotos));
    // console.log(groupedPhotos);
    return Object.values(groupedPhotos);
  };

  //#region submit
  const handleSavePhotos = async () => {
    // console.log(photos)
    setIsUploadingPhotos(true);
    setIsUploadingVideos(true);
    setIsUpdatingProducts(true);
    setHandleActive(true);
    const groupPhotos = groupPhotosByIdProduct(photos);
    console.log(videos, "videos");
    
    if(productsFromCSV.length !== groupPhotos.length){
      alert('¡Todos Los productos deben almenos una imagen!')
      setIsUploadingPhotos(false);
      setIsUploadingVideos(false);
      setIsUpdatingProducts(false);
      return
    }

    if (videos.length > 0) {
      for (let i = 0; i < videos.length; i++) {
        const video = { file: videos[i].file, name: videos[i].name };
        const idProductVideo = videos[i].idProduct;
        console.log(idProductVideo, video);
        saveProductVideo(video, idProductVideo).catch((error) => {
          // alertEvent("error", error.message);
          console.log(error);
        });
        i === videos.length - 1 && setIsUploadingVideos(false);
      }
    } else {
      setIsUploadingVideos(false);
    }

    for (let i = 0; i < groupPhotos.length; i++) {
      const transformedPhotos = groupPhotos[i]?.map(
        // eslint-disable-next-line no-unused-vars
        ({ idProduct, ...rest }) => rest
      );
      // updateProductStatus(groupPhotos[i][0]?.idProduct, 2);
      await updateProductStatus(groupPhotos[i][0]?.idProduct, 2);
      saveProductPhotos(transformedPhotos, groupPhotos[i][0]?.idProduct);
      i === groupPhotos.length - 1 && setIsUploadingPhotos(false);
      i === groupPhotos.length - 1 && setIsUpdatingProducts(false);
    }

    isUploadingPhotos === false &&
    isUpdatingProducts === false &&
    isUploadingVideos === false
      ? setIsUpt(false)
      : "";
    location.reload();
  };
  //#endregion

  const handleCancel = () => {
    setIsUpt(false);
  };

  // useEffect(() => {
  //   console.log(productsFromCSV);
  // }, [productsFromCSV]);



  return (
    <div className="contentByCSV">
      <section className="productsByCSVContainer uploadPhotos">
        <h1>Carga de imagenes</h1>
        <section className="productItemsContent">
          {productsFromCSV &&
            productsFromCSV.map((product) => {
              return (
                <div className="itemUploadingContainer" key={product.idProduct}>
                  <h3 className="titleItemUploading">{product.productName}</h3>
                  <ProductPhotosFromCSV
                    idProduct={product.idProduct}
                    useMedia={useMedia}
                  />
                </div>
              );
            })}
        </section>
        <div className="footerProductsByCSV">
          <Button
            innerText="Guardar"
            width="120px"
            onClick={handleSavePhotos}
          />
          <Button innerText="Cancelar" width="120px" onClick={handleCancel} />
        </div>
      </section>
      {isUploadingPhotos === true &&
      isUploadingVideos === true &&
      isUpdatingProducts === true ? (
        <Loading classStyle={"loader"} />
      ) : (
        <Loading classStyle={"loader hide"} />
      )}
    </div>
  );
};

export default UploadSrcToProductsByCSV;
