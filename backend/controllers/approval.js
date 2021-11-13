const WelfareApproval = require("../../frontend/src/data/approval.json");

exports.removeRequest = async (req, res) => {
  try {
    console.log("U R IN CONTROLLER");
    const data = await WelfareApproval;
    console.log("data", data);
    res.json(data);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
