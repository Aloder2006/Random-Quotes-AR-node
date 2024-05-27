const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(cors());

app.get("/api", function (req, res) {
    const json = fs.readFileSync("count.json", "utf-8");
    const obj = JSON.parse(json);
    obj.pageviews = obj.pageviews + 1;
    const newJSON = JSON.stringify(obj);
    fs.writeFileSync("count.json", newJSON);
    res.send(newJSON);
});

app.get("/visitors", function (req, res) {
    const json = fs.readFileSync("count.json", "utf-8");
    const obj = JSON.parse(json);

    res.send(obj);
});

app.get("/i4rqm", function (req, res) {
    res.redirect("https://www.instagram.com/i4rqm");
});

app.use(express.static(path.join(__dirname, "vc")));

app.use(function (req, res) {
    res.status(400);
    return res.send(`404 Error: Resource not found`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
