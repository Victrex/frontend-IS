/* eslint-disable react/prop-types */
export const Button = ({
  innerText = "button",
  width = "300px",
  height = "35px",
  color = "#002c9e",
  backgroundColor = "#FFB300",
  fontSize = "1rem",
  fontWeight = "400",
  onClick = null,
  icon = "",
  iconPosition = "right",
}) => {
  return (
    <button
      onClick={onClick}
      className="btnComponent"
      style={{
        width: width,
        height: height,
        color: color,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
    >
      {iconPosition === "left" ? (
        <span>
          {icon} {innerText}
        </span>
      ) : iconPosition === "right" ? (
        <span>
          {innerText}
          {icon}
        </span>
      ) : (
        ""
      )}
    </button>
  );
};
