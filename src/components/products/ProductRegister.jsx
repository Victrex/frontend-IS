/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import {
  deleteProductPhoto,
  getAllProductCategories,
  getAllProductConditions,
  getAllProductStatus,
  saveProduct,
  saveProductPhotos,
  saveProductVideo,
  updateProductPhoto,
} from "../../fetch/products";
import "react-day-picker/dist/style.css";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { getAllDepartments } from "../../fetch/addresses";
import ProductPhotos from "./ProductPhotos";
import { Button } from "../generalComponents/Button";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { Context } from "./Products";
import { useAuthStore } from "../store/auth";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ProductRegister = ({
  idProduct: idProductToEdit,
  data: productDataToEdit,
  photosData: photosDataToEdit,
  videoData: videoDataToEdit,
}) => {
  /* DATA FROM IMPORT */
  const [categoriesList, setCategoriesList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [statusList, setStatusList] = useState([]);

  /* DATA */
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(2);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const [price, setPrice] = useState(0);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());

  /* DATA IMPORTS */
  const idUser = useAuthStore((state) => state.idUser);
  const { photos } = useContext(Context);
  const { video } = useContext(Context);
  const { setPhotos } = useContext(Context);
  const { setVideo } = useContext(Context);
  const { setFirstPhoto } = useContext(Context);

  /* METHODS */
  const navigate = useNavigate();

  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getAllProductCategories,
    staleTime: Infinity,
  });

  const { data: statusData } = useQuery({
    queryKey: ["status"],
    queryFn: getAllProductStatus,
    staleTime: Infinity,
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
    staleTime: Infinity,
  });

  const { data: conditionsData } = useQuery({
    queryKey: ["conditions"],
    queryFn: getAllProductConditions,
    staleTime: Infinity,
  });

  const handlePriceChange = (e) => {
    const regex = /[^0-9.,]/g;
    if (regex.test(e.target.value)) {
      console.log(e.target.value);
      return null;
    } else {
      setPrice(e.target.value);
    }
  };

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  const alertEvent = (type, message = "") => {
    const $ = (selector) => document.querySelector(selector);
    const $alert = $(".alertsContainer");
    const $success = $(".alertsContainer .alertSuccess");
    const $error = $(".alertsContainer .alertError");

    $alert.classList.add("showAlerts");
    switch (type) {
      case "success":
        $success.style.display = "block";
        $error.style.display = "none";
        break;
      case "error":
        $success.style.display = "none";
        $error.style.display = "block";
        break;
      default:
        break;
    }

    const $message = document.getElementById("message");
    $message.innerHTML = message;
    setTimeout(() => {
      $alert.classList.remove("showAlerts");
    }, 1500);
    return null;
  };

  async function updateOrDeletePhotos(productPhotos) {
    for (let i = 1; i <= 6; i++) {
      console.log(productPhotos[i - 1].file?.type);
      if (productPhotos[i - 1].file?.type === "video/mp4") {
        // console.log("Se esta haciendo un update al indice ", i);
        await saveProductVideo(
          productPhotos[i - 1] ?? null,
          idProductToEdit,
          i
        );
      } else {
        if (
          !(
            productPhotos[i - 1] === null ||
            productPhotos[i - 1] === "" ||
            productPhotos[i - 1] === undefined
          )
        ) {
          // console.log("Se esta haciendo un update al indice ", i);
          await updateProductPhoto(
            productPhotos[i - 1] ?? null,
            idProductToEdit,
            i
          );
        } else if (
          productPhotos[i - 1] === null ||
          productPhotos[i - 1] === "" ||
          productPhotos[i - 1] === undefined
        ) {
          // console.log("Se esta haciendo un delete al indice ", i);
          await deleteProductPhoto(idProductToEdit, i);
        }
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    /* DATE GENERATOR */
    const date = new Date(releaseDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const relDate = `${year}-${month}-${day}T00:00:00.000Z`;
    let statusVal = 2; // 1 -> pendiente , 2 -> activo
    /* INITIALIZERS */
    if (releaseDate > new Date()) {
      // si la fecha es mayor queda en pendiente

      statusVal = 1;
    } else if (releaseDate <= new Date()) {
      // si la fecha es igual o menor queda en activo
      statusVal = 2;
    }
    /* FIELD VALIDATIONS */
    if (photos.length < 1) {
      return alertEvent("error", "Debe subir al menos una foto");
    }
    console.log(typeof photos);
    const productPhotos = [...photos, video ?? null];
    // console.log(productPhotos, video);
    if (
      productName === "" ||
      price === 0 ||
      category === "" ||
      status === "" ||
      department === "" ||
      description === ""
    )
      return alertEvent("error", "Todos los campos son requeridos");

    /* PRODUCT OBJECT */
    const product = {
      idProduct: idProductToEdit !== 0 ? idProductToEdit : "",
      idUser: idUser,
      productName: productName,
      value: price,
      idCategory: parseInt(category),
      idStatus: parseInt(statusVal),
      idDepartment: parseInt(department),
      productDescription: description,
      releaseDate: relDate,
      idCondition: parseInt(condition),
    };
    console.log(product);
    console.log(productPhotos);
    /* FETCH CALL */
    saveProduct(product).then((res) => {
      // console.log(isEditing);
      if (isEditing == false) {
        console.log("isEditing", isEditing);

        video !== null
          ? saveProductVideo(video, res.idProduct).catch((error) => {
              // alertEvent("error", error.message);
              console.log(error);
            })
          : "";
        saveProductPhotos(photos, res.idProduct)
          .then((res) => {
            alertEvent("success", res.message);
            setTimeout(() => {
              setPhotos([]);
              setFirstPhoto(null);
              setVideo(null);
              document.getElementById("0").click();
            }, 1500);
          })
          .catch((error) => {
            alertEvent("error", error.message);
          });
      } else if (isEditing === true) {
        updateOrDeletePhotos(productPhotos);
        /* for (let i = 1; i <= 6; i++) {
          // console.log(!(productPhotos[i - 1] === null || productPhotos[i-1] === '' || productPhotos[i-1] === undefined), productPhotos[i-1], i);
          if (
            !(
              productPhotos[i - 1] === null ||
              productPhotos[i - 1] === "" ||
              productPhotos[i - 1] === undefined
            )
          ) {
            console.log("Se esta haciendo un update al indice ", i);
            updateProductPhoto(
              productPhotos[i - 1] ?? null,
              idProductToEdit,
              i
            );
          } else if (
            productPhotos[i - 1] === null ||
            productPhotos[i - 1] === "" ||
            productPhotos[i - 1] === undefined
          ) {
            // console.log(idProductToEdit, i)
            console.log("Se esta haciendo un delete al indice ", i);
            deleteProductPhoto(idProductToEdit, i);
          }
        } */
        alertEvent("success", res.message);
        setTimeout(() => {
          setPhotos([]);
          setFirstPhoto(null);
          setVideo(null);
          // location.reload();
          document.getElementById("0").click();
        }, 1500);
      }
    });
  };

  useEffect(() => {
    if ((statusData, conditionsData)) {
      setStatusList(statusData);
      setConditionList(conditionsData);
    }
  }, [statusData, conditionsData]);

  useEffect(() => {
    if (departmentsData) {
      setDepartmentsList(departmentsData);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (productCategories) {
      setCategoriesList(productCategories);
    }
  }, [productCategories]);

  useEffect(() => {
    if (idProductToEdit !== 0) {
      setIsEditing(true);
      setProductName(productDataToEdit?.productName);
      setPrice(productDataToEdit?.value);
      setCategory(productDataToEdit?.idCategory.idCategory);
      setStatus(productDataToEdit?.idStatus.idStatus);
      setDepartment(productDataToEdit?.idDepartment.idDepartment);
      setDescription(productDataToEdit?.productDescription);
      setReleaseDate(new Date(productDataToEdit?.releaseDate));
      setCondition(productDataToEdit?.idCondition.idCondition);
      setPhotos(photosDataToEdit);
      setVideo(videoDataToEdit);
    }
  }, [
    idProductToEdit,
    productDataToEdit,
    photosDataToEdit,
    setPhotos,
    videoDataToEdit,
    setVideo,
  ]);

  return (
    <div className="content">
      <form action="" className="productRegister">
        <div
          className="returnBack"
          onClick={() => document.getElementById("0").click()}
        >
          <span>
            {" "}
            <ArrowBackIosNewIcon /> Atras
          </span>
        </div>
        {idProductToEdit !== 0 ? (
          <h2>Editar Producto</h2>
        ) : (
          <h2>Registro de Producto</h2>
        )}
        <ProductPhotos isEditing={isEditing} />
        <div className="inputGroup">
          <label htmlFor="expirationDate">Nombre del Producto</label>
          <input
            onChange={handleProductName}
            className="inputForm pr "
            type="text"
            name="expirationDate"
            value={productName}
            required
          ></input>
        </div>
        <div className="inputGroup">
          <label htmlFor="expirationDate">Precio</label>
          <input
            onChange={handlePriceChange}
            className="inputForm pr "
            type="text"
            name="expirationDate"
            value={price}
            required
            style={{ paddingLeft: "30px" }}
          ></input>
          <span className="forPrice">L.</span>
        </div>
        <div className="inputGroup">
          <label htmlFor="expirationDate">Categoria</label>
          <select
            name="category"
            id="category"
            className="inputForm pr"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="">Seleccione una categoria</option>
            {categoriesList.map((category) => (
              <option key={category.idCategory} value={category.idCategory}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="inputGroup">
          <label htmlFor="expirationDate">Estado</label>
          <select
            name="status"
            id="status"
            className="inputForm pr"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            required
          >
            <option value="">Seleccione un estado</option>
            {statusList.map((status) => (
              <option key={status.idStatus} value={status.idStatus}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div> */}
        {/* ------------------------------------------------------ */}
        <div className="inputGroup">
          <label htmlFor="expirationDate">Condición del Producto</label>
          <select
            name="status"
            id="status"
            className="inputForm pr"
            onChange={(e) => setCondition(e.target.value)}
            value={condition}
            required
          >
            <option value="">Seleccione una condición</option>
            {conditionList &&
              conditionList.map((status) => (
                <option key={status?.idCondition} value={status?.idCondition}>
                  {status?.conditionName}
                </option>
              ))}
          </select>
        </div>
        {/* ------------------------------------------------------ */}
        <div className="inputGroup">
          <label htmlFor="expirationDate">Departamento</label>
          <select
            name="department"
            id="department"
            className="inputForm pr"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departmentsList.map((department) => (
              <option
                key={department?.idDepartment}
                value={department?.idDepartment}
              >
                {department?.departmentName}
              </option>
            ))}
          </select>
        </div>
        {/* ------------------------ */}
        <div className="inputGroup">
          <label htmlFor="expirationDate">Fecha de Publicación</label>

          <DayPicker
            mode="single"
            selected={releaseDate}
            onSelect={setReleaseDate}
            locale={es}
            // fromMonth={new Date()}
            fromDate={new Date()}
            modifiersStyles={{
              selected: {
                backgroundColor: "#0F72BA",
                color: "white",
              },
            }}
          />
        </div>
        {/* ----------------------- */}
        <div className="inputGroup">
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            id="description"
            className="inputForm pr"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              resize: "none",
              minHeight: "100px !important",
              maxHeight: "100px !important",
              height: "100px !important",
            }}
            required
          ></textarea>
        </div>
        <Button
          innerText={
            idProductToEdit !== 0 ? "Editar Producto" : "Registro de Producto"
          }
          width="170px"
          fontSize="0.9rem"
          fontWeight="500"
          backgroundColor="#3587e6"
          color="#fff"
          onClick={handleSubmit}
        />
      </form>
      <div className="alertsContainer">
        <div className="alertSuccess">
          <Alert
            severity="success"
            onClose={() => {
              const $ = (selector) => document.querySelector(selector);
              const $alert = $(".alertsContainer");
              $alert.classList.remove("showAlerts");
              navigate("../");
            }}
          >
            <AlertTitle>¡Se guardó el producto Exitosamente!</AlertTitle>
          </Alert>
        </div>
        <div className="alertError">
          <Alert
            severity="error"
            onClose={() => {
              const $ = (selector) => document.querySelector(selector);
              const $alert = $(".alertsContainer");
              $alert.classList.remove("showAlerts");
            }}
          >
            <AlertTitle>Error al guardar el producto</AlertTitle>
            <span id="message"></span>
          </Alert>
        </div>
        <div className="backGround"></div>
      </div>
    </div>
  );
};

export default ProductRegister;
