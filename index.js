import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var ArrayOfTasksLabel = [];
var workTasks = [];
var checkedArray = [];
var mode = "today";

function keepChecked() {
  // Your keepChecked function here (assuming it's used elsewhere)

}

app.get("/", (req, res) => {
  if (mode === "today") {
    res.render("index.ejs", { tasks: ArrayOfTasksLabel, mode: mode });
  } else {
    res.render("index.ejs", { tasks: workTasks, mode: mode });
  }
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  var task = req.body["task"];
  if (mode !== "work") {
    ArrayOfTasksLabel.push(task);
  } else {
    workTasks.push(task);
  }
  return res.redirect("/");
});

app.get("/work", (req, res) => {
  mode = "work";
  return res.redirect("/");
});

app.get("/today", (req, res) => {
  mode = "today";
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
