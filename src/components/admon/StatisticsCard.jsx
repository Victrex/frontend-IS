
import PropTypes from 'prop-types';

const StatisticsCard = ({title, statistics, unitDetail = 'Unidades', icon, primaryColor = '#000', extraData = ''}) => {
    return (
        <div className="card">
            <h6>{title}</h6>
            <p>
                {statistics
                    ? statistics.toLocaleString('en-US')
                    : '0'}{' '}
                <span>{unitDetail}</span>
            </p>
            <div className="icon" style={{backgroundColor:primaryColor}}>
                {icon}
            </div>
            <div className="extraData" style={{color: primaryColor}}>
                {extraData && (
                    <p style={{color: primaryColor}}>
                        {extraData}
                    </p>
                )}
            </div>
        </div>
    )
}

StatisticsCard.propTypes = {
    title: PropTypes.string,
    statistics: PropTypes.number,
    unitDetail: PropTypes.string,
    icon: PropTypes.element,
    primaryColor: PropTypes.string,
    extraData: PropTypes.string
};

export default StatisticsCard
