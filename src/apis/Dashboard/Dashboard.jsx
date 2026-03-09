// // src/api/orders.api.js
// import axios from "axios";

// // const BASE_URL = "http://localhost:8080/api";
// const BASE_URL =     import.meta.env.VITE_API_URL

// /* =====================
//    GET ALL ORDERS
// ===================== */
// export const fetchAllOrders = () => {
//   const url = `${BASE_URL}/orders/all-orders`;
//   const token = localStorage.getItem("token");

//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };


// src/api/societies.api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/* =====================
   GET ALL SOCIETIES
===================== */
export const fetchAllSocieties = () => {
  const url = `${BASE_URL}/societies/all-societies`;
  const token = localStorage.getItem("token");

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};