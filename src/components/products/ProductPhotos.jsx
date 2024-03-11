import { useState } from "react"
import "../../assets/css/productPhotos.css";


const ProductPhotos = () => {

const [photos, setPhotos] = useState([])
const [video, setVideo] = useState(null)

const sub = (e) => {
  


  const file = e.target.files[0];
  console.log('change');
  // setFormData({ ...formData, profilePhoto: file.name });
  setPhotos([...photos, file]);
  // const $uploadBtn = $(".uploadStatus");
  // if (file) {
  //   $uploadBtn.classList.add = "successUpload";
  //   $uploadBtn.innerHTML = "Imagen Cargada Exitosamente!";
  // }
  e.preventDefault();
};

const getFile = () => {
  document.getElementById("media").click();
};



  return (
    <>
      <div className="mediaContainer">
        {photos && photos.map( (photo, i) => {
          if (photo.type != "video/mp4")
          return (<div key={'photo' + i} className="picturePreview">
                <img  src={URL.createObjectURL(photo)} alt="Profile" />
            </div>)
          }
          
        )}
      </div>

        <div 
          id="uploadBtn" 
          className="uploadStatus" 
          onClick={getFile}
        >
              +
        </div>
        
        <input 
        type="file" 
        id="media" 
        onChange={sub} 
        accept=".jpg, .jpeg, .png, .mp4"
        style={{ height: "0px", width: "0px", overflow: "hidden" }}
        />

      
      

    </>
  )
  }
export default ProductPhotos
