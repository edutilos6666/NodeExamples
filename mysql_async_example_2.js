class Student {
  constructor(id,name,age,wage,active) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.wage = wage;
    this.active = active;
  }
  get fullInfo() {
    return `${this.id},${this.name},${this.age},${this.wage},${this.active}`;
  }
  set fullInfo(value) {
    const splitted = value.split(",");
    try {
      this.id = Number(splitted[0]);
      this.name = splitted[1];
      this.age = Number(splitted[2]);
      this.wage = parseFloat(splitted[3]);
      this.active = splitted[4].toLowerCase() === "true"?true:false;
    } catch(ex) {
      console.error(ex);
    }
  }

  toString() {
    return `Student(${this.id},${this.name},${this.age},${this.wage},${this.active})`;
  }
}


testStudent = ()=> {
  let s1, s2, s3;
  s1 = new Student(1, "foo", 10, 100.0, true);
  s2 = new Student(2, "bar", 20, 200.0, false);
  s3 = new Student(3, "bim", 30, 300.0, true);

  console.log(s1.toString());
  console.log(s2.toString());
  console.log(s3.toString());

  s2.name ="new-foo";
  console.log(s2.toString());
  console.log(s2.fullInfo);
  s2.fullInfo ="6,messi,66,666.6,true";
  console.log(s2.toString());
}

// testStudent();

class StudentDAO {
  async connect() {}
  async disconnect() {}
  async persist(student) {}
  async update(id,newStudent) {}
  async remove(id) {}
  async find(id,callbackFn) {}
  async findAll(callbackFn) {}
}


class StudentDAOImpl extends StudentDAO {
  constructor(dbName, tableName) {
    super();
    this.mysql = require('mysql');
    this.connectionProps = {
      host:'localhost',
      user:'root',
      password:'root'
    };

    // this.dbName = 'test4';
    // this.tableName = 'Student';
    this.dbName = dbName;
    this.tableName = tableName;
    // this.dropCreateTable();
  }

  async connect() {
    await this.dropCreateTable();
  }
  async disconnect() {
    await this.con.end()
  }

  async dropCreateTable() {
    this.con = await this.mysql.createConnection(this.connectionProps);
    await this.con.connect();
    //use database
    await this.con.query(`use ${this.dbName}`);
    //drop table if exists
    await this.con.query(`drop table if exists ${this.tableName}`);
    //create table
    await this.con.query(`create table ${this.tableName} (
      id bigint primary key,
      name varchar(50) not null,
      age int not null,
      wage double not null,
      active boolean not null
    )`);
    // await con.end();
  }
  async persist(student) {
    // console.log("persist");
    // const con = await this.mysql.createConnection(this.connectionProps);
    // await con.connect();
    // await con.query(`use ${this.dbName}`);
    const oneStudent = [
      [student.id, student.name, student.age, student.wage, student.active]
    ];
    await this.con.query(`insert into ${this.tableName} VALUES ?`, [oneStudent]);
    // await con.end();
  }

  async update(id,newStudent) {
    const params = [newStudent.name, newStudent.age, newStudent.wage, newStudent.active, id];
    await this.con.query(`update ${this.tableName} set name = ?, age = ?, wage = ?, active = ? where id = ?`,params);
  }
  async remove(id) {
    await this.con.query(`delete from ${this.tableName} where id = ?`, [id]);
  }
  async find(id, callbackFn) {
    await this.con.query(`select * from ${this.tableName} where id = ?`, [id], (err, resultList)=> {
      if(err) throw err;
      callbackFn(resultList);
    });
  }

  async findAll(callbackFn) {
    // const con = await this.mysql.createConnection(this.connectionProps);
    // await con.connect();
    // await con.query(`use ${this.dbName}`);
    await this.con.query(`select * from ${this.tableName}`, (err, resultList)=> {
      if(err) throw err;
      // console.log(resultList);
      callbackFn(resultList);
    });
    // await con.end();
  }
}


// does not work
// testWorkerDAOImpl = () => {
//   const dao = new StudentDAOImpl('test4', 'Student');
//   dao.connect();
//   dao.persist(new Student(1, "foo", 10, 100.0, true));
//   dao.persist(new Student(2, "bar", 20, 200.0, false));
//   dao.persist(new Student(3, "bim", 30, 300.0, true));
//   let all = dao.findAll();
//   console.log(all);
//   dao.disconnect();
// }

async function testWorkerDAOImpl() {
  const dao = new StudentDAOImpl('test4', 'Student');
  await dao.connect();
  await dao.persist(new Student(1, "foo", 10, 100.0, true));
  await dao.persist(new Student(2, "bar", 20, 200.0, false));
  await dao.persist(new Student(3, "bim", 30, 300.0, true));
  await dao.findAll((resultList)=> {
    console.log("<<all>>");
    console.log(resultList);
  });
  await dao.update(1, new Student(1, "new-foo", 66, 666.6, false));
  await dao.findAll((resultList)=> {
    console.log("<<after update all>>");
    console.log(resultList);
  });
  await dao.remove(1);
  await dao.findAll((resultList)=> {
    console.log("<<after delete all>>");
    console.log(resultList);
  });
  await dao.find(2, (resultList)=> {
    console.log(`findById = ${2}`);
    console.log(resultList);
  });
  await dao.disconnect();
}


// testWorkerDAOImpl();

module.exports.Student = Student;
module.exports.StudentDAO = StudentDAO;
module.exports.StudentDAOImpl = StudentDAOImpl;
module.exports.testStudent = testStudent;
module.exports.testWorkerDAOImpl = testWorkerDAOImpl;
