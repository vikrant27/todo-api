const {ObjectID} =require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');

const {User} =require('./../server/models/user');

var id= '5ad488d53613f203ee85248a';

if(!ObjectID.isValid(id)){
	console.log('Id not valid');
}

// Todo.find({
// 	_id: id
// }).then((todos)=>{
// 	console.log('Todos',todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo)=>{
// 	console.log('Todos',todo);
// });

Todo.findById(id).then((todo)=>{
	if(!todo){
		return console.log('Id not found');
	}
	console.log('Todo by Id',todo)
}).catch((e)=> console.log(e));

User.findById('5a116483c5fd7f0247e8925c').then((user)=>{
	if(!user){
		return console.log('Unable to find user');
	}
	console.log(JSON.stringify(user,undefined,2));
},(e)=>{
	console.log(e)
});