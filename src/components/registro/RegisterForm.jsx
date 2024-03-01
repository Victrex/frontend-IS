/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../generalComponents/Button";
import "../../assets/css/login.css";
import { registerUser, sendProfilePhoto } from "../../fetch/userAPI";
import { useActiveModalTerms } from "../../store/activeModalAuth";
import TermsAndConditions from "../TermsAndConditions";
import { getVillageByIdMunicipality } from "../../fetch/addresses";
import GetsForRegister from "./GetsForRegister";
// import { serialize } from "cookie";
//*
/* VALIDATIONS COMPONENT */
/* const ValidationInputs = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    profilePhoto: "",
    });
}
  const validateInput = (name, value) => {
    switch (name) {
      case "firstname":
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            firstname: "El primer nombre es requerido",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, firstname: "" }));
        }
        break;

      case "lastname":
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            lastname: "El apellido es requerido",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            lastname: "",
          }));
        }
        break;
      case "username":
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "El nombre de usuario es requerido",
          }));
        } else if (value.length < 4) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "El nombre de usuario debe tener al menos 4 caracteres",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "",
          }));
        }
        break;
      case "password":
        if (!value.trime()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Se requiere una contraseña",
          }));
        } else if (value.length < 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "La contraseña debe tener al menos 8 caracteres",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevError,
            email: "Se necesita un correo electronico",
          }));
        } else if (!emailPattern.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "El correo electronico ingresado no es valido",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;
      case "phone":
        const phonePattern = /^[0-9]{10}$/;
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrros,
            phone: "El numero de telefono es requerido",
          }));
        } else if (!phonePattern.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "El numero de telefono debe tener 8 digitos",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "",
          }));
        }
        break;
      case "profilePhoto":
        if (!value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            profilePhoto: "Se requiere una foto de perfil",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            profilePhoto: "",
          }));
        }
        break;
      default:
        console.error("Campo no reconocido:", name);
        break;
    }
  };

const validateInputs(name, value) {
  
}
sconst handleChange = (e) => {
  const { name, value } = e.target;
  validateInputs(name, value);
};
 */
/* SUBMIT FORM COMPONENT*/

