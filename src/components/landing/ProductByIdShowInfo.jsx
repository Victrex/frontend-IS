

import PropTypes from 'prop-types';

const ProductByIdShowInfo = ({productData}) => {
    console.log(productData)
    return (
        <div>ProductByIdShowInfo</div>
    )
}

ProductByIdShowInfo.propTypes = {
    productData: PropTypes.object.isRequired
}

export default ProductByIdShowInfo