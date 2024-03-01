import { useNavigate } from 'react-router-dom'

const Oops = ({title}) => {
    const navigate = useNavigate()

  return (
    <div className="error-container">
      <h1>503</h1>
      <p>Oops! Página de {title} no disponible.</p>
      <span
        href="#"
        onClick={() => {
          navigate('/')
        }}
      >
        Regreso al inicio
      </span>
    </div>
  )
}

export default Oops
