const SimpleMath = require('./simple_math');

const a = 10, b = 3;
const add = SimpleMath.add(a,b);
const subtract = SimpleMath.subtract(a,b);
const multiply = SimpleMath.multiply(a,b);
const divide = SimpleMath.divide(a,b);
const modulo = SimpleMath.modulo(a,b);

console.log(`<<SimpleMath results>>
${a} + ${b} = ${add}
${a} - ${b} = ${subtract}
${a} * ${b} = ${multiply}
${a} / ${b} = ${divide}
${a} % ${b} = ${modulo}`);
