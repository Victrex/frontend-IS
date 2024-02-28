import React, { useState } from 'react';

const ProfilePictureUpload = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    // Aquí podrías enviar la imagen al backend o realizar alguna acción con ella
  };

  return (
    <div className="profile-picture-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {profilePicture && <img src={URL.createObjectURL(profilePicture)} alt="Profile" />}
    </div>
  );
};

export default ProfilePictureUpload;