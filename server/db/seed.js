var db = require('./index.js');

var faker = require('faker');
var streetAddr = faker.address.streetAddress();
var city = faker.address.city();
var state = faker.address.state();
var zip = faker.address.zipCode();

console.log(streetAddr + ', ' + city + ', ' + state + ' ' + zip + ' ');

let multiAddress = [];
for(let i = 0; i < 10; i++) {
    var streetAddr = faker.address.streetAddress();
    var city = faker.address.city();
    var state = faker.address.state();
    var zip = faker.address.zipCode();

    var address = streetAddr + ', ' + city + ', ' + state + ' ' + zip + ' ';
    multiAddress.push(address);
    //console.log(address);
} 

console.log(multiAddress);
db.connect(function(err) {
    if (err) {
        console.log('login failure, mysql -u root');
        return;
    }
    console.log("DB Connection Success @ db/seed.js");


    let sqlInsert = `INSERT INTO address (homeAddr) VALUES ?`;
    db.query(sqlInsert, [multiAddress], (err) => {
        if(err) {
            console.log('invalid insert: ', sqlInsert);
        } else {
            console.log('insert success');
            connection.end();
        }
});




});

    
