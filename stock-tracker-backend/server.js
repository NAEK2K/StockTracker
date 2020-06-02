// express
const express = require("express");
const app = express();
const port = 8080;
// express config
app.use(express.urlencoded());
app.use(express.json());
// scrape
const got = require("got");
const cheerio = require("cheerio");
// cors
const cors = require("cors");
app.use(cors());
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
  console.log(req.body);
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
  console.log(req.body);
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
app.post("/getTickers", (req, res) => {
  let auth = req.body.auth;
  let userInfo = getDataFromAuth(auth);
  if (userInfo) {
    let tickers = db
      .get("users")
      .find({ username: userInfo.username })
      .get("tickers")
      .value();
    res.send({ tickers: tickers });
  } else {
    res.sendStatus(401);
  }
});
// scrape function
const scrape = async (ticker) => {
  try {
    let jsonRes = {};
    const response = await got(
      `https://web.tmxmoney.com/quote.php?qm_symbol=${ticker}`
    );
    const $ = cheerio.load(response.body);
    let price = $("span.price span").text();
    let change = $("strong.text-green")
      .text()
      .replace(/\s/g, "")
      .split("(")
      .map((x) => x.replace(")", "").replace("%", ""));
    if (change.length != 2)
      change = $("strong.text-red")
        .text()
        .replace(/\s/g, "")
        .split("(")
        .map((x) => x.replace(")", "").replace("%", ""));
    jsonRes.ticker = ticker;
    jsonRes.value = price;
    jsonRes.changeValue = change[0];
    jsonRes.changePercent = change[1];
    jsonRes.positiveChange = jsonRes.changeValue > 0;
    return jsonRes;
  } catch (e) {
    console.log(error.response.body);
  }
};
// scrape route
app.get('/ticker/:ticker', (req, res) => {
    scrape(req.params.ticker).then((results) => {
      res.send(results)
  })
})
// listen
app.listen(port, () => {
  console.log(`STOCK TRACKER BACKEND RUNNING ON PORT ${port}`);
});
function getDataFromAuth(auth) {
  return loggedIn.filter((x) => x.auth == auth)[0];
}
