/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { Alert, AlertTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../generalComponents/Button";
import "../../assets/css/login.css";

const RegistroForm = ({ onDatosRegistro }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordInput, setPasswordInput] = useState(null);
  const [userInput, setUserInput] = useState(null);

  const handleUser = (e) => {
    setUserInput(e.target.value);
  };
  const handlePassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDatosRegistro(formData);
  };

  useEffect(() => {
    console.log("Datos de registro:", formData);
  }, [formData]);

  return (
    <div className="container">
      {/* <div className="form-container">
        <h2>Registro de Usuario</h2>
        <ProfilePictureUpload />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div> */}

      <main className="login_main">
        <div className="login_side">
          <p></p>
        </div>
        <section className="form_section">
          <h1>Registro de Usuarios</h1>
          <form>
            <div className="input_group">
              <input
                onChange={handleChange}
                type="text"
                name="firstName1"
                className="input_login"
                required
              />
              <label className="login_label" htmlFor="user">
                {" "}
                Primer Nombre
              </label>
            </div>
            <div className="input_group">
              <input
                onChange={handleChange}
                type="text"
                name="firstName2"
                className="input_login"
                required
              />
              <label className="login_label" htmlFor="user">
                {" "}
                Segundo Nombre
              </label>
            </div>
            <div className="input_group">
              <input
                onChange={handleChange}
                type="text"
                name="lastName1"
                className="input_login"
                required
              />
              <label className="login_label" htmlFor="user">
                {" "}
                Primer Apellido
              </label>
            </div>
            <div className="input_group">
              <input
                onChange={handleChange}
                type="text"
                name="lastName2"
                className="input_login"
                required
              />

              <label className="login_label" htmlFor="user">
                {" "}
                Segundo Apellido
              </label>
            </div>
            <div className="input_group">
              <input
                onChange={handleUser}
                type="text"
                name="userName"
                className="input_login"
                required
              />
              <label className="login_label" htmlFor="user">
                {" "}
                Nombre de Usuario
              </label>
            </div>
            <div className="input_group">
              <input
                onChange={handlePassword}
                type="password"
                name="password"
                className="input_login"
                required
              />
              <label className="login_label" htmlFor="password">
                {" "}
                Contraseña
              </label>
            </div>
              <Button
                onClick={handleSubmit}
                innerText="Registrarse"
                width="300px"
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
              <AlertTitle>Inicio de Sesión Exitoso</AlertTitle>
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
              <AlertTitle>Error al iniciar Sesión</AlertTitle>
              Datos Incorrectos!
            </Alert>
          </div>
          <div className="backGround"></div>
        </div>
      </main>
    </div>
  );
};

export default RegistroForm;
