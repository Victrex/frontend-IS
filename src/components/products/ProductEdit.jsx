import { useParams } from "react-router-dom";
import ProductRegister from "./ProductRegister";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getProductPhoto, getProductVideo } from "../../fetch/products";
import { useEffect, useState } from "react";

const ProductEdit = () => {
  const [photos, setPhotos] = useState(null);
  const [video, setVideo] = useState(null);
  const { id } = useParams(null);
  const { data: productData } = useQuery({
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

      const video = productData?.video ? await getProductVideo(productData?.video?.idVideo) : null;

      // Guardar las fotos en el estado
      setPhotos(photos);
      setVideo(video);
    };

    if (productData) {
      fetchPhotos();
    }
  }, [productData]);

  /*   useEffect(() => {
    console.log(productData, error, isLoading, isError);
    if (!isError && !isLoading && productData) {
      for (let i = 0; i < defaultPhotos; i++) {

        }
    }
  }, [productData, error, isLoading, isError]); */

/*   useEffect(() => {
    console.log(photos);
  }, [photos]); */
  return (
    <div>
      <ProductRegister idProduct={id} data={productData} photosData={photos} videoData={video} />
    </div>
  );
};

export default ProductEdit;
