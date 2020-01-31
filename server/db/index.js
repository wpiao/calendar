var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root"
});

connection.connect(function(err) {
  if (err) { 
    console.log("login failure, mysql -u root");
    return;
  }

  console.log("DB Connection Success @ db/index.js");
});

module.exports = connection;