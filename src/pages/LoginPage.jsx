import React, { useEffect } from "react";
import Login from "../components/Login.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate=useNavigate();
     const { isAuthenticated } = useSelector((state) => state.user);
     useEffect(() => {
       if(isAuthenticated===true){
        navigate("/");
       }
     }, [isAuthenticated])
     
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
