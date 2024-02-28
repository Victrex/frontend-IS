import React from 'react';

// Texto de los términos y condiciones
const terminosYCondiciones = `
Términos y Condiciones de Uso

Por favor, lee atentamente los siguientes términos y condiciones antes de utilizar nuestra plataforma de ventas por internet. Al registrarte en nuestra plataforma y utilizar nuestros servicios, aceptas estar sujeto a estos términos y condiciones.

Registro del Usuario:
Para utilizar nuestros servicios, debes registrarte en nuestra plataforma proporcionando información precisa y veraz, incluyendo tu nombre, apellidos, dirección de correo electrónico, dirección postal, y una contraseña segura. Te comprometes a mantener la confidencialidad de tu contraseña y a ser responsable de todas las actividades que ocurran en tu cuenta.

Uso Adecuado:
Te comprometes a utilizar nuestra plataforma de manera legal y adecuada, cumpliendo con todas las leyes y regulaciones aplicables. No debes utilizar nuestros servicios para actividades fraudulentas, ilegales o que violen los derechos de terceros.

Privacidad:
Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra política de privacidad. Al registrarte en nuestra plataforma, aceptas nuestra política de privacidad y el uso de tus datos personales de acuerdo con la misma.

Propiedad Intelectual:
Todos los derechos de propiedad intelectual relacionados con nuestra plataforma y sus contenidos son propiedad de nuestra empresa o de sus licenciantes. No se permite la reproducción, distribución o modificación de ningún contenido sin nuestro consentimiento previo por escrito.

Responsabilidad del Usuario:
Eres responsable de cualquier contenido que publiques en nuestra plataforma y de cualquier actividad realizada desde tu cuenta. No nos hacemos responsables de cualquier daño o pérdida resultante del uso de nuestra plataforma o de la información proporcionada por nuestros usuarios.

Modificaciones de los Términos y Condiciones:
Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestra plataforma. Es tu responsabilidad revisar periódicamente estos términos y condiciones para estar al tanto de cualquier cambio.

Al registrarte en nuestra plataforma, aceptas estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices nuestros servicios.

Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, no dudes en contactarnos.
`;

const TermsAndConditions = ({ onAceptarTerminos, onCancelarTerminos }) => {
  return (
    <div className="terms-and-conditions">
      <h2>Términos y Condiciones</h2>
      <p>{terminosYCondiciones}</p>
      <div className="buttons-container">
        <button onClick={onAceptarTerminos}>Aceptar</button>
        <button onClick={onCancelarTerminos}>Cancelar</button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
