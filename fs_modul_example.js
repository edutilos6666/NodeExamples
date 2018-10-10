const fs = require('fs');
const path = require('path');


fs.readFile('static/People.html', (err,data) => {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});


var filename = 'static/test.html';

fs.writeFile(filename, '<h1>Heading 1</h1>\n', (err)=> {
  if(err) throw err;
  console.log('fs.writeFile() SUCCESS!');
});

fs.appendFile(filename, '<h2>Heading 2</h2>\n', (err)=> {
  if(err) throw err;
  console.log('fs.appendFile() SUCCESS!');
});

filename = 'static/test2.html';
fs.open(filename, 'w',  (err, fd)=> {
  if(err) throw err;
  fs.write(fd,'<h3>Heading 3</h3>\n', (err)=> {
    if(err) throw err;
    console.log('fs.open() SUCCESS');
  });
});

fs.open(filename, 'a',  (err, fd)=> {
  if(err) throw err;
  fs.write(fd,'<h4>Heading 4</h4>\n', (err)=> {
    if(err) throw err;
    console.log('fs.open() SUCCESS');
  });
});

const buff = new Buffer(1024);
fs.open(filename, 'r', (err, fd)=> {
  if(err) throw err;
  fs.read(fd, buff, 0, buff.length, 0, (err,bytes)=> {
    if(err) throw err;
    if(bytes > 0) {
      console.log("HERE: ", buff.slice(0, bytes).toString());
    }
  });
});

//deleting files
fs.unlink(filename, (err)=> {
  if(err) throw err;
  console.log(`${filename} was deleted.`);
});

filename = 'static/test.html';
fs.unlink(filename, (err)=> {
  if(err) throw err;
  console.log(`${filename} was deleted.`);
});



fs.open(filename, 'w', (err, fd) => {
  if(err) throw err;
  fs.rename(filename, 'static/test2.xml',(err)=> {
    if(err) throw err;
    console.log('fs.rename(): SUCCESS');
  });
});





fs.unlink('tmp/file1.csv', (err)=> {
  // if(err) throw err;
  fs.unlink('tmp/file2.html', (err)=> {
    // if(err) throw err;
    fs.rmdir('tmp', (err)=> {
      if(err) throw err;
      console.log('fs.rmdir(): SUCCESS');
      fs.mkdir('tmp', (err)=> {
        if(err) throw err;
        console.log('fs.mkdir(): SUCCESS');
        fs.writeFile('tmp/file1.csv', '1,foo,10,100.0,true\n2,bar,20,200.0,false', (err)=> {
          if(err) throw err;
          console.log('fs.writeFile(): SUCCESS');
          fs.open('tmp/file2.html', 'w', (err, fd)=> {
            if(err) throw err;
            fs.write(fd, '<h1>Heading 1</h1>\n');
            fs.write(fd, '<h2>Heading 2</h2>\n');
            fs.readdir('tmp', (err, files)=> {
              if(err) throw err;
              files.forEach(file=> {
                console.log(file);
                fs.readFile(path.join('tmp/',file), (err,data)=> {
                  if(err) throw err;
                  console.log(data.toString());
                });
              });
            });
          });
        });

      });
    });

  });
});
