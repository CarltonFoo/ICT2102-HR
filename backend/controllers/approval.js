const WelfareApproval = require("../../frontend/src/data/approval.json");

exports.removeRequest = async (req, res) => {
  try {
    const data = await WelfareApproval;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
