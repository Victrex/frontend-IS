import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import {
  getProductById,
  getProductPhoto,
  getProductVideo,
} from "../../fetch/products";
import { useParams } from "react-router-dom";
import ProductByIdShowPhotos from "./ProductByIdShowPhotos";
import ProductByIdShowInfo from "./ProductByIdShowInfo";
import ProductRatingModal from "./ProductRatingModal";

export const ProductContext = createContext(null);

const ProductById = () => {
  const [photos, setPhotos] = useState(null);
  const [video, setVideo] = useState(null);
  const [activeRateModal, setActiveRateModal] = useState(false);
  const [typeRating, setTypeRating] = useState(null); // Nuevo estado para el tipo de calificación [product, vendor, service
  const { id } = useParams(null);
  const [idRated, setIdRated] = useState(null);
  const [data, setData] = useState(null); // Nuevo estado para guardar la data del producto [product, vendor, service
  const { data: productData, isLoading } = useQuery({
    queryKey: ["productById", id],
    queryFn: () => getProductById(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    const fetchPhotos = async () => {
      // Crear un array con los IDs de las fotos
      const photoIds = [
        productData?.photo1,
        productData?.photo2,
        productData?.photo3,
        productData?.photo4,
        productData?.photo5,
        productData?.photo6,
      ]
        .filter((photo) => photo !== null)
        .map((photo) => photo?.idPhoto);

      // Hacer un fetch para cada ID de foto y guardar las promesas en un array
      const photoPromises = photoIds?.map((id) => getProductPhoto(id));

      // Usar Promise.all para esperar a que todas las promesas se resuelvan
      const photos = await Promise.all(photoPromises);

      const video = productData?.video
        ? await getProductVideo(productData?.video?.idVideo)
        : null;

      // Guardar las fotos en el estado
      setPhotos(photos);
      setVideo(video);
    };

    if (productData) {
      fetchPhotos();
    }
    setData(productData);
  }, [productData]);

  if (!isLoading) {
    console.log(typeof video);
    return (
      <ProductContext.Provider value={{ activeRateModal, setActiveRateModal, typeRating, setTypeRating, setIdRated, idRated, data }}>
        <div className="productByIdContainer">
          <ProductByIdShowPhotos photos={photos || []} video={{ url: video }} />
          <ProductByIdShowInfo productData={productData} />
        </div>
        {
          activeRateModal && <ProductRatingModal/>
        }
      </ProductContext.Provider>
    );
  }
};

export default ProductById;
