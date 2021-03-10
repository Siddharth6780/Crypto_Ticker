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
    var data = "https://min-api.cryptocompare.com/data/price?fsym=";
    var second_data = req.body.crypto + "&tsyms=" + req.body.fiat;
    var api_data=req.body.fiat;
    var request_api = data + second_data;

    if (req.body.crypto == undefined || req.body.fiat == undefined) {
        res.render('list', {
            error_passed: "error",
        });
    }
    else {
        request(request_api, function (error, response, body) {
            var fianl_data = JSON.parse(body);
            let price_2=req.body.fiat;
            var price = fianl_data[price_2];
            res.render('list', {
                Crypto_para: req.body.crypto,
                Currency_para: req.body.fiat,
                Display_value:price,
            });
        });
    }
});

app.listen(port, function () {
    console.log("Server is Running");
});