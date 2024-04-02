/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useActiveModalTerms } from "../store/activeModalAuth";
import { getTerms } from "../fetch/login";

// Texto de los términos y condiciones




const TermsAndConditions = ({ handleSetIsCheck }) => {
  const { setActiveModalTerms } = useActiveModalTerms();
  const handleAcceptTerms = () => {
    handleSetIsCheck(true);
    setActiveModalTerms(false);
  };

  const { data: termsAndConditionsText = Infinity } = useQuery({
    queryKey: ["termsAndConditionsText"],
    queryFn: () => getTerms(),
  });

  return (
    <div className="container">
      <div className="content">
        <div className="termsAndConditions">
          <h2>Términos y Condiciones</h2>
          <p>{termsAndConditionsText?.termDescription}</p>
          <div className="buttons-container">
            <button onClick={handleAcceptTerms}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
