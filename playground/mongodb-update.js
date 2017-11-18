// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) =>{
  if (err) {
  	return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDb server');
  
  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID('5a103d887d132788feeac61a')
  // },{
  //   $set:{
  //     completed:true
  //   }
  // }, {
  //    returnOriginal:false
  // }).then((result) => {
  //     console.log(JSON.stringify(result, undefined,2));
  // });

db.collection('Users').findOneAndUpdate({
    _id:new ObjectID('5a10305f24b29e02ea2e314b')
  },{
    $set:{
      name:'Bhivu'
    },
    $inc:{
      age:1
    }
  }, {
     returnOriginal:false
  }).then((result) => {
      console.log(JSON.stringify(result, undefined,2));
  });

  
  //db.close();

});