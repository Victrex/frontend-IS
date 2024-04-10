import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Button } from '../generalComponents/Button';
import { useCsvStore } from '../store/csv';

const UploadProductsByCSV = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const setIdUpt = useCsvStore((state) => state.setIdUpt);
    const setIsUpt = useCsvStore((state) => state.setIsUpt);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDelete = () => {
        setSelectedFile(null);
    };
    const handleUpload = () => {
        setIsUpt(true);
        // setIdUpt(selectedFile);
    }

    return (
        <div className="contentByCSV">
            <section className="productsByCSVContainer">
                <h1>Carga de Archivo</h1>
                
                    <div className="uploadFilesContainer">
                        <div
                            className="dragFileArea"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <h3 className="dynamicMessage">
                                Arrastra y suelta tu archivo CSV aquí
                            </h3>
                            o
                            <label className="label">
                                {" "}
                                <span className="browseFiles">
                                    {" "}
                                    <input
                                        type="file"
                                        accept=".csv"
                                        className="defaultFileInput"
                                        onChange={handleFileChange}
                                    />{" "}
                                    <span className="browseFilesText">Clic Aquí</span>{" "}
                                    <span>para buscar en el dispositivo</span>{" "}
                                </span>{" "}
                            </label>
                        </div>
                        {/* ------------ */}
                        {selectedFile && (
                            <div className="fileBlock">
                                <div className="fileInfo">
                                    <span className="fileName">{selectedFile.name}</span> |
                                    <span className="fileSize">{selectedFile.size} bytes</span>
                                </div>
                                <span className="removeFileIcon" onClick={handleDelete}>
                                    <DeleteIcon />
                                </span>
                            </div>
                        )}
                        {/* ---------- */}
                        <Button innerText="Cargar Archivo" onClick={handleUpload} />
                    </div>
                
            </section>
        </div>
    );
};

export default UploadProductsByCSV;