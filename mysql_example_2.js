const mysql = require('mysql');

const connectionProps = {
  host: 'localhost',
  user: 'root',
  password: 'root'
};

const dbName = 'test4';
const tableWorker = 'Worker';
const tableAddress = 'Address';

const con = mysql.createConnection(connectionProps);


const printData = (resultList)=> {
  resultList.forEach(res=> {
    console.log(res.id,res.name, res.age, res.wage, res.active, res.country, res.city, res.plz);
  });
}

con.connect((err)=> {
  if(err) throw err;
  console.log("connect success");
  //drop DATABASE
  con.query(`drop DATABASE ${dbName}`, (err, result)=> {
    if(err) throw err;
    console.log(`dropped database`);
    console.dir(result);
    //create datatbase
    con.query(`create database ${dbName}`, (err, result)=> {
      if(err) throw err;
      console.log(`created database`);
      console.dir(result);
      //use database
      con.query(`use ${dbName}`, (err, result)=> {
        //create tableWorker
        con.query(`create table ${tableWorker} (
  id bigint primary key not null,
  name varchar(50) not null,
  age int not null,
  wage double not null,
  active boolean not null
        )`
        , (err, result)=> {
          if(err) throw err;
          con.query(`create table ${tableAddress} (
  id bigint primary key not null,
  country varchar(50) not null,
  city varchar(50) not null,
  plz varchar(50) not null,
  workerId bigint,
  foreign key (workerId) references ${tableWorker}(id)
          )`, (err, result)=> {
            if(err) throw err;
            //add values
            var values = [
              [1,'foo',10,100.0,true],
              [2,'bar',20,200.0,false],
              [3,'bim',30,300.0,true],
              [4,'pako',40,400.0,false]
            ];
            con.query(`insert into ${tableWorker} VALUES ?`, [values], (err, result)=> {
              if(err) throw err;
              values = [
                [1, 'Germany', 'Bochum', '44081', 1],
                [2, 'Germany', 'Essen', '44761', 2],
                [3, 'Germany', 'Düsseldorf', '43123', 3],
                [4, 'Germany', 'Hamburg', '34523', 4]
              ];
              con.query(`insert into ${tableAddress} VALUES ?`, [values], (err, result)=> {
                if(err) throw err;
                //join
                con.query(`select w.id, w.name,w.age, w.wage, w.active, a.country, a.city, a.plz
                  from ${tableWorker} w join ${tableAddress} a on w.id = a.workerId`, (err, result)=> {
                    if(err) throw err;
                    // console.dir(result);
                    printData(result);
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
