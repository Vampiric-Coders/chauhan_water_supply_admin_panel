// src/api/subscriptions.api.js
import axios from "axios";
// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = import.meta.env.VITE_API_URL;

export const ResumeSubscription = (id) => {
  const url = `${BASE_URL}/subscription/${id}/resume`;
  const token = localStorage.getItem("token");

//   console.log("payload-->", );

  return axios.patch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  });
};



export const pauseSubscription = (id) => {
  const url = `${BASE_URL}/subscription/${id}/pause`;
  const token = localStorage.getItem("token");

//   console.log("payload-->", payload);

  return axios.patch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  });
};


export const updateSubscriptionDetails = (id, payload) => {
  console.log('id m ka h-->',id)
  const url = `${BASE_URL}/subscription/${id}`;
  const token = localStorage.getItem("token");

  console.log("payload-->", payload);

  return axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
  });
};




