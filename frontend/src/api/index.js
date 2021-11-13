import API from "axios";
API.defaults.baseURL = "http://localhost:5000/api/";

export const removeWelfareRequest = (key) => {
  const body = JSON.stringify({ key });
  //managed to get the key
  console.log("body", body);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.delete("/welfareApproval", { body }, config);
};

