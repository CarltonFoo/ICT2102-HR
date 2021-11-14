import API from "axios";
API.defaults.baseURL = "http://localhost:5000/api/";

//bridge between frontend and backend
export const removeWelfareRequest = (key) => {
  // const body = JSON.stringify({ key });
  //managed to get the key
  console.log("key", key);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.put("/welfareApproval", key, config);
};

export const updateMood = (key) => {
  console.log("key", key);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.put("/mood", key, config);
};