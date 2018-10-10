const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('printPerson', (id,name,age,wage,active)=> {
  console.log(id,name,age,wage,active);
});

eventEmitter.emit('printPerson',1,'foo',10, 100.0, true);
