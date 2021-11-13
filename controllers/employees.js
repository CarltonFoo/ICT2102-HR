const { Console } = require("console");
const fs = require("fs");
const Employees = require("../frontend/src/data/employees.json");



exports.updateMood = async (req, res) => {
  try {
    const update = {
      mood: req.body.mood,
    };

    console.log("U R IN CONTROLLER");
    const data = await Employees;
    console.log(data);
    update.mood = data.mood;
    await 
    

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
