import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllDepartments, getAllMunicipalities } from "../../fetch/addresses";

/* GETS COMPONENTE */
const GetsForRegister = ({ onDataFetched }) => {
    /* CHARGIN DATA */
  
    /* METHODS */
    const queryClient = useQueryClient();
  
    /* QUERY CATCHERS */
    const { data: departmentsData } = useQuery({
      queryKey: ["departments"],
      queryFn: getAllDepartments,
    });
  
    const { data: municipalitiesData } = useQuery({
      queryKey: ["municipalities"],
      queryFn: getAllMunicipalities,
    });
  
    useEffect(() => {
      if (!departmentsData) {
        queryClient.invalidateQueries("departments");
      }
      if (!municipalitiesData) {
        queryClient.invalidateQueries("municipalities");
      }
    }, [departmentsData, municipalitiesData, queryClient]);
  
    useEffect(() => {
        if (departmentsData && municipalitiesData) {
            const departments = departmentsData;
            const municipalities = municipalitiesData;
            onDataFetched({ departments, municipalities });
        }
    }, [departmentsData, municipalitiesData, onDataFetched]);
    return;
  };

  export default GetsForRegister;