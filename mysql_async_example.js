const mysql = require('mysql');
const connectionProps = {
  host:'localhost',
  user:'root',
  password:'root'
};

const dbName = 'test4';
const tableName = 'Worker';


async function doRun() {
  //create connection
  const con = await mysql.createConnection(connectionProps);
  await con.connect();
  console.log("connection success");

  //use database
  await con.query(`use ${dbName}`);
  //drop table if exists
  await con.query(`drop table if exists ${tableName}`);
  //create table
  await con.query(`create table ${tableName} (
    id bigint primary key,
    name varchar(50) not null,
    age int not null,
    wage double not null,
    active boolean not null
  )`);
  //insert into table
  const workers = [
    [1, "foo", 10, 100.0, true],
    [2, "bar", 20, 200.0, false],
    [3, "bim", 30, 300.0, true],
    [4, "pako", 40, 400.0, false]
  ];
  await con.query(`insert into ${tableName} values ?`, [workers]);
  //select * from table
  await con.query(`select * from ${tableName}`, (err, resultList)=> {
    if(err) throw err;
    console.log(resultList);
  });

  //delete
  await con.query(`delete from ${tableName} where id = ? and name = ? and age = ?`, [1, "foo", 10]);
  //select * from table
  await con.query(`select * from ${tableName}`, (err, resultList)=> {
    if(err) throw err;
    console.log("<<after delete>>");
    console.log(resultList);
  });

  //findById
  await con.query(`select * from ${tableName} where id = ?`, [2], (err, result)=> {
    if(err) throw err;
    console.log("<<findById>>");
    console.log(result);
  });
  //update
  await con.query(`update ${tableName} set name = ?, age = ?, wage = ?, active = ? where id = ?`,
    ["new-bar", 66, 666.6, true,2]);
  //select * from table
  await con.query(`select * from ${tableName}`, (err, resultList)=> {
    if(err) throw err;
    console.log("<<after update>>");
    console.log(resultList);
  });

  await con.end();
  console.log("connection closed");
}

doRun();
