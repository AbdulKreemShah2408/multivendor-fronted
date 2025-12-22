export const server = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/v2`
  : "http://localhost:8000/api/v2";


export const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/";
