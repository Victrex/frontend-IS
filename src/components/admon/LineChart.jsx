import PropTypes from 'prop-types';
import { getAllProductCategories } from '../../fetch/products';
import { useQuery } from '@tanstack/react-query';

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)


const LineChart = ({ dataSet }) => {
  const {data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: getAllProductCategories
  })
  // const entradas = [3400, 5026, 2000, 3000, 800]



  const entry = dataSet?.counts?.map((item) => item)
  const categorias = categories?.map((item) => item.categoryName)
  // const ingresos = [4000, 6000, 3000, 4000, 5000]
  const midata = {
    labels: categorias,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label: 'Categorias',
        data: entry,
        tension: 0.5,
        fill: true,
        borderColor: '#002c9e',
        backgroundColor: '#081b7830',
        pointRadius: 5,
        pointBorderColor: '#002c9e',
        pointBackgroundColor: '#002c9e'
      }
    ]
  }

  const misoptions = {
    aspecRatio: 4,
    responsive: true,
    animation: true,
    scales: {
      y: {
        min: 0
      },
      x: {
        ticks: { color: 'rgb(11, 23, 156)' }
      }
    },

  }

  
  return (
    <div className="lineChart">
        <h1>Cantidad de Productos por Categoría</h1>
      <Line data={midata} options={misoptions} />
    </div>
  )
}

LineChart.propTypes = {
  dataSet: PropTypes.object,
};

LineChart.defaultProps = {
  dataSet: {}, // provide a default empty array
};
export default LineChart
