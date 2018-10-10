console.log(`__filename = ${__filename}`);
console.log(`__dirname = ${__dirname}`);
const labelForTime = "Getting Data";
console.time(labelForTime);
const timeoutId = setTimeout(()=> {
  console.log('Hello World!');
  clearTimeout(timeoutId);
  console.timeEnd(labelForTime);
}, 1000);


var counter = 0;
const intervalId = setInterval(()=> {
  console.log('Hello World!');
  ++counter;
  if(counter === 4) {
    clearInterval(intervalId);
  }

}, 1000);

const person = {
  id: 1,
  name: 'foo',
  age: 10,
  wage: 100.0,
  active: true
};
console.log(person);
console.info(person);
console.error(person);
console.warn(person);
console.dir(person);
console.trace(person);
// console.assert(2 !== 2, "2 must be equal to 2");
process.stdout.write('Hello World from process.stdout.\n');
console.log(`process.execPath = ${process.execPath}`);
console.log(`process.platform = ${process.platform}`);
console.log(`process.cwd() = ${process.cwd()}`);
console.log(`process.version = ${process.version}`);
console.log(`process.memoryUsage() = ${process.memoryUsage()}`);
console.dir(process.memoryUsage());
