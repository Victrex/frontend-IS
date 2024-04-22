import { useEffect, useState } from "react";
import {
  getWishListProductByUser,
  updateProductToWishList,
  getWishListIdByUser,
  getComplaintsAll
} from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdministrationComplaintCard from "./AdministrationComplaintCard";
import AdministrationComplaintModal from "./AdministrationComplaintModal";

const AdministrationComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [activeComplaintModal, setActiveComplaintModal] = useState(false)
  const idUser = useAuthStore((state) => state.idUser);
  const queryClient = useQueryClient();

  const { data: complaintsData, isError } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaintsAll(),
  });

  if (isError) {
    console.log("Error");
  }

  useEffect(() => {
    setComplaints(!complaintsData?.message ? complaintsData : []);
    console.log(complaintsData);
  }, [complaintsData]);

  return (
    <>
      <div className="content" > 
        <section
          className="productsByUserCardsContainer"
          style={{ justifyContent: "flex-start" }}
        >
          <h1>Denuncias</h1>
          {complaints &&
            complaints?.map((item) => (
              <AdministrationComplaintCard
                key={item.idComplaint}
                complaint={item}
                setComplaint={setComplaint}
                setActiveComplaintModal={ setActiveComplaintModal }
              />
            ))}
        </section>
      {activeComplaintModal && 
        <AdministrationComplaintModal 
        complaint={ complaint } 
        setActiveComplaintModal={ setActiveComplaintModal } />}
      </div>

    </>
  );
};

export default AdministrationComplaints;
