import API from "axios";
API.defaults.baseURL = "http://localhost:5000/api/";

//bridge between frontend and backend
export const removeWelfareRequest = (arr) => {
  // const body = JSON.stringify({ key });
  //managed to get the key
  console.log("arr@RemoveWelfareRequest()", arr);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.put("/welfareApproval", arr, config);
};

// export const updateStock = (giftCountArr) => {
//   // const body = JSON.stringify({ key });
//   //managed to get the key
//   console.log("@giftCountArrupdateStock()",giftCountArr);
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   return API.put("/welfareApproval", giftCountArr, config);
// };
