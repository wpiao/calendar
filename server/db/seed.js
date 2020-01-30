var db = require("./index.js");

var faker = require("faker");
var streetAddr = faker.address.streetAddress();
var city = faker.address.city();
var state = faker.address.state();
var zip = faker.address.zipCode();
console.log(streetAddr + ", " + city + ", " + state + " " + zip + " ");

let multiAddress = [];
for (let i = 0; i < 100; i++) {
  var streetAddr = faker.address.streetAddress();
  var city = faker.address.city();
  var state = faker.address.state();
  var zip = faker.address.zipCode();

  var address = streetAddr + ", " + city + ", " + state + " " + zip + " ";
  multiAddress.push([address]);
  console.log(address);
}

console.log(multiAddress);

var unvailDates = [
  [1, "2020-04-01", "2020-05-01"],
  [1, "2020-12-02", "2020-12-02"],
  [2, "2020-04-05", "2020-05-06"]
];

let sqlRequest = "use calendar;";
db.query(sqlRequest, function(err, result1) {
  if (err) console.log("failure on use calendar");
  else {
    console.log("=> use calendar successful: ", result1);

    var sql = "INSERT INTO address (homeAddr) VALUES ?";
    db.query(sql, [multiAddress], function(err, result) {
      if (err) {
        console.log("INSERT failure:", err);
      } else {
        console.log("INSERT OK!", result.message);

        var sql = "INSERT INTO availability (addrID, startDate, endDate ) VALUES ?";
        db.query(sql, [unvailDates], function(err, result) {
          if (err) {
            console.log("availability INSERT failure:", err);
          } else {
            console.log("availability INSERT OK!", result.message);
          }
        });
        db.end();
      }
    });
  }
});
