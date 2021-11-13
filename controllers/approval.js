const { Console } = require("console");
const fs = require("fs");
const WelfareApproval = require("../frontend/src/data/approval.json");

// exports.removeRequest = async (req, res) => {
//   try {
//     console.log("hello");
//     //get json file
//     // console.log("req", req);
//     // console.log("data", WelfareApproval);

//     // const approvalRequest = JSON.parse(fs.readFileSync(data));
//     // console.log("approvalRequestData", approvalRequest);
//     const data = await WelfareApproval();
//     console.log(req.body);

//     res.json(data);
//     // res.status(200).json(data);
//     // const approvalRequestData = JSON.parse(fs.readFileSync(data));
//     // console.log("approvalRequestData", approvalRequestData);

//     //   console.log("show me what is this", data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// };

exports.removeWelfareRequest = async (req, res) => {
  try {
    console.log("U R IN CONTROLLER");
    // const data = await ;
    const data = await WelfareApproval;
    console.log(data);

    const parsedData = JSON.parse(data);
    console.log("parsedJSON", parsedData);
    console.log(req.body);
    console.log("params", req.params);
    const updatedData = approvalJSON.filter(
      (item) => (item.key = req.params.id)
    );
    console.log("updated data", updatedData);
    res.status(200).json(updatedData);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
