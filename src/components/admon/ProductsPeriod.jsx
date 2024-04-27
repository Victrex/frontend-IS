import { useEffect, useState } from "react";
import { getCurrentPeriod, updateCurrentPeriod } from "../../fetch/admin";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllProductCategories } from "../../fetch/products";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "../generalComponents/Button";
const ProductsPeriod = () => {
  const [params, setParams] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('0');

  const navigate = useNavigate();

  // const { data: currentPeriod } = useQuery({
  //   queryKey: ["currentPeriod"],
  //   queryFn: getCurrentPeriod,
  // });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllProductCategories,
  });

  const handleChangeParams = async (e) => {
    const prueba = parseInt(e.target.value);
    console.log(!isNaN(prueba));
    if (!isNaN(prueba) && categorySelected !== "0") {
      console.log("es un numero");
      console.log(e.target.value);
      setParams(e.target.value);
      await updateCurrentPeriod(parseInt(e.target.value));
    } else {
      return null;
    }
  };
  const handlePlusRest = async (e) => {
    if (categorySelected === "0") {
      return null;
    } else {
      setParams(e);
      await updateCurrentPeriod(categorySelected, e);
    }
  };

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  // useEffect(() => {
  //   if (currentPeriod?.value) {
  //     setParams(currentPeriod.value);
  //   }
  // }, [currentPeriod]);

  // useEffect(() => {
  //   async function fetchData() {
  //     await updateCurrentPeriod(categorySelected, params);
  //   }
  //   fetchData();
  // }, [params, categorySelected]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrentPeriod(categorySelected);
      console.log(response);
      setParams(response.value);
    };

    if (categorySelected !== "0") {
      console.log(categorySelected);

      fetchData();
    }
  }, [categorySelected]);

  return (
    <div>
      <div className="yearSelect">
        <label htmlFor="yearFilter">Periodo de vigencia de productos: </label>

        <select
          name="category"
          style={{ width: "100%" }}
          id=""
          value={categorySelected}
          onChange={(e) => setCategorySelected(e.target.value)}
        >
          <option value={'0'}>Seleccionar Categoria</option>
          {categories?.map((category) => (
            <option key={category.idCategory} value={category.idCategory}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <div className="periodCount">
          <Button
            className="btn"
            innerText=""
            icon={<RemoveIcon />}
            width="40px"
            minWidth="20px"
            backgroundColor="#46689C"
            color="#fff"
            onClick={() => {
              handlePlusRest(params - 1);
            }}
          />
          <input
            className="inputCount"
            type="number"
            value={params}
            onChange={handleChangeParams}
            min="60"
          />
          <Button
            className="btn"
            innerText=""
            icon={<AddIcon />}
            width="40px"
            minWidth="20px"
            backgroundColor="#46689C"
            color="#fff"
            onClick={() => {
              handlePlusRest(params + 1);
            }}
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
