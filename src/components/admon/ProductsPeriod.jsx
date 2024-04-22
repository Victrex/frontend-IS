import { useEffect, useState } from "react";
import { getCurrentPeriod, updateCurrentPeriod } from "../../fetch/admin";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ProductsPeriod = () => {
  const [params, setParams] = useState(0);

  const navigate = useNavigate();
  
  const {data: currentPeriod} = useQuery({
    queryKey: ['currentPeriod'],
    queryFn: getCurrentPeriod
  })
  
  const handleChangeParams = async (e) => {
    setParams(e.target.value);
    await updateCurrentPeriod(parseInt(e.target.value));
  };


  useEffect(() => {
    setParams(currentPeriod?.value)
  }, [currentPeriod])
  return (
    <div>
      <div className="yearSelect">
        <label htmlFor="yearFilter">Periodo de vigencia de productos: </label>
        <select name="period" id="" value={params} onChange={handleChangeParams}>
          {Array.from({ length: 91 }, (_, i) => (
            <option key={i + 60} value={i + 60}>
              {i + 60}
            </option>
          ))}
        </select>
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
