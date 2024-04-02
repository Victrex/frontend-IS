import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import env from "../../fetch/env";
import { getUser, login } from "../../fetch/login";
// import { serialize } from "cookie";
import { Button } from "../generalComponents/Button";
import { getProfilePhoto } from "../../fetch/userAPI";

const Login = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setIdUser = useAuthStore((state) => state.setIdUser);
  const [userName, setUserName] = useState("");
  const setProfilePhoto = useAuthStore((state) => state.setProfilePhoto);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const [passwordInput, setPasswordInput] = useState(null);
  const [userInput, setUserInput] = useState(null);

  const handleUser = (e) => {
    setUserInput(e.target.value);
  };
  const handlePassword = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleButton = async (e) => {
    e.preventDefault();
    const payload = {
      username: userInput,
      password: passwordInput,
    };
    /* Este es el token que devolveria el backend hay que agregar la logica del fetching, para que cuando  el usuario ingrese usuario y contrasenia
          el backend devolvera un token, la variable 'token' es el representante de ese resultado. es estatico, debe cambiarse cuando ya haya funcionalidad
        */
    const $ = (selector) => document.querySelector(selector);
    const $alert = $(".alertsContainer");
    const $success = $(".alertsContainer .alertSuccess");
    const $error = $(".alertsContainer .alertError");
    try {
      const token = await login(payload);

      env.HEADER = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      };

      const user = await getUser(token);

      // LOCAL STORAGE
      setIsAuth(true);
      setToken(token.token);
      setUser(user);
      setIdUser(user.idUser);

      // COOKIES
/*       const serializedToken = serialize("auth", token.token, {
        httpOnly: false,
        // sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 5,
        path: "/",
        secure: false,
      });
      setUserName(user.user);
      const serializedUser = serialize("user", JSON.stringify(user), {
        httpOnly: false,
        // sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 5,
        path: "/",
        secure: false,
      });
      document.cookie = serializedToken;
      document.cookie = serializedUser; */

      const profilePhoto = await getProfilePhoto(user.profilePhoto.idPhoto);
      setProfilePhoto(profilePhoto)


      //ALERTS
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

      // console.error('Error al ingreso de sesión ', error)
      setIsAuth(false);
    }

    /* UNa vez cargado el usuario  agregar la logica de pedir el usuario y cargarlos al estado*/
  };

  return (
    <main className="login_main">
      <div className="login_side"></div>
      <section className="form_section login">
      <div className="login_title">
          <h1>Iniciar Sesión</h1>
          <span className="">Ingrese sus credenciales</span>
        </div>
        <span className="">¿Aún no tienes cuenta? <Link to={'/register'}>Registrarse</Link></span>
        <form>
          <div className="input_group">
            <input
              onChange={handleUser}
              type="text"
              name="user"
              className="input_login"
              required
            />
            <label className="login_label" htmlFor="user">
              {" "}
              Usuario
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
            onClick={handleButton}
            innerText="Iniciar Sesión"
            width="300px"
            color="#fff"
            backgroundColor="#0F72BA"
          />
          <Link to="/">
          </Link>
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
            ¡Bienvenido {userName}!
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
  );
};

export default Login;
