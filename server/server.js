'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var request = require('request');
var cors    = require('cors');
var app     = express();

app.use(cors());

// --- HELPER FUNCTIONS --- \\

function pushElemsToObject(jsonArray, jsonObj) {
  for(var i = 0; i < jsonArray.length; i++) {
    jsonObj['value'].push(jsonArray[i]);
  }
}

function getData(url, apiKey, type, data, refRes) {
  request({
      headers: {
        'TekSavvy-APIKey': apiKey
      },
      uri: url,
      method: 'GET'
    },
    function(err, res, body) {
      if (!err && res.statusCode === 200) {
        console.log('data fetch success!');
        var parsedBody = JSON.parse(body);

        if (type === 'records') {
          
          // --- IF THE REQUEST iS FOR DAILY RECORDS --- \\
          
          console.log('type records -- run detected');

          pushElemsToObject(parsedBody['value'], data);

          var nextLink = parsedBody['odata.nextLink'];
          if (nextLink) { // recursively fetch rest of the records
            getData(nextLink, apiKey, 'records', data, refRes);
          } else {
            console.log('finished fetching all the data -- sending!')
            refRes.send(data);
          }
        } else if (type === 'summary') {
          
          // --- IF THE REQUEST iS FOR SUMMARY --- \\
          
          console.log('type summary -- run detected');

          var parsedBody = JSON.parse(body);
          pushElemsToObject(parsedBody['value'], data);
          console.log('finished fetching all the data -- sending!')
          refRes.send(data);

        } else {
          console.log('type else -- run detected');
          refRes.send(parsedBody);
        }
      } else {
        console.log("Error fetching API data!!")
      }
    });

}


app.get('/records/:apikey', function(req, res) {
  var apiKey = req.params.apikey;
  console.log('key is ', apiKey);
  var url = 'https://api.teksavvy.com/web/Usage/UsageRecords';
  
  var initObj = '{"value":[]}';
  var data = JSON.parse(initObj);

  getData(url, apiKey, 'records', data, res);

});

app.get('/summary/:apikey', function(req, res) {
  var apiKey = req.params.apikey;
  console.log('key is ', apiKey);
  var url = 'https://api.teksavvy.com/web/Usage/UsageSummaryRecords';
  
  var initObj = '{"value":[]}';
  var data = JSON.parse(initObj);

  getData(url, apiKey, 'summary', data, res);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('teksavvy-stats listening at http://localhost:%s', port);
});