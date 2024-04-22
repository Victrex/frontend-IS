import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../../fetch/admin";
import StatisticsCard from "./StatisticsCard";
import { useEffect } from "react";
import LineChart from "./LineChart";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import ProductsPeriod from "./ProductsPeriod";

const AdministrationDashboad = () => {
  const { data: stisticsData } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });

  // useEffect(() => {
  //   console.log(stisticsData);
  //   console.log(stisticsData?.reportedVendorsCount?.count);
  // }, [stisticsData]);

  return (
    <div className="dashboard">
      <div className="header">
        <StatisticsCard
          title="Vendedores"
          statistics={stisticsData?.vendorsCount?.count}
          unitDetail="Vendedores"
          primaryColor="#1e94d3"
          icon={<SensorOccupiedOutlinedIcon/>}
          />
        <StatisticsCard
          title="Denuncias"
          statistics={stisticsData?.reportedVendorsCount?.count}
          unitDetail="Personas"
          primaryColor="#d35a1edb"
          icon={<NoAccountsOutlinedIcon/>}
        />
        <StatisticsCard
          title="Productos Activos"
          statistics={stisticsData?.productCountsByStatus?.counts[0]}
          unitDetail="Productos"
          extraData={`${
            stisticsData?.productCountsByStatus?.counts[0] === 0
              ? 0
              : (stisticsData?.productCountsByStatus?.counts.reduce(
                  (a, b) => a + b,
                  0
                ) /
                  stisticsData?.productCountsByStatus?.counts[0]) *
                100
          }% de activos`}
          primaryColor="#1ed394"
          icon={<AddBusinessOutlinedIcon />}
        />
        {/* card para productos vendidos/cancelados */}
        <StatisticsCard
          title="Productos Vendidos/Cancelados"
          statistics={stisticsData?.productCountsByStatus?.counts[1]}
          extraData={`${
            stisticsData?.productCountsByStatus?.counts[1] === 0
              ? 0
              : (stisticsData?.productCountsByStatus?.counts.reduce(
                  (a, b) => a + b,
                  0
                ) /
                  stisticsData?.productCountsByStatus?.counts[1]) *
                100
          }% de activos`}
          unitDetail="Productos"
          primaryColor="#d31e57"
          icon={<InventoryOutlinedIcon />}
        />
      </div>
      <ProductsPeriod/>
      <div className="body">
        <LineChart dataSet={stisticsData?.productCountsByCategory} />
      </div>
    </div>
  );
};

export default AdministrationDashboad;
