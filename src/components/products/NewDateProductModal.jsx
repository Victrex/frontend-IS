import { es } from "date-fns/locale";
import { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "../generalComponents/Button";
import { Context } from "./Products";
import { saveProduct } from "../../fetch/products";

const NewDateProductModal = () => {
  const [releaseDate, setReleaseDate] = useState(new Date());
  const { setNewDateProductModal, currentIdProduct, currentDataProduct } =
    useContext(Context);

  const handleAccept = () => {
    const date = new Date(releaseDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const relDate = `${year}-${month}-${day}T00:00:00.000Z`;
    console.log("confirm", releaseDate, currentIdProduct);
    console.log("currentDataProduct", currentDataProduct);
    let statusVal = 2; // 1 -> pendiente , 2 -> activo
    /* INITIALIZERS */
    if (releaseDate > new Date()) {
      // si la fecha es mayor queda en pendiente

      statusVal = 1;
    } else if (releaseDate <= new Date()) {
      // si la fecha es igual o menor queda en activo
      statusVal = 2;
    }

    const newData = {
      ...currentDataProduct,
      idCategory: currentDataProduct.idCategory.idCategory,
      idStatus: statusVal,
      idDepartment: currentDataProduct.idDepartment.idDepartment,
      idCondition: currentDataProduct.idCondition.idCondition,
      idUser: currentDataProduct.idUser.idUser,

      releaseDate: relDate,
    };

    saveProduct(newData).then((data) => {
      handleActiveModal();
      console.log(data);
      location.reload();
    });
    console.log("newData", newData);
  };

  const handleActiveModal = () => {
    setNewDateProductModal(false);
  };
  return (
    <div className="newDateModalContainer">
      <div className="bgNewDate" onClick={handleActiveModal}></div>
      <div className="newDateModalContent">
        <h3>Nueva Fecha de Publicación</h3>
        <div className="calendarNewDate">
          <DayPicker
            mode="single"
            selected={releaseDate}
            onSelect={setReleaseDate}
            locale={es}
            // fromMonth={new Date()}
            fromDate={new Date()}
            modifiersStyles={{
              selected: {
                backgroundColor: "#0F72BA",
                color: "white",
              },
            }}
          />
        </div>

        <div className="actionsNewDate">
          <Button
            width="130px"
            height="30px"
            fontSize="0.85rem"
            innerText="Confirmar"
            color="rgb(27, 158, 60)"
            backgroundColor="rgb(166, 247, 186)"
            onClick={handleAccept}
          />
          <Button
            width="130px"
            height="30px"
            fontSize="0.85rem"
            innerText="Cancelar"
            color="#952117"
            backgroundColor="#f7ada6"
            onClick={handleActiveModal}
          />
        </div>
      </div>
    </div>
  );
};

export default NewDateProductModal;
