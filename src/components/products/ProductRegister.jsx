import { useQuery } from "@tanstack/react-query";
import {
  getAllProductCategories,
  getAllProductStatus,
} from "../../fetch/products";
import { useEffect } from "react";
import { useState } from "react";
import { getAllDepartments } from "../../fetch/addresses";
import ProductPhotos from "./ProductPhotos";
import { Button } from "../generalComponents/Button";

const ProductRegister = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [departmentsList, setDepartmentsList] = useState([]);
  const [department, setDepartment] = useState();
  const [description, setDescription] = useState();
  const [productName, setProductName] = useState();



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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("object");
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
