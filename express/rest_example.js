const mysql = require('mysql');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});

const connectionProps = {
  host:'localhost',
  user:'root',
  password:'root'
};

const dbName = 'test4';
const tableName = 'Person';

var people = [
  [1,"foo", 10, 100.0, true],
  [2, "bar", 20, 200.0, false],
  [3, "bim", 30, 300.0, true],
  [4, "pako", 40, 400.0, false]
];


convertListToPeopleList = (people) => {
  const ret = [];
  people.forEach(p=> {
    ret.push({
      id: p[0],
      name: p[1],
      age: p[2],
      wage: p[3],
      active: p[4]
    });
  });
}

var con = mysql.createConnection(connectionProps);
//drop,create database , create tablePerson and populate this table
con.connect((err)=> {
  if(err) {
    console.log("inside con.create");
    throw err;
  }
  con.query(`DROP DATABASE ${dbName}`, (err, res)=> {
    if(err) {
      console.log("inside drop database");
      throw err;
    }
    con.query(`CREATE DATABASE ${dbName}`, (err,res)=> {
      if(err) {
        console.log("inside create database");
        throw err;
      }
      con.query(`USE ${dbName}`, (err,res)=> {
        if(err) {
          console.log("inside  use database");
          throw err;
        }
        con.query(`CREATE TABLE ${tableName} (
          id bigint primary key not null,
          name varchar(50) not null,
          age int not null,
          wage double not null,
          active boolean not null
        )`, (err,res)=> {
          if(err) {
            console.log("inside create table");
            throw err;
          }
          con.query(`INSERT INTO ${tableName} VALUES ?`, [people],
        (err,res)=> {
          if(err) {
            console.log("inside insert into table");
            throw err;
          }
          con.end((err)=> {
            if(err) throw err;
          });
        });
      });
      });
    });
  });
});


findAll = ()=> {
  let ret = [];


}

app.get('/people', (req, res)=> {
  con = mysql.createConnection(connectionProps);
  con.connect((err)=> {
    if(err) throw err;
    con.query(`USE ${dbName}`, (err, result)=> {
      if(err) throw err;
      con.query(`SELECT id,name,age,wage,active FROM ${tableName}`, (err,resultList)=> {
        if(err) throw err;
        res.end(JSON.stringify(resultList));
        con.end((err)=> {
          if(err) throw err;
        });
      });
    })
  });
});


app.get('/people/:id', (req, res)=> {
  let id;
  try {
    id = Number(req.params.id);
  } catch(ex) {
    console.error(ex);
    return ;
  }
  con = mysql.createConnection(connectionProps);
  con.connect((err)=> {
    if(err) throw er;
    con.query(`use ${dbName}`, (err, result)=> {
      if(err) throw err;
      con.query(`select id,name,age,wage,active from ${tableName} where id = ?`, [id], (err, result)=> {
        if(err) throw err;
        res.end(JSON.stringify(result));
        con.end((err)=> {
          if(err) throw err;
        });
      });
    });
  });
});


checkIdDuplicate = (id) => {
  con = mysql.createConnection(connectionProps);
  con.connect((err)=> {
    if(err) throw err;
    con.query(`USE ${dbName}`, (err, result)=> {
      if(err) throw err;
      con.query(`select * from ${tableName}`, (err, result)=> {
        let ret = false;
        ret = result.filter(p=> p.id === id) > 0?true:false;
        con.end((err)=> {
          if(err) throw err;
          return ret;
        });
      });
    });
  });
}

app.post('/people', urlencodedParser, (req, res)=> {
  let id,name,age,wage,active;
  try {
    console.dir(req);
    console.dir(req.body);
    id = Number(req.body.id);
    name = req.body.name;
    age = Number(req.body.age);
    wage = parseFloat(req.body.wage);
    let _active = req.body.active;
    active = _active.toLowerCase() === "true"?true:false;
    if(checkIdDuplicate(id)) throw `id = ${id} is duplicate`;
  } catch(ex) {
    console.log(ex);
    return;
  }
  con = mysql.createConnection(connectionProps);
  con.connect((err)=> {
    if(err) throw err;
    con.query(`USE ${dbName}`, (err, result)=> {
      if(err) throw err;
      let onePerson = [[id,name,age,wage,active]]
      con.query(`insert into ${tableName} VALUES ?`, [onePerson], (err, result)=> {
        if(err) throw err;
        //that works , if i remove codeblock-186
        // res.end(JSON.stringify(result));
        // con.end((err)=> {
        //   if(err) throw err;
        // });

        // codeblock-186
        // I got error here , but i could not solve
        con.query(`SELECT id,name,age,wage,active FROM ${tableName}`, (err,resultList)=> {
          console.log(resultList);
          if(err) throw err;
          res.end(JSON.stringify("[]"));
          con.end((err)=> {
            if(err) throw err;
          });
        });
        // codeblock-186
      });
    });
  });
});


const port = 8080;

const server = app.listen(port, ()=> {
  // console.dir(server);
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express Server is running on ${host}:${port}`);
});
