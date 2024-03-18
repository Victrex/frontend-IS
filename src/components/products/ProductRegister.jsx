import { useQuery } from "@tanstack/react-query";
import {
  getAllProductCategories,
  getAllProductStatus,
} from "../../fetch/products";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import { useState } from "react";
import { getAllDepartments } from "../../fetch/addresses";
import ProductPhotos from "./ProductPhotos";
import { Button } from "../generalComponents/Button";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

const ProductRegister = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState(1);
  const [category, setCategory] = useState(1);
  const [price, setPrice] = useState(0);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [department, setDepartment] = useState(1);
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [condition, setCondition] = useState(1);

  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getAllProductCategories,
  });

  const { data: statusData } = useQuery({
    queryKey: ["status"],
    queryFn: getAllProductStatus,
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date(releaseDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const relDate = `${year}-${month}-${day}T00:00:00.000Z`;
    const product = {
      idProduct: "",
      productName: productName,
      value: price,
      idCategory: parseInt(category),
      idStatus: parseInt(status),
      idDepartment: parseInt(department),
      productDescription: description,
      releaseDate: relDate,
      idCondition: parseInt(condition),
    };
    console.log(product);
  };

  useEffect(() => {
    if (statusData) {
      setStatusList(statusData);
    }
  }, [statusData]);

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
  return (
    <div className="content">
      <form action="" className="productRegister">
        <h2>Registro de Producto</h2>

        <ProductPhotos />
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
        <div className="inputGroup">
          <label htmlFor="expirationDate">Estado</label>
          <select
            name="status"
            id="status"
            className="inputForm pr"
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Seleccione un estado</option>
            {statusList.map((status) => (
              <option key={status.idStatus} value={status.idStatus}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="expirationDate">Condición del Producto</label>
          <select
            name="status"
            id="status"
            className="inputForm pr"
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Seleccione un estado</option>
            {statusList.map((status) => (
              <option key={status.idStatus} value={status.idStatus}>
                {status.statusName}
              </option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="expirationDate">Departamento</label>
          <select
            name="department"
            id="department"
            className="inputForm pr"
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departmentsList.map((department) => (
              <option
                key={department.idDepartment}
                value={department.idDepartment}
              >
                {department.departmentName}
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
          innerText="Registrar Producto"
          width="170px"
          fontSize="0.9rem"
          fontWeight="500"
          backgroundColor="#3587e6"
          color="#fff"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default ProductRegister;
