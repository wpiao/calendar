const express = require('express');
const app = express();
const db = require('./db');

// middleware:
var morgan = require('morgan');
var parser = require('body-parser')

// apply middlware
app.use(morgan('dev'));
app.use(parser.json());

const path = require('path');

const PORT = 3001;

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));


app.get('/month', (req, res) => {
    
    //console.log('query', req.query);
    var params = req.query;
    //res.sendStatus(200);

    db.getMonthAvalibility(params, (err, data) => {
      if(err) {
        console.log(`error @ getMonthAvalibility`);
        res.sendStatus(404);
      } else {

        console.log('data @ index', data);
        var individualDayArr = [];
        data.forEach(item => {
          var startDate = item.startDate;
          var endDate = item.endDate;
          console.log(item.startDate,  item.endDate);
          //var startDate = new Date(startDate0.split("-").join("/"));
          //var endDate = new Date(endDate0.split("-").join("/"));
      
          while (startDate <= endDate) {
            let indDate = startDate.toISOString().split("T")[0];
      
            // individualDayArr.push([1, indDate, indDate]);
            individualDayArr.push(indDate);
            startDate.setDate(startDate.getDate() + 1);
            // console.log(endDate);
          }
        });

        //console.log('@index', individualDayArr);
        let month_year = `${params.year}-${params.month}`;
        var a = individualDayArr.filter(item => item.includes(month_year));

        console.log('filtered', a);
        

        res.json(a);
      }
    });
  });