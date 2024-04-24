
import PropTypes from 'prop-types'

const TopListCategoriesSuscribed = ({topList}) => {



  return (
    <div className="tableBody" style={{ flex: 3 }}>
      <h3>Categorías con mayor suscripciones</h3>
      <div className="inputGroups">
        <label htmlFor="search"> <br /></label>
      </div>
    <br />
      <div className='tableContainer'>

      <table className="table">
        <thead>
          <tr>
            <th>No. </th>
            <th>Categoria</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody className="movementsTBody">
          {topList?.length >= 1 ? (
            topList?.map((item, index) => (
              <tr key={index + 1} >
                <td>{index}</td>
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

TopListCategoriesSuscribed.propTypes = {
    topList: PropTypes.array
    }

export default TopListCategoriesSuscribed