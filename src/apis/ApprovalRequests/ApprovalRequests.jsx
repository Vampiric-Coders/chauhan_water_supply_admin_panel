// import axios from "axios";

// // const BASE_URL = "http://localhost:8080/api/users";
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

    
//     /* =====================
//     GET ALL SOCIETIES
//     ===================== */
//  export const getAllUsers = () => {
//   const url = `${BASE_URL}/all`;
//   const token = localStorage.getItem("token"); // login ke baad store karna


//   // Axios me token headers me bhejna hota hai
//   const apiCall = axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log('apicall-->',apiCall)

//   return apiCall;
// };




import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/users/all`, {
    headers: getAuthHeader(),
  });
};

/* =========================
   APPROVE USER
========================= */
export const approveUser = (userId) => {
  return axios.put(
    `${BASE_URL}/admin/approve-user/${userId}`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
};


export const deleteUser = (userId) => {
  return axios.delete(
    `${BASE_URL}/users/${userId}`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
};




/* =========================
   GET ALL SOCIETIES
========================= */
export const getAllSocieties = () => {
  return axios.get(`${BASE_URL}/societies/all-societies`, {
    headers: getAuthHeader(),
  });
};


