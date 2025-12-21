import React from 'react'
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/107043-success.json";
import { Link } from "react-router-dom";
const OrderSuccessPage = () => {
    return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Success />
      </div>
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Success Animation */}
      <Lottie options={defaultOptions} width={250} height={250} />

      {/* Success Message */}
      <h5 className="mt-4 text-2xl font-semibold text-green-600">
        🎉 Your order was placed successfully ! 😍
      </h5>
      <p className="mt-2 text-gray-600">
        Thank you for shopping with us. We’ll notify you when your order is on
        the way.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/profile"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg shadow-md transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage