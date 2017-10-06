// server.js

// init project
const express = require('express');
const app = express();
const datetime = require('./time.js')();


function dateString(date){
  return `${date.toDateString()} @ ${date.toTimeString().substring(0,8)}`
}


app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/compute", function(request, response){
  
  const hoursAgo = parseInt(request.query.hours);
  if(!hoursAgo){
    response.send("Try again with a number.");
    return;
  }
  
  const timeComputer = datetime.timeComputerFactory(hoursAgo)
  const nowTimeStr = datetime.dateString(timeComputer.nowDate())
  const computedTimeStr = datetime.dateString(timeComputer.computedDate())
  
  response.send(`${nowTimeStr} -> ${computedTimeStr}`);
  
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
