import ButtonCard from "./ButtonCard ";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const CardContainer = () => {
  const navigator = useNavigate();
  const handleLogin = () => {
    navigator("/login");
  };

  const handleSignUp = () => {
    navigator("/signup");
  };

  const handleAddProduct = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login to add product");
    }
    navigator("/addProducts");
  };

  const handleGetProducts = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login to getProducts");
    }
    navigator("/products");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-96">
        <div className="bg-gradient-to-br from-green-400 to-blue-500 p-5 rounded-t-lg">
          <h2 className="text-center text-white text-2xl font-bold">
            Choose an Action
          </h2>
        </div>
        <div className="p-5">
          <ButtonCard label="Login" onClick={handleLogin} />
          <ButtonCard label="SignUp" onClick={handleSignUp} />
          <ButtonCard label="Add Product" onClick={handleAddProduct} />
          <ButtonCard label="Get Products" onClick={handleGetProducts} />
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
