const { Console } = require("console");
const fs = require("fs");
const WelfareApproval = require("../frontend/src/data/.json");
const InventoryData = require("../frontend/src/data/inventory.json");
const data = WelfareApproval;
const inventoryJSON = InventoryData;

exports.removeWelfareRequest = async (req, res) => {
  try {
    console.log("-----------------------------------U R IN CONTROLLER");
    console.log("FILE RUN START2 check:");
    const data = await WelfareApproval;
    const inventoryJSON = await InventoryData;

    // console.log("controllerdata", data);

    // const parsedData = JSON.parse(data);
    // console.log("parsedJSON", parsedData);

    // console.log("=====data====,",data);
    // console.log("=====enddata=====");
    var reqBody = Object.values(req.body);
    console.log("=====req.body====,");
    console.log("reqBody@controller", req.body);
    console.log("=====req.bodyend====,");
    // console.log("=====req.body.selectedKeys====,");
    // console.log("reqBody@controller", req.body.selectedKeys);
    // console.log("=====req.body.selectedKeysEnd====,");
    // console.log("body", typeof reqBody);

    // console.log("params", req.params);
    const updatedData = data.filter(
      (e) => !req.body.selectedKeys.includes(e.key)
    );
    var tempData = inventoryJSON;
    for (key in req.body) {
      if (key !== "selectedKeys") {
        console.log("INNER LOOP run");
        //iterate through inventoryJSON objs
        for (item in tempData) {
          // console.log("gift type "+key+ " count: "+req.body[key])
          if (tempData[item].name == key) {
            //updating stock count
            tempData[item].instock = tempData[item].instock - req.body[key];
          }
        }
      }
    }

    // console.log("updated data", updatedData);

    // DELETE WELFARE GIFT REQUEST @ Welfare approval HR
    fs.writeFile(
      "../ICT2102-HR/frontend/src/data/approval.json",
      JSON.stringify(updatedData),
      function (err, result) {
        console.log("writecomplete");
        console.log(req.body);
        if (err) console.log("error", err);
      }
    );
    // UPDATE WELFARE INVENTORY stock count
    fs.writeFile(
      "../ICT2102-HR/frontend/src/data/inventory.json",
      JSON.stringify(tempData),
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    console.log("FILE RUN END6");
    res.end();
    res.status(200);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
