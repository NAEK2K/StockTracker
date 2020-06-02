// express
const express = require("express");
const app = express();
const port = 8080;
// express config
app.use(express.urlencoded());
app.use(express.json());
// file system
const path = require("path");
const fs = require("fs");
// uuidv4
const { uuid } = require("uuidv4");
// lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// lowdb init
db.defaults({ users: [] }).write();
// login tracker
let loggedIn = [];
// register route
app.post("/register", (req, res) => {
  let users = db.get("users").value();
  let username = req.body.username;
  let password = req.body.password;
  if (users.map((x) => (x = x.username)).includes(username)) {
    res.sendStatus(401);
    return;
  } else {
    db.get("users")
      .push({
        username: username,
        password: password,
        tickers: [],
      })
      .write();
    console.log(`USERNAME: ${username}\nPASSWORD: ${password}\n(REGISTERED)`);
    res.sendStatus(200);
    return;
  }
});
// login route
app.post("/login", (req, res) => {
  let user = db.get("users").find({ username: req.body.username }).value();
  if (!user) {
    res.sendStatus(401);
    return;
  } else if (user.password == req.body.password) {
    let auth = uuid();
    loggedIn.push({ username: req.body.username, auth: auth });
    res.send({ auth: auth });
  }
});
// add ticker route
app.post("/addTicker", (req, res) => {
  let ticker = req.body.ticker;
  let auth = req.body.auth;
  let userInfo = getDataFromAuth(auth);
  if (userInfo) {
    // find if auth exists
    let tickers = db
      .get("users")
      .find({ username: userInfo.username })
      .get("tickers")
      .value();
    if (tickers.includes(ticker)) {
      res.sendStatus(401);
      return;
    } else {
      db.get("users")
        .find({ username: userInfo.username })
        .get("tickers")
        .push(ticker)
        .write();
      res.sendStatus(200);
      return;
    }
  } else {
    res.sendStatus(401);
    return;
  }
});
// remove ticker route
app.post("/removeTicker", (req, res) => {
  let ticker = req.body.ticker;
  let auth = req.body.auth;
  let userInfo = getDataFromAuth(auth);
  if (userInfo) {
    // find if auth exists
    let tickers = db
      .get("users")
      .find({ username: userInfo.username })
      .get("tickers")
      .value();
    let index = tickers.indexOf(ticker);
    if (index >= 0) {
      tickers.splice(index, 1);
      db.get("users")
        .find({ username: userInfo.username })
        .assign({ tickers: tickers })
        .write();
      res.sendStatus(200);
      return;
    } else {
      res.sendStatus(401);
      return;
    }
  } else {
    res.sendStatus(401);
    return;
  }
});
// listen
app.listen(port, () => {
  console.log(`STOCK TRACKER BACKEND RUNNING ON PORT ${port}`);
});
function getDataFromAuth(auth) {
  return loggedIn.filter((x) => x.auth == auth)[0];
}
