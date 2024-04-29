import { useEffect, useState } from "react";
import { getComplaintsAll } from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdministrationComplaintCard from "./AdministrationComplaintCard";
import AdministrationComplaintModal from "./AdministrationComplaintModal";
import { Card, CardHeader, Skeleton } from "@mui/material";

const AdministrationComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [activeComplaintModal, setActiveComplaintModal] = useState(false);
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
      <div className="content">
        <section
          className="productsByUserCardsContainer"
          style={{ justifyContent: "flex-start" }}
        >
          <h1>Denuncias</h1>
          {complaints?.length ? (
            complaints?.map((item) => (
              <AdministrationComplaintCard
                key={item.idComplaint}
                complaint={item}
                setComplaint={setComplaint}
                setActiveComplaintModal={setActiveComplaintModal}
              />
            ))
          ) : (
            <>
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: "100%",
                    m: 1,
                    width: "90%",
                    boxShadow:
                      "0px 2px 1px -1px rgba(0, 0, 0, 0.116),0px 1px 1px 0px rgba(0, 0, 0, 0.075),0px 1px 3px 0px rgba(0, 0, 0, 0.068)",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    }
                    title={<Skeleton animation="wave" height={10} width="80%" />}
                    subheader={<Skeleton animation="wave" height={10} width="40%" />}
                  />
                </Card>
              ))}
            </>
          )}
        </section>

        {activeComplaintModal && (
          <AdministrationComplaintModal
            complaint={complaint}
            setActiveComplaintModal={setActiveComplaintModal}
          />
        )}
      </div>
    </>
  );
};

export default AdministrationComplaints;
