// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { server } from '../server';

// function ActivationPage() {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (activation_token) {
//       const activationEmail = async () => {
//         try {
//           const res = await axios.post(`${server}/user/activation`, { activation_token });
//           console.log(res.data.message);
//         } catch (err) {
//           console.log(err.response?.data?.message || err.message);
//           setError(true);
//         } finally {
//           setLoading(false);
//         }
//       };
//       activationEmail();
//     }
//   }, [activation_token]);

//   return (
//     <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       {loading ? <p>Activating...</p> : (error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>)}
//     </div>
//   );
// }

// export default ActivationPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

function ActivationPage() {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await axios.post(`${server}/user/activation`, {
          activation_token,
        });
        console.log("Activation success:", res.data);
        setStatus("success");
      } catch (err) {
       
        setStatus("error");
      }
    };
   activateUser();
 
  }, [activation_token]);

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

export default ActivationPage;
