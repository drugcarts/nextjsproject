const Button = ({ text, onClick, disabled }) => {
  return (
    <button className={`px-4 py-2 ${!disabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"} text-white rounded `} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
