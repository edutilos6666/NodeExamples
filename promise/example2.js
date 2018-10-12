const worker = require("./worker");

const runPromises = async () => {
  try {
    let w = await worker.getWorkerAsPromise(1, "foo", 10, 100.0, true);
    console.log(w.toString());
    w = await worker.getWorkerAsPromise("bar", "bar", 20, 200.0, false);
    console.log(w.toString());
  } catch(err) {
    console.error(err);
  }
};


runPromises();
