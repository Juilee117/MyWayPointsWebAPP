var express= require('express');
var request=require('request');
var app=express();
var cors = require('cors')

var port=3000;

app.use(cors());
app.listen(port);
console.log('Server port='+port);

app.get('/',function(req,res){
  res.send('testing server')
});
app.post('/path',function(req,res){
  var source=req.query.src;
  var destination=req.query.dest;
  request.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=AIzaSyAUGOOKU_e3JzOCvP2hj2Yp6Aa5a8TTao0`,function(error,response,body){
    if(!error){
      var mapAPIResponse=JSON.parse(body);
      const decodePolyline = require('decode-google-map-polyline');
      var routePoints=decodePolyline(mapAPIResponse.routes[0].overview_polyline.points);
      //getting weather of route
      console.log(routePoints.length);
      var boundPoints=mapAPIResponse.routes[0].bounds.northeast;
      res.send({routePts:routePoints,boundPts: mapAPIResponse.routes[0].bounds});
    }
    else{
      console.log(error);
    }
  })
});
app.post('/weather',function(req,res){
  var lat=req.query.lat;
  var lng=req.query.lng;
  request.post(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=95f52ff79685682ce3f51008f96ad326&units=imperial`,function(weatherErr,weatherResponse,weatherBody){
      if(!weatherErr){
       weatherPoints=JSON.parse(weatherBody);

      console.log(weatherPoints);
      res.send({weatherPts:weatherPoints});
      }
      console.log(weatherPoints);
    })

});
