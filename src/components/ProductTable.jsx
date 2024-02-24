import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        const endpoint = `${
          import.meta.env.VITE_BACKEND_URI
        }/products/getProducts`;
        const token = localStorage.getItem("token");
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="border-b bg-gray-800 text-white">
          <tr>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              productID
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Name
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Price
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Featured
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Rating
            </th>
            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
              Company
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b bg-white">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.productID}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.price}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.featured ? "YES" : "NO"}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.rating}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.company}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