/* FORM COMPONENT */
const RegisterForm = () => {
  /* DATA */
  const { activeModalTerms, setActiveModalTerms } = useActiveModalTerms();
  const [activeTerms, setActiveTerms] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [idUser, setIdUser] = useState("");

  const [departmentsList, setDepartmentsList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [municipalitiesFiltered, setMunicipalitiesListFiltered] = useState([]);
  const [villagesList, setVillagesList] = useState("");

  const [department, setDepartment] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [village, setVillage] = useState("");
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    profilePhoto: "",
    idAddress: 1,
    addressDescription: "",
    street: "",
    colonyName: "",
  });

  /* METHODS */
  const navigate = useNavigate();
  const $ = (selector) => document.querySelector(selector);
  const handleDataFetched = (data) => {
    setDepartmentsList(data.departments);
    setMunicipalitiesList(data.municipalities);
  };
  const $alert = $(".alertsContainer");
  const $success = $(".alertsContainer .alertSuccess");
  const $error = $(".alertsContainer .alertError");

  /* HANDLERS */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: validateInput(name, value) }); // Modificación propuesta
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir envío si hay errores
    /* if (Object.values(errors).some(Boolean)) {
      return;
    } */

    if (!isCheck) return;
    e.preventDefault();

    if (
      formData.firstname === "" ||
      formData.lastname === "" ||
      formData.username === "" ||
      formData.password === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.profilePhoto === "" ||
      department === "" ||
      municipality === "" ||
      village === "" ||
      formData.addressDescription === "" ||
      formData.street === "" ||
      formData.colonyName === ""
    ) {
      console.log(
        formData,
        department,
        municipality,
        village,
        formData.addressDescription,
        formData.street,
        formData.colonyName
      );
      $alert.classList.add("showAlerts");
      $success.style.display = "none";
      $error.style.display = "block";
      const $errorMessage = $(".errorMessage");
      $errorMessage.innerHTML = "¡No se permiten campos vacíos!";
      setTimeout(() => {
        $alert.classList.remove("showAlerts");
      }, 1000);
      return;
    }

    const payload = {
      registerRequest: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        profilePhoto: formData.profilePhoto,
      },
      address: {
        addressDescription: formData.addressDescription,
        street: formData.street,
        colonyName: formData.colonyName,
        idDepartment: parseInt(department),
        idMunicipality: parseInt(municipality),
        idVillage: parseInt(village),
      },
    };
    console.log(payload);
    try {
      await registerUser(payload).then((response) => {
        // sendProfilePhoto(payload);
        setIdUser(response.idUser);
        console.log(response.idUser ? "Trajo el id" : "No lo muestra");
        if (response.idUser) {
          $alert.classList.add("showAlerts");
          $success.style.display = "block";
          $error.style.display = "none";
          setTimeout(() => {
            $alert.classList.remove("showAlerts");
            navigate("../error503");
            // location.reload();
          }, 1500);
        } else {
          $alert.classList.add("showAlerts");
          const $errorMessage = $(".errorMessage");
          $errorMessage.innerHTML = "¡El usuario ya existe!";
          $success.style.display = "none";
          $error.style.display = "block";
          setTimeout(() => {
            $alert.classList.remove("showAlerts");
          }, 1000);
        }
      });
    } catch (error) {
      $alert.classList.add("showAlerts");
      $success.style.display = "none";
      $error.style.display = "block";
      const $errorMessage = $(".errorMessage");
      $errorMessage.innerHTML = "¡No se ha podido guardar los datos!";
      setTimeout(() => {

        $alert.classList.remove("showAlerts");
      }, 1000);
      console.error(error);
    }
    /*  
     //ESTO NOS AYUDARA EN EL FUTURO
     const serializedToken = serialize('auth', token.token, {
        httpOnly: false,
        // sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 5,
        path: '/',
        secure: false
      })
      const serializedUser = serialize('user', JSON.stringify(register), {
        httpOnly: false,
        // sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 5,
        path: '/',
        secure: false
      }) 
      document.cookie = serializedToken
      document.cookie = serializedUser
      */
  };

  const handleConfirmTerms = (e) => {
    if (e.target.checked) {
      setIsCheck(e.target.checked);
      console.log("Acepto los términos y condiciones");
    }
  };
  const handleSetIsCheck = (value) => {
    setIsCheck(value);
  };

  const handleActiveModalTerms = () => {
    setActiveModalTerms(true);
    setActiveTerms(true);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
    setMunicipality("");
    setVillage("");
  };

  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
    setVillage("");
  };

  const handleVillage = (e) => {
    setVillage(e.target.value);
  };
  /* UPLOAD FILE METHODS */
  const getFile = () => {
    document.getElementById("upfile").click();
  };
  const sub = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePhoto: file.name });
    setProfilePicture(file);
    const $uploadBtn = $(".uploadStatus");
    if (file) {
      $uploadBtn.classList.add = "successUpload";
      $uploadBtn.innerHTML = "Imagen Cargada Exitosamente!";
    }
    e.preventDefault();
  };

  /* WHATCHERS */

  useEffect(() => {
    const filterMunicipalities = () => {
      if (municipalitiesList) {
        const munFiltered = municipalitiesList.filter(
          (item) => item.idDepartment.idDepartment == department
        );
        setMunicipalitiesListFiltered(munFiltered);
        setMunicipality(municipality);
      }
    };

    filterMunicipalities();
  }, [department, municipalitiesList, municipality]);
  useEffect(() => {
    const villagesData = async () => {
      setMunicipality(municipality);
      if (municipality) {
        const villagesData = await getVillageByIdMunicipality(municipality);
        setVillagesList(villagesData);
      }
    };
    villagesData();
  }, [municipality]);

  useEffect(() => {
    setActiveTerms(activeModalTerms);
  }, [activeModalTerms]);

  useEffect(() => {
    const data = new FormData();
    data.append("profilePicture", profilePicture);
    const payload = {
      file: profilePicture,
      idUser: idUser,
    };
    console.log(payload);
    sendProfilePhoto(payload);
  }, [idUser, profilePicture]);
  return (
    <main className="login_main">
      <GetsForRegister onDataFetched={handleDataFetched} />
      <div className="login_side">
        <p></p>
      </div>
      <section className="form_section">
        <div className="picturePreview">
          {profilePicture && (
            <img src={URL.createObjectURL(profilePicture)} alt="Profile" />
          )}
        </div>
        <div className="login_title">
          <h1>Registrarse</h1>
          <span className="">Ingrese su Información Personal</span>
        </div>
        <form>
          <div id="uploadBtn" className="uploadStatus" onClick={getFile}>
            clic para subir archivo
          </div>
          <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
            <input
              id="upfile"
              type="file"
              onChange={sub}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          <div className="input_group">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="input_login"
            />
            <label className="login_label" htmlFor="user">
              {" "}
              Nombre de Usuario
            </label>
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="input_group">
            <input
              onChange={handleChange}
              type="text"
              name="firstname"
              className="input_login"
            />
            <label className="login_label" htmlFor="user">
              {" "}
              Primer Nombre
            </label>
            {errors.firstname && <p>{errors.firstname}</p>}
          </div>

          <div className="input_group">
            <input
              onChange={handleChange}
              type="text"
              name="lastname"
              className="input_login"
            />
            <label className="login_label" htmlFor="user">
              {" "}
              Primer Apellido
            </label>
            {errors.lastname && <p>{errors.lastname}</p>}
          </div>
          <div className="input_group">
            <input
              onChange={handleChange}
              type="text"
              name="phone"
              className="input_login"
            />
            <label className="login_label" htmlFor="user">
              {" "}
              Teléfono
            </label>
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <div className="input_group">
            <label htmlFor="Departamento" className="login_label_select">
              Departamento
            </label>
            <select
              type="text"
              placeholder="Departamento"
              className="input_login"
              value={department}
              onChange={handleDepartment}
            >
              <option value="">Seleccione un Departamento</option>

              {departmentsList
                ? departmentsList.map((dept, index) => {
                    return (
                      <option value={dept.idDepartment} key={index}>
                        {dept.departmentName}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>
          <div className="input_group">
            <label htmlFor="Municipio" className="login_label_select">
              Municipio
            </label>
            <select
              type="text"
              placeholder="Municipio"
              className="input_login"
              value={municipality}
              onChange={handleMunicipality}
            >
              <option value="">Seleccione un Municipio</option>
              {municipalitiesFiltered
                ? municipalitiesFiltered.map((mun, index) => (
                    <option value={mun.idMunicipality} key={index}>
                      {mun.municipalityName}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          <div className="input_group">
            <label htmlFor="Aldea" className="login_label_select">
              Aldea
            </label>
            <select
              type="text"
              placeholder="Aldea"
              className="input_login"
              value={village}
              onChange={handleVillage}
            >
              <option value="">Seleccione una Aldea</option>
              {villagesList
                ? villagesList.map((vill, index) => (
                    <option value={vill.idVillage} key={index}>
                      {vill.villageName}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          <div className="input_group">
            <label htmlFor="colony" className="login_label_select">
              colony
            </label>
            <input
              type="text"
              placeholder="Colonia"
              className="input_login"
              value={formData.colonyName}
              onChange={(e) =>
                setFormData({ ...formData, colonyName: e.target.value })
              }
            />
          </div>

          <div className="input_group">
            <label htmlFor="street" className="login_label_select">
              Calle
            </label>
            <input
              type="text"
              placeholder="Calle"
              className="input_login"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            />
          </div>
          <div className="input_group">
            <label htmlFor="addressDescription" className="login_label_select">
              Referencia
            </label>
            <input
              type="text"
              placeholder="Referencia"
              className="input_login"
              value={formData.addressDescription}
              onChange={(e) =>
                setFormData({ ...formData, addressDescription: e.target.value })
              }
            />
          </div>

          <div className="input_group">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="input_login"
            />
            <label className="login_label" htmlFor="email">
              {" "}
              Correo Electrónico
            </label>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="input_group">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="input_login"
            />
            <label className="login_label" htmlFor="password">
              {" "}
              Contraseña
            </label>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="terms">
            <label className="label" htmlFor="password">
              {" "}
              He leído y acepto los{" "}
              <span className="termsLink" onClick={handleActiveModalTerms}>
                términos y condiciones
              </span>
            </label>
            <input
              onChange={handleConfirmTerms}
              type="checkbox"
              name="confirmTerms"
              className="checkbox"
            />
          </div>
          <Button
            onClick={handleSubmit}
            innerText="Registrarse"
            width="300px"
            color="#fff"
            backgroundColor="#0F72BA"
          />
        </form>
      </section>
      <div className="alertsContainer">
        <div className="alertSuccess">
          <Alert
            severity="success"
            onClose={() => {
              const $ = (selector) => document.querySelector(selector);
              const $alert = $(".alertsContainer");
              $alert.classList.remove("showAlerts");
              navigate("../");
            }}
          >
            <AlertTitle>Registro Exitoso</AlertTitle>
            ¡Bienvenido!
          </Alert>
        </div>
        <div className="alertError">
          <Alert
            severity="error"
            onClose={() => {
              const $ = (selector) => document.querySelector(selector);
              const $alert = $(".alertsContainer");
              $alert.classList.remove("showAlerts");
            }}
          >
            <AlertTitle>Error al Registrarse</AlertTitle>
            <span className="errorMessage">¡Revise los campos que esten correctos!</span>
          </Alert>
        </div>
        <div className="backGround"></div>
      </div>
      {activeTerms ? (
        <TermsAndConditions handleSetIsCheck={handleSetIsCheck} />
      ) : null}
    </main>
  );
};

export default RegisterForm;
