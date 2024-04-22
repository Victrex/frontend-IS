import { useState, useEffect } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";

import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import ProductComment from "./ProductComment";
import UploadImages from "./UploadImages";

import {
  getCommentByUserAndProduct,
  commentProduct,
  getCommentsByProduct,
  updateProductRatingPhotos,
  saveProductRatingPhotos,
} from "../../../fetch/products";

import "../../../assets/css/commentSection.css";
// import { useContext, useEffect } from "react";
// import PropTypes from "prop-types";
// import { ProductContext } from "../ProductById";
import { useAuthStore } from "../../store/auth";
import ProductRating from "../ProductRating";
// import { getProfilePhoto } from "../../../fetch/userAPI";

const CommentSection = ({ idProduct }) => {
  // const { setActiveRateModal } = useContext(ProductContext);
  // const { setTypeRating } = useContext(ProductContext);
  // const { setIdRated } = useContext(ProductContext);
  // const [profilePhoto, setProfilePhoto] = useState(null);
  // const isAuth = useAuthStore((state) => state.isAuth);
  const idUser = useAuthStore((state) => state.idUser);
  const queryClient = new QueryClient();

  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0); // Nuevo estado para la calificación
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(0); // Nuevo estado para la calificación al pasar el cursor
  const [comment, setComment] = useState(null); // Nuevo estado para la calificación al pasar el cursor
  const [idComment, setIdComment] = useState(0);
  const [pageRating, setPageRating] = useState(0);
  const [sizeRating, setSizeRating] = useState(10);
  const [isCommentExist, setIsCommentExist] = useState(false);//que vaya en false por defecto

  const { data: commentData, isError: isErrorCommentByUserAndProduct, } = useQuery({
    queryKey: ["commentByUserAndProduct"],
    queryFn: () => getCommentByUserAndProduct(idUser, idProduct),
    staleTime: Infinity
  });

  const { data: commentsList } = useQuery({
    queryKey: ["comments", idProduct, pageRating, sizeRating],
    queryFn: () => getCommentsByProduct(idProduct, pageRating, sizeRating),
    enabled: true,
  });

  // if (isError) {
  //   queryClient.cancelQueries(["comments", idProduct, pageRating, sizeRating]);
  //   setIsCommentExist(false);
  // }

  useEffect(() => {
    commentData && setIsCommentExist(true);

    try {
      console.log(commentData);
      setComment(commentData)
      setDescription(commentData?.comment);
      setRating(commentData?.rate);
      setIdComment(commentData?.idRating);
    } catch (error) {
      console.log("No hay comentario para este producto");
    }

  }, [commentData]);

  useEffect(() => {
    console.log("No se ha comentado");
    
  }, [isErrorCommentByUserAndProduct])
  

  const handleSetRating = (ratingValue) => {
    setEditing(true);
    setRating(ratingValue);
  };

  const useMedia = (imagesLimit = 3, videosLimit = 0) => {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);

    const onSelectPhoto = (e) => {
      const file = Array.from(e.target.files);
      if (!file) return;

      file?.forEach((file) => {
        if (file.type == "video/mp4") {
          handleSetVideos({ file, name: fileNameCure(file.name) });
        } else {
          handleSetPhotos({ file, name: fileNameCure(file.name) });
        }
      });
      e.preventDefault();
    };

    const handleSetPhotos = (photo) => {
      if (photos.length >= imagesLimit)
        return alert(`Solo se pueden subir ${imagesLimit} fotos`);
      setPhotos([...photos, { ...photo }]);
    };

    const handleSetVideos = (video) => {
      if (videos.length >= videosLimit)
        return alert(`Solo se pueden subir ${videosLimit} videos`);
      setVideos([...videos, { ...video }]);
    };

    const handleClickDeletePhoto = (name) => {
      // const blob = new Blob([name], { type: "image/png" });
      // const type = isImageOrVideo(blob);

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

    return {
      photos,
      videos,
      handleSetPhotos,
      handleSetVideos,
      handleClickDeletePhoto,
      handleClickDeleteVideo,
      onSelectPhoto,
    };
  };

  const {
    photos,
    videos,
    handleSetPhotos,
    handleSetVideos,
    handleClickDeletePhoto,
    handleClickDeleteVideo,
    onSelectPhoto,
  } = useMedia(3, 0);

  const media = {
    photos,
    videos,
    handleSetPhotos,
    handleSetVideos,
    handleClickDeletePhoto,
    handleClickDeleteVideo,
    onSelectPhoto,
  };

  const getFile = () => {
    document.getElementById("media").click();
  };

  const onSubmitComment = async () => {
    if (comment != null) return;

    const response = await commentProduct({
      comment: description,
      rate: rating,
      idProduct,
      idUser,
      idRating: 0,
    });
    // const data = response.json()
    console.log(response);

    if (photos.length == 0) return alert("Producto calificado con éxito")
    
    const responsePhotos = await saveProductRatingPhotos(response.idProductRating, photos);
    console.log("responsePhotos: ", responsePhotos);
    location.reload();

  };

  return (
    <>
      <div className="commentsHeader">
        <h4>Calificar producto</h4>
        {editing && (
          <div onClick={() => onSubmitComment()}>
            <h4 className="publicarBtn">Publicar</h4>
          </div>
        )}
      </div>
      <p>Comparte tu opinión con otros usuarios</p>

      <div className="commentsStarsContent">
        {
        isCommentExist === false ? (
        [...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleSetRating(ratingValue)}
                style={{ display: "none" }}
              />
              <StarIcon
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                style={{
                  color:
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                }}
              />
            </label>
          );
        }))
        : (<ProductRating rating={rating} />)
      }
      </div>

      {isCommentExist === false ? (
        <div className="commentsRateBtn" onClick={() => setEditing(!editing)}>
          <EditIcon />
          &nbsp; <span>Escribe una reseña</span>
        </div>
      ) : (
        <>
        <div className="commentByUser">
          &nbsp; <span>{description ?? ''}</span>
        </div>
        </>

      )}

      <div className="line"></div>
      <br />
        <h4>Otros Comentarios</h4>
      {editing && (
        <>
          <div className="inputGroup textarea-container">
            <textarea
              name="description"
              id="description"
              className="inputForm pr"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            <AddAPhotoIcon onClick={getFile} />
          </div>
          <UploadImages {...media} />
        </>
      )}

      <br />
      {commentsList?.map((comment, index) => (
        <ProductComment key={index} comment={comment} />
      ))}
    </>
  );
};

export default CommentSection;
