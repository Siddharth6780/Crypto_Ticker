const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const port=process.env.PORT||3000;

app.set('view engine', 'ejs');

app.get("/", async (req, res, next) => {
    res.render('list');
});

app.post("/", async (req, res, next) => {
    var data = "https://min-api.cryptocompare.com/data/generateAvg?fsym=";
    var second_data = req.body.crypto + "&tsym=" + req.body.fiat + "&e=Kraken&api_key={c98fb3f5819e5640d9cb7ca0b218f8559e90b65e5c80a4cf2aa5ed6ba367c9da}";

    var request_api = data + second_data;
    if (req.body.crypto == undefined || req.body.fiat == undefined) {
        res.render('list', {
            error_passed: "error",
        });
    }
    else {
        request(request_api, function (error, response, body) {
            var fianl_data = JSON.parse(body);
            var price = fianl_data.DISPLAY.PRICE;
            res.render('list', {
                Crypto_para: req.body.crypto,
                Display_value: price,
                Currency_para: req.body.fiat,
            });
        });
    }
});

app.listen(port, function () {
    console.log("Server is Running");
});