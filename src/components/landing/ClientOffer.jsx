import React, { useState } from "react";
import { Button } from "../generalComponents/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import ClientOfferText from "./ClientOfferText";
import PropTypes from 'prop-types';

const ClientOffer = ({productData}) => {
    const [activeOfferText, setActiveOfferText] = useState(false);

  const handleClick = () => {
    console.log("Hacer una oferta");
    setActiveOfferText(!activeOfferText);
  };

  return (
    <div>
      <Button
        innerText="Hacer Una Oferta"
        backgroundColor="#0c5d97"
        color="#fff"
        fontSize="0.9rem"
        icon={<ReplyIcon />}
        iconPosition="left"
        onClick={handleClick}
      />
      {
            activeOfferText && <ClientOfferText productData={productData}/>
      }
    </div>
  );
};

ClientOffer.propTypes = {
    productData: PropTypes.object
}

ClientOffer.defaultProps = {
    productData: {}
}

export default ClientOffer;
