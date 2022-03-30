// ------eightBillions
//      -server side app
//


// this was the firts counter: https://www.worldometers.info/world-population/
// but we use this https://www.theworldcounts.com/challenges/planet-earth/state-of-the-planet/world-population-clock-live/story
// in this shape: https://www.theworldcounts.com/embed/challenges/8 
// based on: https://github.com/nielsenjared/in-g



// invoke the modules
var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var path = require("path");

// create an app that listens on 9104
var app = express();
var PORT = process.env.PORT || 9104;

// uses some ¿ dir ?
app.use(express.static('public'));

// serve home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// a dir to get sync
app.get("/sync", function(req, res) {
    //var username = req.params.username;
    var url = "https://www.theworldcounts.com/embed/challenges/8";
    // the request routine
    request(url, function(error, response, html) {
        var data = "";
        // var $ = cheerio.load(html);
        try {
            var $ = cheerio.load(html)
        } catch (e) {
            console.log("[x-x] error loading html");
        }
        // parse data of interest
        data = $("script")['3'].children[0].data;

        var st1 = '(';
        var st2 = ')';
        var indexOfFirst = data.indexOf(st1);
        var indexOfSecond = data.indexOf(st2);
        data = data.slice(indexOfFirst+1, indexOfSecond).split(',');

        console.log(data);
        // then return in reponse
        return res.json(data);
    })
});//end app.get("/sync")


// start listening
app.listen(PORT, function() {
    console.log("[*.*] listening on port " + PORT);
});


/*

*/