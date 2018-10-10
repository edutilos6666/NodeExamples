const mysql = require('mysql');
const connectionProps = {
  host:'localhost',
  user:'root',
  password:'root'
};

const dbName = 'test4';
const tableName = 'Person';



const con = mysql.createConnection(connectionProps);
con.connect((err)=> {
  if(err) throw err;
  console.log('Connection SUCCESS!');
  //drop database
  con.query(`DROP DATABASE ${dbName}`, (err,result)=> {
    if(err) throw err;
    console.log('Database was dropped.');
    //create database
    con.query(`CREATE DATABASE ${dbName}`, (err,result)=> {
      if(err) throw err;
      console.log('Database was created.');
      //choose database
      con.query(`USE ${dbName}`, (err,result)=> {
        if(err) throw err;
        console.log(`Database was chosen.`);
        //create table Person
        con.query(`CREATE TABLE IF NOT EXISTS ${tableName} (
id bigint primary key not null,
name varchar(50) not null,
age int not null,
wage double not null,
active boolean not null
  )`, (err, result)=> {
         if(err) throw err;
         console.log('Table Person was created.');
         //insert values
         const sql = `INSERT INTO ${tableName} VALUES ?`;
         const people = [
           [1,'foo',10,100.0,true],
           [2,'bar',20,200.0,false],
           [3,'bim',30,300.0,true],
           [4,'pako',40,400.0,false]
         ];
         con.query(sql, [people], (err,result)=> {
           if(err) throw err;
           console.log('Inserted values: ');
           console.dir(result);
           //select
           con.query(`SELECT * FROM ${tableName} ORDER BY name LIMIT 3`, ['name',3], (err,result)=> {
             if(err) throw err;
             console.dir(result);
             console.log(result[0].id,result[0].name,result[0].age);

             //another select
             var params = [1,10, 10, 100, 100.0, 1000.0];
             con.query(`SELECT id,age,wage FROM ${tableName} WHERE id >= ? AND id <= ? AND
               age >= ? AND age <= ? AND wage >=? AND wage <= ?`, params, (err,result)=> {
               if(err) throw err;
               console.dir(result);
               //delete
               params = [1, 'foo', 10, 100.0]
               con.query(`DELETE from ${tableName} WHERE id = ? AND name = ?
                 AND age = ? AND wage = ?`,params, (err,result)=> {
                 if(err) throw err;
                 console.log("DELETE SUCCESS");
                 console.log("<<After DELETE>>");
                 con.query(`SELECT * from ${tableName}`, (err, result)=> {
                   if(err) throw err;
                   console.dir(result);
                   //update
                   params = ['new-bar', 66, 666.6, 2];
                   con.query(`UPDATE ${tableName} set name = ?, age = ?, wage = ?
                     WHERE id = ?`, params, (err,result)=> {
                       if(err) throw err;
                       console.log("UPDATE SUCCESS");
                       con.query(`SELECT * FROM ${tableName}`, (err,result)=> {
                         if(err) throw err;
                         console.dir(result);
                         //disconnect
                         con.end((err)=> {
                           if(err) throw err;
                           console.log("disconnect SUCCESS");
                         });
                       });
                     });
                 });
               });

             });

           });
         });
         });
      });
    });
  });
});
