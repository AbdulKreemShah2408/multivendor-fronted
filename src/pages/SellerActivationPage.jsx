import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { server } from "../server";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const navigate = useNavigate(); 

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await axios.post(`${server}/shop/activation`, {
          activation_token,
        });
    
        setStatus("success");
        setTimeout(() => {
          navigate("/shop-login");
        }, 2000);
      } catch (err) {
        console.error(
          "Activation failed:",
          err.response?.data?.message || err.message
        );
        setStatus("error");
      }
    };

    if (activation_token) {
      activateUser();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "500",
      }}
    >
      {status === "loading" && <p>Activating your account...</p>}
      {status === "success" && (
        <p>Your account has been activated successfully 🎉</p>
      )}
      {status === "error" && (
        <p>Your activation link is invalid or expired ❌</p>
      )}
    </div>
  );
}

export default SellerActivationPage;
