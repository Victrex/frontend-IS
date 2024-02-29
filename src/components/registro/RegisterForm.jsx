/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../generalComponents/Button";
import "../../assets/css/login.css";
import { registerUser } from "../../fetch/userAPI";
import { useActiveModalTerms } from "../../store/activeModalAuth";
import TermsAndConditions from "../TermsAndConditions";
import { validateEmail } from 'email-validator';
// import { serialize } from "cookie";

// Definir patrones de validación y mensajes de error
const validationPatterns = {
  username: /^[a-zA-Z0-9_]+$/, // Ajustar según sea necesario
  firstname: /^[a-zA-Z]+$/,
  lastname: /^[a-zA-Z]+$/,
  phone: /^[0-9]{10}$/, // Ajustar para un formato específico de número de teléfono
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Ejemplo para complejidad de contraseña
};

const errorMessages = {
  username: "El nombre de usuario solo debe contener letras, números y guiones bajos.",
  firstname: "El primer nombre solo debe contener letras.",
  lastname: "El apellido solo debe contener letras.",
  phone: "El número de teléfono debe tener 10 dígitos.",
  email: "Formato de correo electrónico inválido.",
  password: "La contraseña debe tener al menos 8 caracteres, contener al menos una letra minúscula, una letra mayúscula y un número.",
};

// Función de validación
const validateInput = (name, value) => {
  const pattern = validationPatterns[name];
  const errorMessage = errorMessages[name];

  if (!pattern.test(value)) {
    return errorMessage;
  }

  if (name === "email" && !validateEmail(value)) {
    return "Formato de correo electrónico inválido.";
  }

  return null;
};


const RegisterForm = () => {
  /* DATA */
  const { activeModalTerms, setActiveModalTerms } = useActiveModalTerms();
  const [activeTerms, setActiveTerms] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    profilePhoto: "",
    idAddress: 1,
  });

  /* METHODS */
  const navigate = useNavigate();
  const $ = (selector) => document.querySelector(selector);

  /* HANDLERS */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateInput(name, value) }); // Modificación propuesta
  };

  const handleSubmit = async (e) => {
    if (Object.values(errors).some(Boolean)) {
      e.preventDefault(); // Prevenir envío si hay errores
      return;
    }
    if (!isCheck) return;
    e.preventDefault();


    const $alert = $(".alertsContainer");
    const $success = $(".alertsContainer .alertSuccess");
    const $error = $(".alertsContainer .alertError");
    try {
      const response = await registerUser(formData);
      console.log("entro", response);
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
      $alert.classList.add("showAlerts");
      $success.style.display = "block";
      $error.style.display = "none";
      setTimeout(() => {
        $alert.classList.remove("showAlerts");
        navigate("/");
        location.reload();
      }, 1500);
    } catch (error) {
      $alert.classList.add("showAlerts");
      $success.style.display = "none";
      $error.style.display = "block";
      setTimeout(() => {
        $alert.classList.remove("showAlerts");
      }, 1000);

      // console.error('Error al registrarse ', error)
    }
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
    setActiveTerms(activeModalTerms);
  }, [activeModalTerms]);
  return (
    <main className="login_main">
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
            {errors.username && <span className="error">{errors.username}</span>}
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
            {errors.firstname && <span className="error">{errors.firstname}</span>}
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
            {errors.lastname && <span className="error">{errors.lastname}</span>} 
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
            {errors.phone && <span className="error">{errors.phone}</span>}
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
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && <span className="error">{errors.password}</span>}
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
            Datos Incorrectos!
          </Alert>
        </div>
        <div className="backGround"></div>
      </div>
      {
        activeTerms ? (
          <TermsAndConditions handleSetIsCheck={handleSetIsCheck}/>
        ) : null
      }
    </main>
  );
};

export default RegisterForm;
