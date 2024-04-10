// Desc: Upload a CSV file to update products

import { Button } from "../generalComponents/Button";
import ProductPhotosFromCSV from "./ProductPhotosFromCSV";

const UploadSrcToProductsByCSV = () => {
  return (
    <div className="contentByCSV">
      <section className="productsByCSVContainer uploadPhotos">
        <h1>Carga de imagenes</h1>
        <section className="productItemsContent">
          <div className="itemUploadingContainer">
            <h3 className="titleItemUploading">Wine - Sogrape Mateus Rose</h3>
            <ProductPhotosFromCSV idProduct={"01"} />
          </div>
          <div className="itemUploadingContainer">
            <h3 className="titleItemUploading">Wine - Sogrape Mateus Rose</h3>
            <ProductPhotosFromCSV idProduct={"2"} />
          </div>
          
        </section>
        <div className="footerProductsByCSV">
          <Button innerText="Guardar"  width="120px"/>
          <Button innerText="Cancelar" width="120px"/>
        </div>
      </section>
    </div>
  );
};

export default UploadSrcToProductsByCSV;
