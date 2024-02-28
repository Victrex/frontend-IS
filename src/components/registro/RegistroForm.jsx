import React, { useState } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload';

const RegistroForm = ({ onDatosRegistro }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDatosRegistro(formData);
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <ProfilePictureUpload />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default RegistroForm;