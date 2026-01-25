import axios from "axios";

/* =====================
   LOGIN API
===================== */
export const loginApi = (email, password) => {
  return axios.post(
    "http://localhost:8080/api/admin/login",
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
    "http://localhost:8080/api/admin/signup",
    {
      name,
      email,
      password,
      phoneNumber
    }
  );
};
