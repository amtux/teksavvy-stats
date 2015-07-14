'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var request = require('request');
var cors = require('cors');
var app = express();

app.use(cors());



app.get('/records', function (req, res) {
  var url = 'https://api.teksavvy.com/web/Usage/UsageRecords';
  var key = "1B40A4ADC207C4FF6270C50E4E999BA0";
  request({
    headers: {'TekSavvy-APIKey': key},
    uri: url,
    method: 'GET'
  }, function (err, res, body) {
    console.log(res.statusCode);
    if (!err && res.statusCode === 200) {
        console.log(body); // Print the json response
    }
  });
});

app.get('/summaryRecords', function (req, res) {
  res.send('l');
});

  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});