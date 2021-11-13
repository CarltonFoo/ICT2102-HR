const { Console } = require("console");
const fs = require("fs");
const WelfareApproval = require("../frontend/src/data/approval.json");


exports.removeWelfareRequest = async (req, res) => {
  try {
    console.log("U R IN CONTROLLER");
    // const data = await ;
    const data = await WelfareApproval;
    // console.log(data);

    // console.log("body", req.body);
    // const parsedData = JSON.parse(data);
    // console.log("parsedJSON", parsedData);

    // // const bodyKey = req.body[key];
    // for (var key in req.body) {
    //   if (req.body.hasOwnProperty(key)) {
    //     let value = req.body[key];
    //     console.log(`value for ${key} is ${value}`);

    //    for (const key in req.body) {
    //      data.filter((item) => item.key !== key);
    //    }
    //     console.log("filtered", filtered);
    //     // const updatedData = data.filter((item) => (item.key = value));
    //     // console.log("updated data", updatedData);
    //     // fs.writeFileSync(WelfareApproval, updatedData);
    //   }
    // }

    for (const key in req.body) {
      data.filter((item) => item.key == key);
      console.log(key);
    }

    console.log("filtered", data);

    res.status(200);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
