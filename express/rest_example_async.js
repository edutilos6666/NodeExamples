const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const studentDAO = require('../mysql_async_example_2');

// studentDAO.testWorkerDAOImpl();
// studentDAO.testStudent();


const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});
const dbName = 'test4';
const tableName = 'Student';

convertResultlistToStudents = (resultList) => {
  const ret = [];
  resultList.forEach(r => {
    ret.push(new studentDAO.Student(r.id, r.name, r.age, r.wage, r.active));
  });

  return ret;
}


async function checkIdDuplicate(dao, id, callbackFn) {
  await dao.findAll((resultList)=> {
    if(resultList.filter(s=> s.id === id) > 0) {
      callbackFn();
    }
  });
}

parseBoolean = (txt) => {
  const active = txt.toLowerCase() === "true"?true:false;
  return active;
}


async function setupExpressServer() {
  const dao = new studentDAO.StudentDAOImpl(dbName, tableName);
  await dao.connect();

  await app.get('/students', (req, res)=> {
      dao.findAll((resultList)=> {
      res.end(JSON.stringify(convertResultlistToStudents(resultList)));
    });
  });

  await app.get('/students/:id', (req, res)=> {
    let id;
    try {
      id = Number(req.params.id);
    } catch(err) {
      console.error(err);
      return ;
    }

    dao.find(id, (result)=> {
      res.end(JSON.stringify(result))
    });
  });


  await app.post('/students', urlencodedParser, (req, res)=> {
    let id,name,age,wage,active;
    try {
      id = Number(req.body.id);
      name = req.body.name;
      age = Number(req.body.age);
      wage = parseFloat(req.body.wage);
      active = parseBoolean(req.body.active);
      checkIdDuplicate(dao, id, ()=> {throw `id = ${id} is duplicate`});
    } catch(err) {
      console.error(err);
      return;
    }
    dao.persist(new studentDAO.Student(id, name, age, wage, active));
    dao.findAll((resultList)=> {
        res.end(JSON.stringify(convertResultlistToStudents(resultList)));
    });
  });


  await app.put('/students/:id', urlencodedParser, (req, res)=> {
    let id, name, age, wage, active;
    try {
      id = Number(req.params.id);
      name = req.body.name;
      age = Number(req.body.age);
      wage = parseFloat(req.body.wage);
      active = parseBoolean(req.body.active);
    } catch(err) {
      console.error(err);
      return;
    }
    dao.update(id, new studentDAO.Student(id, name, age, wage, active));
    dao.findAll((resultList)=> {
      res.end(JSON.stringify(convertResultlistToStudents(resultList)));
    });
  });

  await app.delete('/students/:id', (req, res)=> {
    let id;
    try {
      id = Number(req.params.id);
    } catch(err) {
      console.log(err);
      return;
    }
    dao.remove(id);
    dao.findAll((resultList)=> {
      res.end(JSON.stringify(convertResultlistToStudents(resultList)));
    });
  });


  const port = 8080;

  const server = await app.listen(port, ()=> {
    // console.dir(server);
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Express Server is running on ${host}:${port}`);
  });
}

setupExpressServer();
