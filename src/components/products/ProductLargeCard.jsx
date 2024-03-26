/* eslint-disable react/prop-types */

import { QueryClient, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getProductPhoto, updateProductStatus } from "../../fetch/products";
import { Button } from "../generalComponents/Button";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Context } from "./Products";
import { useNavigate } from "react-router-dom";
const ProductLargeCard = ({ product }) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { setNewDateProductModal, setCurrentIdProduct, setCurrentDataProduct, setEditProductActive } = useContext(Context);
  const [productPhoto, setProductPhoto] = useState(
    "https://via.placeholder.com/150"
  );
  const { data: photo } = useQuery({
    queryKey: ["photo", product.idProduct],
    queryFn: () => getProductPhoto(product?.photo1.idPhoto),
  });

  const handleStatusChange = (idProduct, idStatus) => {
    console.log("status changed", idProduct, idStatus);
    //1 -> pendiente, 2 -> Activo (Sin Vender), 3 -> Cancelado/Vendido (Vendido)
    let newStatus = idStatus === 1 ? 2 : idStatus === 2 ? 3 : 1;
    setCurrentIdProduct(idProduct);
    setCurrentDataProduct(product)
    idStatus === 2
      ? updateProductStatus(idProduct, newStatus).then(() => {
          location.reload();
          queryClient.invalidateQueries(["products", product.idUser.idUser]);
          queryClient.refetchQueries(["products", product.idUser.idUser]);
          queryClient.invalidateQueries(["photo", product.idProduct]);
        })
      : idStatus === 3
      ? setNewDateProductModal(true)
      : idStatus === 1
      ? navigate(`/prd/edit/${idProduct}`)
      : "";
  };

  useEffect(() => {
    if (photo) {
      setProductPhoto(photo);
    }
  }, [photo]);

  return (
    <div className="largeCard">
      
      <div className="largeCardImage">
        <img src={productPhoto} alt="product" />
      </div>
      <div className="largeCardText">
        <div className="metaProduct">
          {product?.idStatus?.idStatus === 3 ? (
            <h3 style={{ textDecoration: "line-through", color: "#474747b9" }}>
              {product?.productName}
            </h3>
          ) : (
            <h3>{product?.productName}</h3>
          )}
          <p style={{ fontWeight: "600" }}>
            L. {product?.value.toLocaleString("en-US")}
          </p>
          <p>{product?.productDescription}</p>
          <p>{product?.idCondition.conditionName}</p>
        </div>
        <div className="actionsProduct">
          {
            // eslint-disable-next-line no-unused-expressions
            product?.idStatus?.idStatus === 1 ? (
              <Button
                innerText="Continuar"
                color="#2980b9"
                backgroundColor="#d4e0e9ba"
                fontSize="0.85rem"
                fontWeight="600"
                width="170px"
                minWidth="170px"
                maxWidth="100%"
                height="35px"
                icon={<EditIcon />}
                iconPosition="left"
                onClick={() => handleStatusChange(product.idProduct, 1)}
              />
            ) : product?.idStatus?.idStatus === 2 ? (
              <Button
                innerText="Marcar como vendido"
                color="#2980b9"
                backgroundColor="#d4e0e9ba"
                fontSize="0.85rem"
                fontWeight="600"
                minWidth="190px"
                maxWidth="100%"
                height="35px"
                icon={<CheckCircleIcon />}
                iconPosition="left"
                onClick={() => handleStatusChange(product.idProduct, 2)}
              />
            ) : product?.idStatus?.idStatus === 3 ? (
              <Button
                innerText="Marcar como Disponible"
                color="#2980b9"
                backgroundColor="#d4e0e9ba"
                fontSize="0.85rem"
                fontWeight="600"
                width="200px"
                minWidth="180px"
                maxWidth="100%"
                height="35px"
                icon={<EventAvailableIcon />}
                iconPosition="left"
                onClick={() => handleStatusChange(product.idProduct, 3)}
              />
            ) : (
              ""
            )
          }
          <Button
            innerText="Editar Publicación"
            color="#575757"
            backgroundColor="#dadadab9"
            fontSize="0.85rem"
            fontWeight="600"
            width="165px"
            minWidth="165px"
            maxWidth="100%"
            height="35px"
            icon={<EditCalendarIcon />}
            iconPosition="left"
            onClick={() => handleStatusChange(product.idProduct, 1)}
          />
        </div>
      </div>
      <span className="largeCardStatus">{product?.idStatus.statusName}</span>

      
    </div>
  );
};

export default ProductLargeCard;
