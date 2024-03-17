/* eslint-disable react/prop-types */
export const Button = ({
  innerText = 'button',
  width = '300px',
  height = '35px',
  color = '#002c9e',
  backgroundColor = '#FFB300',
  fontSize = '1rem',
  onClick = null,
  icon = ''
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
      }}
    >
      {innerText} {icon}
    </button>
  )
}
