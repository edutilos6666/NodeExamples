const http = require('http');
const request = require('request');

var postData = {
  id:1,
  name: "foo",
  age: 10,
  wage: 100.0,
  active: "true"
};


changePostData = (id, name, age, wage, active)=> {
  postData.id = id;
  postData.name = name;
  postData.age = age;
  postData.wage = wage;
  postData.active = active;
}

callbackFn =  (error, response, body)=> {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  console.log(JSON.parse(body));
};

const baseUrl = 'http://localhost:8080/students';

/*
 ########### POST request ################
 */
request.post({
  url: baseUrl,
  form: postData
},callbackFn);

changePostData(2, "bar", 20, 200.0, false);
request.post({
  url: baseUrl,
  form: postData
}, callbackFn);

changePostData(3, "bim", 30, 300.0, true);
request.post({
  url: baseUrl,
  form: postData
}, callbackFn);

changePostData(4, "pako", 40, 400.0, false);
request.post({
  url: baseUrl,
  form: postData
}, callbackFn);


/*
 ########### GET request ################
 */
request.get({url:baseUrl}, (error,response, body)=> {
  console.log("<<findAll>>");
  console.log(JSON.parse(body));
});

/*
 ########### PUT request ################
 */
changePostData(1, "new-foo", 66, 666.6, false);
request.put({
  url: `${baseUrl}/1`,
  form: postData
}, (error, response, body)=> {
  console.log("<<after update>>");
  console.log(JSON.parse(body));
});


/*
 ########### DELETE request ################
 */
request.delete({
  url: `${baseUrl}/2`
}, (error, response, body)=> {
  console.log("<<after delete>>");
  console.log(JSON.parse(body));
});


/*
 ########### GET request (find(id = 1)) ################
 */
request.get({
  url: `${baseUrl}/1`
}, (error, response, body)=> {
  console.log("<<after find(id=1)>>");
  console.log(JSON.parse(body));
});
