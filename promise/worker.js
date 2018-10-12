class Worker {
  constructor(id, name, age, wage, active) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.wage = wage;
    this.active = active;
  }

  get fullInfo() {
    return `${this.id},${this.name},${this.age},${this.wage},${this.active}`;
  }

  toString() {
    return `Worker(${this.id},${this.name},${this.age},${this.wage},${this.active})`;
  }
}

const toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

const getWorkerAsPromise = async (id,name,age,wage,active) => {
  return new Promise((resolve,reject)=> {
    try {
      if(toType(id) !== 'number' || toType(name) !== 'string' ||
      toType(age) !== 'number' || toType(wage) !== 'number' || toType(active) !== 'boolean')
      throw "type mismatch";
      resolve(new Worker(id,name,age,wage,active));
    } catch(err) {
      // console.error(err);
      reject(err);
    }
  });
}


module.exports.Worker = Worker;
module.exports.getWorkerAsPromise = getWorkerAsPromise;
