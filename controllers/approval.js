const { Console } = require("console");
const fs = require("fs");
// const WelfareApproval = require("../frontend/src/data/approval.json");

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

const WelfareApproval = {
  key: 0,
  sender: "Joey Chua",
  receiver: "Belle Sim",
  gifttype: "Morning Greetings",
};

exports.removeWelfareRequest = (req, res) => {
  try {
    console.log("U R IN CONTROLLER");
    // const data = await ;
    const data = WelfareApproval;
    console.log(data);

    const approvalJSON = JSON.parse(fs.readFileSync(data));
    console.log("approvalJSON", approvalJSON);
    console.log(req.body);
    console.log("params", req.params);
    // const parsedData = JSON.parse(fs.readFileSync(approvalJSON));
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
