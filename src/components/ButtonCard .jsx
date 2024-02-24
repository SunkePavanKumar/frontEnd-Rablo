const ButtonCard = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    >
      {label}
    </button>
  );
};

export default ButtonCard;
