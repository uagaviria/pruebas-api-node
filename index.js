const fs = require('fs')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

var { post, get } = require('./api.v0');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const fields = ["lat","lng","date","time","altitude","course","speed","humidity",
  "temperature","pm1","pm25","pm10"];

/*
{
  "location": { x: 0.00, y: 0.00 },
  "data": {
    "pm25": 0.00,
    "pm10": 0,00
  }
}
*/
app.post('api/v0/air/:sensor_id', (req, res) => {
});

/*
  CSV ROW Description
  sensor_id,lat,lng,date,time,altitude,course,speed,humidity,temperature,pm1,pm2.5,pm10
 */
app.post('api/v0/air/:sensor_id.csv', (req, res) => {
  var csv = req.body;
  var rows = csv.split("\n");
  rows.forEach((r, i) => {
    fields.forEach((f) => {
      data[f] = r[i];
    });
  });

  post('air', data);
  res.send({ ok: 1 });
});

app.get('api/v0/air/:sensor_id', (req, res) => {
  get('air', req.params.sensor_id, (err, json) => {
    if(err) { return res.send(500) }
    res.send(json);
  });
});

app.get('api/v0/air/:sensor_id', (req, res) => {
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
