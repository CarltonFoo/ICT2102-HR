const WelfareApproval = require("../../frontend/src/data/approval.json");

exports.removeRequest = async (req, res) => {
          console.log("U R IN CONTROLLER");

          try {
            console.log("U R IN CONTROLLER");

            const data = await WelfareApproval;
            res.json(data);
            console.log("WHAT IS THIS", res.json(data));
          } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
          }
};
