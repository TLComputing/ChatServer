import express from 'express';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.set("views", "public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.json());

export default app;
