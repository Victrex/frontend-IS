import { useState } from 'react'
import RegistroForm from './RegistroForm';
import TermsAndConditions from '../TermsAndConditions';

const Terms = () => {
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
}

export default Terms