// var page = require('webpage').create();
// page.open('http://www.google.com', function() {
//     setTimeout(function() {
//         page.render('google.png');
//         phantom.exit();
//     }, 200);
// });


const phantom = require('phantom');
 
(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });
 
  page.open('http://www.google.com', function() {
    setTimeout(function() {
        page.render('google.png');
        phantom.exit();
    }, 200);
});
})();