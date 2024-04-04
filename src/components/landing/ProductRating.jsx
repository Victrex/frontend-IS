import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
const ProductRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // Si la calificación es mayor o igual a i, agrega una estrella completa
      stars.push(<StarIcon key={i} />);
    } else if (i - rating < 0.5 && i - rating > 0) {
      // Si la calificación es 0.5 menos que i, agrega media estrella
      stars.push(<StarHalfIcon key={i} />);
    } else {
      // Si la calificación es menor que i, agrega una estrella vacía
      stars.push(<StarOutlineIcon key={i} />);
    }
  }

  return (
    <div className="ratingProduct">
      {stars} <span>{parseFloat(rating).toFixed(1)}</span>
    </div>
  );
};

export default ProductRating;
