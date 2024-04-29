import { List } from "@mui/material";
import PropTypes from "prop-types";
import ReportedElement from "./ReportedElement";
import React, { useEffect } from "react";

const ReportedVendors = ({ topsList, data }) => {


  return (
    <div className="tableBody" style={{ flex: 3 }}>
      <h3>Top 5 Más demandados</h3>
      <div className="inputGroups">
        <label htmlFor="search">Demandas con estado pendiente</label>
      </div>
      <div className="tableContainer">
        <br />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                data?.length >= 1 ? (
                    data?.map((item, index) => (
                        <React.Fragment key={index}>
                            <hr />
                            <ReportedElement item={item} index={index} />
                            <hr />
                        </React.Fragment>

                    ))
                ) : (
                    <li>
                        <strong>
                            {' '}
                            No hay registros
                        </strong>
                    </li>
                )
            
            }
        </List>
      </div>
    </div>
  );
};

ReportedVendors.propTypes = {
  topsList: PropTypes.array,
    data: PropTypes.array,
};

export default ReportedVendors;
