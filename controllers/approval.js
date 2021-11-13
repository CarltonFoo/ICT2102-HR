const { Console } = require("console");
const fs = require("fs");
const WelfareApproval = require("../frontend/src/data/approval.json");


exports.removeWelfareRequest = async (req, res) => {
  try {
    console.log("-----------------------------------U R IN CONTROLLER");
    // const data = await ;
    const data = await WelfareApproval;
    // console.log("controllerdata", data);

    // const parsedData = JSON.parse(data);
    // console.log("parsedJSON", parsedData);
    console.log("body", req.body);
    var reqBody = Object.values(req.body)
    console.log("body", typeof reqBody);
    // console.log("params", req.params);
    const updatedData = data.filter(
        (e) => (!reqBody.includes(e.key))
    );
    
    console.log("updated data", updatedData);

    fs.writeFile('../ICT2102-HR/frontend/src/data/approval.json', JSON.stringify(updatedData), function(err, result) {
      if(err) console.log('error', err);
    });

    res.status(200);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};