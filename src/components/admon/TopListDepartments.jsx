import PropTypes from 'prop-types'
import { useState } from 'react'

const TopListDepartments = ({topList}) => {
    const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="tableBody" style={{ flex: 3 }}>
      <h3>Departamentos con más publicaciones</h3>
      <div className="inputGroups">
        <label htmlFor="search">Top 5 departamentos con mayor demanda</label>
      </div>
    <br />
      <div className='tableContainer'>

      <table className="table">
        <thead>
          <tr>
            <th>No. </th>
            <th>Departamento</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody className="movementsTBody">
          {topList?.length >= 1 ? (
            topList?.map((item, index) => (
              <tr key={index + 1} >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <strong>
                    {' '}
                    {parseFloat(item.count?.toFixed(2))?.toLocaleString('en-US')}
                  </strong>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay registros</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

TopListDepartments.propTypes = {
    topList: PropTypes.array
    }

export default TopListDepartments