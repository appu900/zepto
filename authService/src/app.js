const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/auth.routes.js")

const app = express();
const PORT = 7000;
app.use(express.json());
app.use("/api/auth",UserRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
