const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

app.use(
    session({
        secret: "ssshhhhh",
        resave: false,
        saveUninitialized: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const route = require("./routes/routing");

app.use("/", route.routes);

app.listen(port, () => {
    console.log(`3000 listening on port!`)
});