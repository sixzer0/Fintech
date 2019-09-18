var mysql=require('mysql');
var connection=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'1234',
    port     :'3308',
    database:'fintech'
});

connection.connect();

connection.query('SELECT * FROM user',function(error, results, fields){
if(error) throw error;
console.log(results);
});

