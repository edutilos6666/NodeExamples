const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/test2";

const dbName = "test";
const colName = "people";

convertListToObjectList = (people) => {
    const ret = [];
    people.forEach(person => {
        ret.push({
            id: person[0],
            name: person[1],
            age: person[2],
            wage: person[3],
            active: person[4]
        });
    });
    return ret;
}

MongoClient.connect(url, {useNewUrlParser: true}, (err,db)=> {
    if(err) throw err;
    console.log("connection opened.");
    //create collection
    const dbo = db.db(dbName);
    dbo.createCollection(colName, (err, res)=> {
        if(err) throw err;
        console.log(`${colName} was created.`);
        console.dir(res);
        var peopleList = [
            [1, "foo", 10, 100.0, true], 
            [2, "bar", 20, 200.0, false],
            [3, "bim", 30, 300.0, true],
            [4, "pako", 40, 400.0, false]
        ];
        dbo.collection(colName).insertMany(convertListToObjectList(peopleList), (err, res)=> {
            if(err) throw err;
            console.dir(res);
            dbo.collection(colName).insertOne({
                id: 5,
                name: "ronaldo",
                age: 50,
                wage: 500.0,
                active: true
            }, (err, res)=> {
                if(err) throw err;
                dbo.collection(colName).find({}).toArray((err,res)=> {
                    if(err) throw err;
                    console.log(res);
                    dbo.collection(colName).find({}, {projection: {_id:0, id:1, name:1, age:1, wage:1,active:1}})
                    .toArray((err,res)=> {
                        console.log(res);
                        var query = {
                            id:1,
                            name: 'foo'
                        };
                        var projection = {
                            _id: 0,
                            id: 1,
                            name: 1,
                            age: 1,
                            wage: 1,
                            active: 1
                        };
                        dbo.collection(colName).find(query, {projection:projection}).toArray((err,res)=> {
                            if(err) throw err;
                            console.log(res);
                            query = {
                                name: {$in: ["foo", "bar"]}
                            };
                            dbo.collection(colName).find(query, {projection:projection}).toArray((err,res)=> {
                                if(err) throw err;
                                console.log(res);
                                //and query 
                                query = {
                                    id: {$gte: 1, $lt: 4},
                                    name: {$in: ["foo", "bar", "bim"]},
                                    age: {$gt: 0, $lte: 30},
                                    wage: {$gte:100.0, $lte:300.0}
                                };

                                dbo.collection(colName).find(query, {projection:projection}).toArray((err,res)=> {
                                    if(err) throw err;
                                    console.log(res);
                                    //or query
                                    query = {
                                        $or: [
                                            {name: "foo"},
                                            {name: "bar"},
                                            {name: "bim"}
                                        ]
                                    };
                                    dbo.collection(colName).find(query, {projection:projection}).toArray((err,res)=> {
                                        if(err) throw err;
                                        console.log(res);
                                        //sort 
                                        var mysort = {
                                            name: 1,
                                            age: -1,
                                            wage: 1
                                        };
                                        dbo.collection(colName).find({}, {projection:projection}).sort(mysort).toArray((err,res)=> {
                                            if(err) throw err;
                                            console.log(res);
                                            //deleteOne
                                            console.log("\n<<After deleteOne>>");
                                            query = {
                                                id: 1,
                                                name: "foo",
                                                age: 10
                                            };
                                            dbo.collection(colName).deleteOne(query, (err, res)=> {
                                                if(err) throw err;
                                                dbo.collection(colName).find({}, {projection:projection}).toArray((err,res)=> {
                                                    if(err) throw err;
                                                    console.log(res);
                                                    //deleteMany
                                                    console.log("\n<<After deleteMany>>");
                                                    query = {
                                                        $or: [
                                                            {name:"bar"},
                                                            {age: 30},
                                                            {wage: 400.0}
                                                        ]
                                                    };
                                                    dbo.collection(colName).deleteMany(query, (err, res)=> {
                                                        if(err) throw err;
                                                        dbo.collection(colName).find({}, {projection:projection}).toArray((err,res)=> {
                                                            if(err) throw err;
                                                            console.log(res);
                                                            //updateOne
                                                            query = {
                                                                id: 5
                                                            };
                                                            var newValues=  {
                                                                $set: {
                                                                    name: 'new-ronaldo',
                                                                    age: 66,
                                                                    wage: 666.6
                                                                }
                                                            };
                                                            console.log("<<After updateOne>>");
                                                            dbo.collection(colName).updateOne(query, newValues, (err, res)=> {
                                                                if(err) throw err;
                                                                dbo.collection(colName).find({}, {projection:projection}).toArray((err,res)=> {
                                                                    if(err) throw err;
                                                                    console.log(res);
                                                                    //updateMany
                                                                    query = {
                                                                        name: /.*b.*/   //contains letter b(regex)
                                                                    };
                                                                    peopleList = [
                                                                        [1, "foo", 10, 100.0, true], 
                                                                        [2, "bar", 20, 200.0, false],
                                                                        [3, "bim", 30, 300.0, true],
                                                                        [4, "pako", 40, 400.0, false]
                                                                    ];
                                                                    console.log("<<after updateMany>>");
                                                                    dbo.collection(colName).insertMany(convertListToObjectList(peopleList), (err,res)=> {
                                                                        if(err) throw err;
                                                                        dbo.collection(colName).updateMany(query, newValues, (err,res)=> {
                                                                            dbo.collection(colName).find({}, {projection:projection}).toArray((err,res)=> {
                                                                                console.log(res);
                                                                                //limit
                                                                                console.log("<<Limit example>>");
                                                                                dbo.collection(colName).find({}, {projection:projection}).limit(3).toArray((err,res)=> {
                                                                                    if(err) throw err;
                                                                                    console.log(res); 
                                                                                    dbo.collection(colName).drop((err,res)=> {
                                                                                        if(err) throw err;
                                                                                        console.log(`dropped collection ${colName}`);
                                                                                        db.close();
                                                                                        console.log("closed db.");
                                                                                    });
                                                                                });
                                                                                
                                                                            });
                                                                        });
                                                                    });
                                                                    
                                                                });

                                                            });
                                                        
                                                        });
                                                    });
                                                    
                                                });
                                            });
                                            
                                        });
                                        
                                    });
                                    
                                });

                            });
                        });
                    
                    });
                    
                });
                
            });
        });


    });

});