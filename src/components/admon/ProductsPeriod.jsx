import { useEffect, useState } from "react";
import { getCurrentPeriod, updateCurrentPeriod } from "../../fetch/admin";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllProductCategories } from "../../fetch/products";
const ProductsPeriod = () => {
  const [params, setParams] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(0);

  const navigate = useNavigate();

  const { data: currentPeriod } = useQuery({
    queryKey: ["currentPeriod"],
    queryFn: getCurrentPeriod,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllProductCategories,
  });

  const handleChangeParams = async (e) => {
    setParams(e.target.value);
    await updateCurrentPeriod(parseInt(e.target.value));
  };

  useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  useEffect(() => {
    setParams(currentPeriod?.value);
  }, [currentPeriod]);
  return (
    <div>
      <div className="yearSelect">
        <label htmlFor="yearFilter">Periodo de vigencia de productos: </label>
        {/* <select name="period" id="" value={params} onChange={handleChangeParams}>
          {Array.from({ length: 91 }, (_, i) => (
            <option key={i + 60} value={i + 60}>
              {i + 60}
            </option>
          ))}
        </select> */}
        <div>
          <select
            name="category"
            style={{ width: "100%" }}
            id=""
            value={categorySelected}
            onChange={(e) => setCategorySelected(e.target.value)}
          >
            <option value={0}>Seleccionar Categoria</option>
            {categories?.map((category) => (
              <option key={category.idCategory} value={category.idCategory}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <input
            className="inputForm"
            type="number"
            value={params}
            onChange={handleChangeParams}
            min="60"
          />
        </div>
      </div>
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

export default ProductsPeriod;
