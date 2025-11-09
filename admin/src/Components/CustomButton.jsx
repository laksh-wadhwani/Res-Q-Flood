const CustomButton = ({ children, onClick, disabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center font-serif text-base md:text-lg capitalize rounded-xl p-2 transition-all duration-500 ease-in-out
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
            : "bg-[#0077B6] text-white cursor-pointer hover:bg-transparent hover:border hover:border-[#0077B6] hover:scale-105 hover:text-black hover:shadow-md"
        }
        ${className}`}
    >
      {children}
    </button> 
  );
};

export default CustomButton;