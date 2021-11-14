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
  // API.put('https://reqres.in/api/articles/1', article)
  //       .then(response => this.setState({ updatedAt: response.data.updatedAt }));
  // }
  return API.put("/welfareApproval", arr, config);
};


export const updateMood = (key) => {
  console.log("key", key);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.put("/employeeMood", key, config);
};

export const updateWelfareRequest = (key) => {
  console.log("key", key);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return API.put("/welfareRequest", key, config);
};



