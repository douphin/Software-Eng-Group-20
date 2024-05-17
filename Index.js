var fs = require('fs');
var path = require('path');
var url = require('url');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);

app.listen(8080)