const express = require("express");
const cors = require("cors");

const app = express();
const approvalRoute = require("./routers/approval");
const requestRoute = require("./routers/approval");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("API running..."));

//custom route
app.use("/api/welfareApproval", approvalRoute);
app.use("/api/welfareRequest", requestRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
