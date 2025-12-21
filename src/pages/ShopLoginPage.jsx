import React from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const ShopLoginPage = () => {
    const { isSeller,seller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();
 useEffect(() => {
  if (isSeller===true) {
   navigate(`/dashboard`);
  }
 }, [isLoading,isSeller]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
