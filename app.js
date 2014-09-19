"use strict";

var http = require("http");
var request = require("request");
var pictureTube = require("picture-tube");
var url = require("url");
var Router = require("routes");
var colors = require("colors");

var router = new Router();

router.addRoute("/", main);
router.addRoute("/gimmephoto", gimmePhoto);
router.addRoute("/about", about);
router.addRoute("/contact", contact);

http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  var match = router.match(path);
  match.fn(req, res, match);
}).listen(1337);

function main(req, res, match) {
  res.statusCode = 200;
  res.write("Day Rate $850. Half Day Rate $500.\n\n" +
    "MENU\n\n".bold.underline.yellow +
    "* about\n".green +
    "* contact\n".green +
    "* gimmephoto".green);
  res.end();
}

function about(req, res, match) {
  res.statusCode = 200;
  res.write("Pretender to the Node Throne and fulltime rubyist.\n" +
    "Greatest photographer of all time in the JS sphere.\n" +
    "Come at me bro\n\n" +
    "|￣￣￣￣￣ ￣￣ |\n" +
    "| @FOTOVERITE    |\n" +
    "|                |\n" +
    "|    PLEASE      |\n" +
    "| ＿＿＿＿＿_ ＿ |\n" +
    "(\__/)   ||\n" +
    "(•ㅅ•)  ||\n" +
    "/ 　 づ"
);
  res.end();
}

// render the admin.users page
function gimmePhoto(req, res, match) {
  // send user list
  res.statusCode = 200;
  var tube = pictureTube();
  request("http://www.darlinhouse.com/readcherry.png").pipe(tube);
  tube.pipe(res);
}

function contact(req,res,match) {
  var contactInfo = {
  firstName: "Matthew",
  lastName: "Bergman",
  email: "mzbphoto@gmail.com",
  phone: "2016585727",
  flickr: "http://flickr.com/matthewbergman"
};

var contactString = JSON.stringify(contactInfo);

var headers = {
  "Content-Type": "application/json",
  "Content-Length": contactString.length
};
  res.statusCode = 200;
  res.headers = headers;
  res.write(contactString);
  res.end();
}