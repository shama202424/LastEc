import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const { checkOut, cartID } = useContext(CartContext); 
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheckOut(values) {
    if (!cartID) {
      setApiError("Cart ID is missing. Please add items to the cart first.");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const url = "http://localhost:3000";
      const response = await checkOut(cartID, url, values);
      console.log("Checkout successful:", response.data);
    } catch (error) {
      console.error("Error during checkout:", error);
      setApiError(
        error.response?.data?.message || "An unexpected error occurred during checkout."
      );
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckOut,
  });

  return (
    <>
      <form className="max-w-sm mx-auto lg:pt-20" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Details</label>
          <input
            type="text"
            name="details"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
            placeholder="Details"
          />
          {formik.touched.details && formik.errors.details && (
            <div className="text-red-500">{formik.errors.details}</div>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
            placeholder="Phone"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500">{formik.errors.phone}</div>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
            placeholder="City"
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-red-500">{formik.errors.city}</div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
    </>
  );
}
