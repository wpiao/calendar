var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root"
});

connection.connect(function(err) {
    if (err) {
        console.log('login failure, mysql -u root');
        return;
    }

    console.log("Connected!");
    let sqlRequest = "use calendar;";
    connection.query(sqlRequest, function (err, result) {
      if (err) 
        console.log('failure on use calendar');
    });
});
  
module.exports = connection;

