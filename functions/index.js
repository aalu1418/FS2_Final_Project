const functions = require("firebase-functions");
const express = require("express");
const path = require("path");

var app = express();

try {
  app.get("/", (req, res) => {
    send_webpage(res, "index");
  });

  //https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js
  app.get("/:id", function(req, res) {
    const page_name =
      req.params.id == "chat" || req.params.id == "register"
        ? req.params.id
        : "404";
    console.log(page_name);
    send_webpage(res, page_name);
    // res.sendFile(req.params.id);
  });
} catch (e) {
  console.log("[express] "+e);
}



const send_webpage = (res, pagename) => {
  res.sendFile(path.join(__dirname, "public", pagename + ".html"));
};


exports.app = functions.https.onRequest(app);
