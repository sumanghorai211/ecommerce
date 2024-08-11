import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategoryAsync } from "../features/product/productSlice";
import { useAlert } from "react-alert";
function AddCategory() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [arr, setArr] = useState({ label: "", value: "" });

  function handler(e) {
    setArr({ ...arr, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createCategoryAsync(arr))
      .then((result) => {
        if (createCategoryAsync.fulfilled.match(result)) {
          alert.success("Category created successfully");
        } else {
          alert.error("Failed to create category");
          console.error("Failed to create category:", result.error.message);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name:
            </label>
            <input
              type="text"
              name="label"
              value={arr["label"]}
              onChange={handler}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Value:
            </label>
            <input
              type="text"
              name="value"
              value={arr["value"]}
              onChange={handler}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
