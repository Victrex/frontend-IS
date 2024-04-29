import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { getAllProductCategories } from "../../fetch/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Bars = ({ dataSet }) => {
  const [aspectRatio, setAspectRatio] = useState(false); // Set the aspect ratio to 4:1 by default
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllProductCategories,
  });

  const entry = dataSet?.counts?.map((item) => item);
  const categoriesList = categories?.map((item) => item.categoryName);

  /* FUNCIONES */
  const maxEntry = Array.isArray(entry) ? Math.max(...entry) + 1 : 0;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setAspectRatio(true); // Cambia la relación de aspecto a 2:1 si el ancho del viewport es menor a 500px
      } else {
        setAspectRatio(false); // De lo contrario, establece la relación de aspecto a 4:1
      }
    };

    // Escucha el evento de cambio de tamaño y ajusta la relación de aspecto en consecuencia
    window.addEventListener("resize", handleResize);

    // Llama a la función de manejo de cambio de tamaño inicialmente para establecer la relación de aspecto correcta
    handleResize();

    // Limpia el evento de cambio de tamaño cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /* CONFIGURACIONES */
  const misoptions = {
    responsive: true,
    aspectRatio: aspectRatio === true ? 6 : 16 / 3, // Change the aspect ratio to 2:1
    maintainAspectRatio: false,
    animation: true,
    type: "bar",
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: maxEntry,
        ticks: { color: "#081e4ddc", stepSize: 1 },
      },
      x: {
        ticks: { color: "#08369bdc" },
      },
    },
    barThickness: 35,
    barPercentage: 0.8,
    backgroundColor: "rgba(223, 175, 17, 0.644)",
  };

  const midata = {
    labels: categoriesList,
    datasets: [
      {
        label: "Categorias",
        data: entry,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // color para la primera barra
          "rgba(54, 162, 235, 0.2)", // color para la segunda barra
          "rgba(255, 206, 86, 0.2)", // color para la tercera barra
          "rgba(75, 192, 192, 0.2)", // color para la cuarta barra
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          // ... más colores para las demás barras
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // color del borde para la primera barra
          "rgba(54, 162, 235, 1)", // color del borde para la segunda barra
          "rgba(255, 206, 86, 1)", // color del borde para la tercera barra
          "rgba(75, 192, 192, 1)", // color del borde para la cuarta barra
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          // ... más colores para los bordes de las demás barras
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="barsBody">
      <h3>Departamentos más filtrados</h3>
      <Bar data={midata} options={misoptions} />{" "}
    </div>
  );
};

Bars.propTypes = {
  dataSet: PropTypes.object,
};

Bars.defaultProps = {
  dataSet: {}, // provide a default empty array
};
export default Bars;
