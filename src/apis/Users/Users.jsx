import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    
    /* =====================
    GET ALL SOCIETIES
    ===================== */
 export const getAllUsers = () => {
  const url = `${BASE_URL}/users/all`;
  const token = localStorage.getItem("token"); // login ke baad store karna


  // Axios me token headers me bhejna hota hai
  const apiCall = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('apicall-->',apiCall)

  return apiCall;
};

/* =====================
   CREATE SOCIETY
===================== */
export const createSociety = (society) => {
  // return axios.post(`${BASE_URL}/create-society`, society, { headers: getAuthHeader() });
   const url = `${BASE_URL}/users//create`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  // Axios me token headers me bhejna hota hai
  const apiCall = axios.post(url,society, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};




//    UPDATE SOCIETY
// ===================== */
export const updateUserCan = (id, price) => {
  // return axios.put(`${BASE_URL}/update-society/${id}`, society, { headers: getAuthHeader() });
     const url = `${BASE_URL}/orders/set-price/${id}`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  console.log('price--->',price)
  // Axios me token headers me bhejna hota hai
  const apiCall = axios.put(url,price, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};





/* =====================
   UPDATE SOCIETY
===================== */
export const updateSociety = (id, society) => {
  // return axios.put(`${BASE_URL}/update-society/${id}`, society, { headers: getAuthHeader() });
     const url = `${BASE_URL}/users/${id}`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  // Axios me token headers me bhejna hota hai
  const apiCall = axios.put(url,society, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};

/* =====================
   DELETE SOCIETY
===================== */
export const deleteSociety = (id) => {
  // return axios.delete(`${BASE_URL}/delete-society/${id}`, { headers: getAuthHeader() });
   const url = `${BASE_URL}/users/${id}`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  // Axios me token headers me bhejna hota hai
  const apiCall = axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};
