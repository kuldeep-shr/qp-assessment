import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { allRoutes } from "./routes/routes";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", allRoutes);
// start the server
app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT || 8080);
});

export default app;
