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

 
// var records = [
//                 [1, 'Yashwant', 'Chavan'],
//                 [2, 'Diwakar', 'Patil'],
//                 [3, 'Anoop', 'More']
// ];
 
//var sql = "INSERT INTO trn_employee (employee_id, first_name, last_name) VALUES ?";
let sqlInsert = `INSERT INTO address (homeAddr) VALUES ?`;
 
// var query = connection.query(sql, [records], function(err, result) {
//     console.log(result);
// });

db.query(sqlInsert, [multiAddress], (err) => {
    if(err) {
        console.log('invalid insert: ', sqlInsert);
    } else {
        console.log('insert success');
        connection.end();
    }
});

 
//connection.end();


// let sqlInsert = `INSERT INTO address (homeAddr) VALUE ('${address}')`;
// console.log(sqlInsert);
// db.query(sqlInsert, (err) => {
//     if(err) {
//         console.log('invalid insert: ', sqlInsert);
//     } else {
//         console.log('insert success');
//     }
// });





