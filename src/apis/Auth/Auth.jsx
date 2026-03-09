import axios from "axios";

/* =====================
   LOGIN API
===================== */
export const loginApi = (email, password) => {
  return axios.post(
    // "http://localhost:8080/api/admin/login",
    `${import.meta.env.VITE_API_URL}/admin/login`,
    {
      email,
      password,
    }
  );
};

/* =====================
   SIGNUP API
===================== */
export const signupApi = (name,email, password,phoneNumber) => {
  return axios.post(
    // "http://localhost:8080/api/admin/signup",
        `${import.meta.env.VITE_API_URL}/admin/signup`,
    {
      name,
      email,
      password,
      phoneNumber
    }
  );
};
