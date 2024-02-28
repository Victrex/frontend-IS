/*import './assets/css/index.css'

function App() {

  return (
    <>
      <h1>PROYECTO INGENIERIA DE SOFTWARE</h1>
    </>
  )
}

export default App
*/

import React, { useState } from 'react';
import RegistroForm from './components/registro/RegistroForm';
import TermsAndConditions from './components/TermsAndConditions';
import './assets/css/styles.css';

const App = () => {
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  const [datosRegistro, setDatosRegistro] = useState(null);

  const handleDatosRegistro = (datos) => {
    setDatosRegistro(datos);
    setMostrarTerminos(true);
  };

  const handleAceptarTerminos = () => {
    console.log('Datos de registro:', datosRegistro);
    // Aquí puedes enviar los datos de registro al servidor
    setMostrarTerminos(false);
  };

  const handleCancelarTerminos = () => {
    setMostrarTerminos(false);
  };

  return (
    <div>
      {!mostrarTerminos && <RegistroForm onDatosRegistro={handleDatosRegistro} />}
      {mostrarTerminos && (
        <TermsAndConditions
          onAceptarTerminos={handleAceptarTerminos}
          onCancelarTerminos={handleCancelarTerminos}
        />
      )}
    </div>
  );
};

export default App;
