const { Console } = require("console");
const fs = require("fs");
const Employees = require("../frontend/src/data/employees.json");

exports.updateMood = async (req, res) => {
  try {
    console.log("----------------------------------- EMPLOYEES CONTROLLER");
    const data = await Employees;
    data[0][req.body[1]].mood = req.body[0]

    fs.writeFile('../ICT2102-HR/frontend/src/data/employees.json', JSON.stringify(data), function(err, result) {
      if(err) console.log('error', err);
    });

    res.status(200);
    return;
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
