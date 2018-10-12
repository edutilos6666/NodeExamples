const p1 = new Promise((resolve, reject)=> {
  resolve("Promise p1 was called.");
});

const p2 = new Promise((resolve, reject)=> {
  resolve("Promise p2 was called.");
});

const p3 = new Promise((resolve, reject)=> {
  resolve("Promise p3 was called.");
});

let runPromises = async () => {
  console.log(await p1);
  console.log(await p2);
  console.log(await p3);
};

runPromises();


const f1 = async () =>  {
  return new Promise((resolve,reject)=> {
    resolve("Promise inside f1 was called.");
  });
}

const f2 = async () => {
  return p1;
}
const f3 = async () => {
  return p2;
}

const f4 = async () => {
  return p3;
}

runPromises = async () => {
  console.log(await f1());
  console.log(await f2());
  console.log(await f3());
  console.log(await f4());
}

runPromises();
