import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  getWishListProductByUser,
  updateProductToWishList,
  getWishListIdByUser,
  getComplaintsAll,
  getUsersAll
} from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdministrationUserCard from "./AdministrationUserCard";

const AdministrationUsers = () => {
  const [users, setUsers] = useState(null);
  const [usersBackup, setUsersBackup] = useState(null);
  const [user, setUser] = useState(null);
  const [activeUserModal, setActiveUserModal] = useState(false)
  const idUser = useAuthStore((state) => state.idUser);
  const queryClient = useQueryClient();

  const { data: usersData, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersAll(),
  });

  const filtrar = (e) => {
    if (!usersBackup) return
    setUsers( usersBackup.filter( item => (item.firstname + " " + item.lastname).toLowerCase().startsWith((e.target.value).toLowerCase())   ) )    
  }
  

  useEffect(() => {
    setUsers(!usersData?.message ? usersData : []);
    setUsersBackup(!usersData?.message ? usersData : []);
    console.log(usersData);
  }, [usersData]);

  return (
    <>
      <div className="content" > 
      <div className="productHeader" style={{marginTop: 0, marginBottom: '10px'}}>
        <div className="searchHeader">
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input
            type="text"
            name="search"
            className="search"
            placeholder="Buscar usuario"
            onChange={ filtrar }
          />
        </div>
      </div>
        <section
          className="productsByUserCardsContainer"
          style={{ justifyContent: "flex-start" }}
        >
          <h1>Usuarios</h1>
          {
          users
          ? users.length > 0
            ? users?.map((item) => (
              <AdministrationUserCard
                key={item.idUser}
                user={item}
                setUser={setUser}
                setActiveUserModal={ setActiveUserModal }
              />
            ))
            : (<p>No hay usuarios</p> )
          : (<p>No hay usuarios</p> )
          }
          
        </section>

        
      </div>

    </>
  )
}


export default AdministrationUsers;