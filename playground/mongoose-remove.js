const {ObjectID} =require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');

const {User} =require('./../server/models/user');

// Todo.remove({}).then((result)=>{
// 	console.log(result);
// });

//Get info back
Todo.findOneAndRemove({_id:'5ad4b10262ca14d41138a21e'}).then((todo)=>{

});

Todo.findByIdAndRemove('5ad4b10262ca14d41138a21e').then((todo)=>{
  console.log(todo);
});