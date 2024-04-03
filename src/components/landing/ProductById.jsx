import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductPhoto,
  getProductVideo,
} from "../../fetch/products";
import { useParams } from "react-router-dom";
import ProductByIdShowPhotos from "./ProductByIdShowPhotos";
import ProductByIdShowInfo from "./ProductByIdShowInfo";

const ProductById = () => {
  const [photos, setPhotos] = useState(null);
  const [video, setVideo] = useState(null);
  const { id } = useParams(null);
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
  }, [productData]);

  if (!isLoading) {
    return (
      <div className="productByIdContainer">
        <ProductByIdShowPhotos photos={photos || []} video={video || {}} />
        <ProductByIdShowInfo productData={productData} />
      </div>
    );
  }
};

export default ProductById;
