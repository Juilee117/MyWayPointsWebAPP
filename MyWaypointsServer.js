var express= require('express');
var request=require('request');
var app=express();
var cors = require('cors')

var port=3000;

app.use(cors())
app.listen(port);
console.log('Server port='+port);

app.get('/',function(req,res){
  res.send('testing server')
});
app.post('/path',function(req,res){
  var source=req.query.src;
  var destination=req.query.dest;
//  res.send('Path from '+source+' to '+destination);
  console.log(req);
  request.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=AIzaSyAUGOOKU_e3JzOCvP2hj2Yp6Aa5a8TTao0`,function(error,response,body){
    if(!error){
      var route=JSON.parse(body);
      //console.log(route);
      res.send(route);
    }
    else{
      console.log(error);
    }
  })
})
