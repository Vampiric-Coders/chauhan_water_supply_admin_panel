import axios from "axios";

const BASE_URL = "http://localhost:8080/api/societies";

    
    /* =====================
    GET ALL SOCIETIES
    ===================== */
 export const getAllSocieties = () => {
  const url = `${BASE_URL}/all-societies`;
  const token = localStorage.getItem("token"); // login ke baad store karna


  // Axios me token headers me bhejna hota hai
  const apiCall = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};

/* =====================
   CREATE SOCIETY
===================== */
export const createSociety = (society) => {
  // return axios.post(`${BASE_URL}/create-society`, society, { headers: getAuthHeader() });
   const url = `${BASE_URL}/create`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  // Axios me token headers me bhejna hota hai
  const apiCall = axios.post(url,society, {
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
     const url = `${BASE_URL}/${id}`;
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
   const url = `${BASE_URL}/${id}`;
  const token = localStorage.getItem("token"); // login ke baad store karna

  // Axios me token headers me bhejna hota hai
  const apiCall = axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiCall;
};
