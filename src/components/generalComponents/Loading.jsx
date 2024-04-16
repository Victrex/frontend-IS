import PropTypes from 'prop-types';
import '../../assets/css/loading.css';

const Loading = ({ classStyle }) => {
    return (
        <div className={classStyle}>
            <section className="ld_section">
                <div className="circle_loader"></div>
                <br />
                <h3>Cargando La subida de imagenes y videos...</h3>
            </section>
        </div>
    );
};

Loading.propTypes = {
    classStyle: PropTypes.string.isRequired,
};

export default Loading;
