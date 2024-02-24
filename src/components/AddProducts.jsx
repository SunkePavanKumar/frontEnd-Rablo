import axios from "axios";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddProducts() {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const featuredRef = useRef(null);
  const ratingRef = useRef(null);
  const companyRef = useRef(null);
  const [error, setError] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const featured = featuredRef.current.checked;
    const rating = ratingRef.current.value;
    const company = companyRef.current.value;

    // Validate inputs
    if (!name || isNaN(price) || !company || !price || !rating) {
      setError(" Name, Price, Rating and Company are required.");
      return;
    }

    try {
      const endpoint = `${
        import.meta.env.VITE_BACKEND_URI
      }/products/addProducts`;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        endpoint,
        {
          name,
          price: parseFloat(price),
          featured,
          rating: rating ? parseFloat(rating) : undefined,
          company,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the form
      toast.success("Successfully Added the product");

      nameRef.current.value = "";
      priceRef.current.value = "";
      featuredRef.current.checked = false;
      ratingRef.current.value = "";
      companyRef.current.value = "";

      setError("");
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle add product failure
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">
              Rablo Product Form
            </h3>
          </a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleAddProduct}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  ref={nameRef}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="price"
                  ref={priceRef}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="featured"
                className="block text-sm font-medium text-gray-700"
              >
                Featured
              </label>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="featured"
                  ref={featuredRef}
                  className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="rating"
                  ref={ratingRef}
                  step="0.1"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="company"
                  ref={companyRef}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
