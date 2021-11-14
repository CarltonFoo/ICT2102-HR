const { Console } = require("console");
const fs = require("fs");
const Employees = require("../frontend/src/data/employees.json");

exports.updateMood = async (req, res) => {
  try {
    console.log("U R IN EMPLOYEES CONTROLLER");
    const data = await Employees;
    console.log(data);
    console.log("body", req.body);
    var reqBody = Object.values(req.body)
    console.log("body", typeof reqBody);
    const updatedData = data.filter(
      (e) => (!reqBody.includes(e.key))
  );

    
  console.log("updated data", updatedData);

  fs.writeFile('../ICT2102-HR/frontend/src/data/employees.json', JSON.stringify(updatedData), function(err, result) {
    if(err) console.log('error', err);
  });

  res.status(200);
    return;
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
