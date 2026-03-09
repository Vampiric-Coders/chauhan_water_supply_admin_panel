import axios from "axios";
// const BASE_URL = "http://localhost:8080/api/societies";
const BASE_URL = `${import.meta.env.VITE_API_URL}/societies`;

export const getAllUserHistory = async () => {
  const url = `${BASE_URL}/all-societies`;
  const token = localStorage.getItem("token");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apiSocieties = response.data.societies;

  return apiSocieties.map((society) => ({
    name: society.societyName,

    users: society.users.map((user) => ({
      id: user._id,
      name: user.name,
      phone: user.phoneNumber,
      flat: user.addressFlatNo,

      // ❌ type yahan nahi

      history: user.orders.map((order) => ({
        orderId: order._id,
        date: new Date(order.date).toISOString().split("T")[0],
        time: new Date(order.createdAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cans: order.cansPerDay,
        amount: order.cansPerDay * 120,
        status: order.orderStatus,
        payment: order.orderPayment,

        // ✅ SINGLE SOURCE OF TRUTH
        type: order.orderType, // "daily" | "subscription"
      })),
    })),
  }));
};
