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
import ValidationsRegExp from "../generalComponents/ValidationsRegExp";
// import { serialize } from "cookie";
//*
/* VALIDATIONS COMPONENT */
/* SUBMIT FORM COMPONENT*/

/* FORM COMPONENT */
const RegisterForm = () => {
  /* DATA */
  const { activeModalTerms, setActiveModalTerms } = useActiveModalTerms();
  const [activeTerms, setActiveTerms] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [repetNewPassword, setRepetNewPassword] = useState("");

  const [departmentsList, setDepartmentsList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [municipalitiesFiltered, setMunicipalitiesListFiltered] = useState([]);
  const [villagesList, setVillagesList] = useState("");

  const [department, setDepartment] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [village, setVillage] = useState("");
  const [errors, setErrors] = useState("");
  const [authPassword, setAuthPassword] = useState(false); //si la contraseña coincide
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
    //setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: validateInput(name, value) }); // Modificación propuesta
    const isValid = ValidationsRegExp(value, name);

    if (isValid) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else {
      setErrors({
        ...errors,
        [name]: `El valor ingresado no es válido.`,
      });
    }
  };

  const handleRepetNewPassword = (e) => {
    setRepetNewPassword(e.target.value);

    const $errorPassword = $(".errorPassword");
    if (e.target.value !== formData.password) {
      $errorPassword.classList.add("activeError");
      setAuthPassword(false);
    } else {
      $errorPassword.classList.remove("activeError");
      setAuthPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir envío si hay errores
    /* if (Object.values(errors).some(Boolean)) {
      return;
    } */
    if (authPassword === false) {
      const $alert = $(".alertsContainer");
      const $error = $(".alertsContainer .alertError");
      $alert.classList.add("showAlerts");

      $error.style.display = "block";
      setTimeout(() => {
        $alert.classList.remove("showAlerts");
        return;
      }, 2000);
      return;
    }
    if (!isCheck) return;
    e.preventDefault();

    /*     if (
      Object.values(formData).some((value) => value === "") ||
      Object.values(errors).some((value) => value !== "")
    ) {
      $alert.classList.add("showAlerts");
      $success.style.display = "none";
      $error.style.display = "block";
      const $errorMessage = $(".errorMessage");
      $errorMessage.innerHTML =
        "¡No se permiten campos vacíos o hay errores en el formulario!";
      setTimeout(() => {
        $alert.classList.remove("showAlerts");
      }, 1000);
      return;
    } */

    if (
      formData.firstname === "" ||
      formData.lastname === "" ||
      formData.username === "" ||
      formData.password === "" ||
      repetNewPassword === "" ||
      formData.email === "" ||
      formData.phone === "" ||
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
            navigate("../login");
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
    if (profilePicture === null || idUser === "") return;
    const data = new FormData();
    data.append("profilePicture", profilePicture);
    const payload = {
      file: profilePicture,
      idUser: idUser,
    };
    sendProfilePhoto(payload);
  }, [idUser, profilePicture]);
  return (
    <main className="login_main">
      <GetsForRegister onDataFetched={handleDataFetched} />
      <div className="login_side">
        <p></p>
      </div>
      <section className="form_section">
        <div className="picturePreview login">
          {profilePicture && (
            <img src={URL.createObjectURL(profilePicture)} alt="Profile" />
          )}
        </div>
        <div className="login_title">
          <h1>Registrarse</h1>
          <span className="">Ingrese su Información Personal</span>
        </div>
        <form className="login">
          <div id="uploadBtn" className="uploadStatus login" onClick={getFile}>
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
            <label className="login_label login" htmlFor="user">
              {" "}
              Nombre de Usuario
            </label>
            <div></div>
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
            <label className="login_label login" htmlFor="user">
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
            <label className="login_label login" htmlFor="user">
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
            <label className="login_label login" htmlFor="user">
              {" "}
              Teléfono
            </label>
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <div className="input_group">
            <label htmlFor="Departamento" className="login_label_select login">
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
            <label htmlFor="Municipio" className="login_label_select login">
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
            <label htmlFor="Aldea" className="login_label_select login">
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
            <label htmlFor="colony" className="login_label_select login">
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
            {errors.colonyName && <p>{errors.colonyName}</p>}
          </div>

          <div className="input_group">
            <label htmlFor="street" className="login_label_select login">
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
            {errors.street && <p>{errors.street}</p>}
          </div>
          <div className="input_group">
            <label
              htmlFor="addressDescription"
              className="login_label_select login"
            >
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
            {errors.addressDescription && <p>{errors.addressDescription}</p>}
          </div>

          <div className="input_group">
            <label className="login_label_select login" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="input_login"
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="input_group">
            <label className="login_label_select login" htmlFor="password">
              Contraseña
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="input_login"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="input_group">
            <label className="login_label_select login" htmlFor="password">
              Repetir Contraseña
            </label>
            <input
              onChange={handleRepetNewPassword}
              type="password"
              id="repeatPassword"
              name="password"
              className="input_login"
            />
            <span className="errorPassword">Contraseña no coincide</span>
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
            <span className="errorMessage">
              ¡Revise los campos que esten correctos!
            </span>
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
