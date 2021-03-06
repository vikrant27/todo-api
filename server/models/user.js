const mongoose =require('mongoose');

const validator=require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
       type: String,
       required:true,
       minlength: 1,
       trim:true,
       unique:true,
       validate:[{
       	validator : validator.isEmail,
       	message:'{VALUE} is not a valid email'
       }]
    },
    password:{
    	type :String,
    	required:true,
    	minlength:6
    },
    tokens:[{
    	access:{
    		type: String,
    		required:true
    	},
    	token:{
    		type:String,
    		required:true
    	}
    }]
});

UserSchema.methods.toJSON = function(){
  var user =this;
  var userObject = user.toObject();

  return _.pick(userObject,['email','_id']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET).toString();

	user.tokens = user.tokens.concat([{access,token}]);

	return user.save().then(() => {
		return token;
	});
};

UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;

  try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
  } catch(e){
    //return new Promise((resolve,reject)=>{
    //reject();
    return Promise.reject();
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });

};

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;

  return User.findOne({email}).then((user) =>{
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve,reject)=>{
      if(bcrypt.compareSync(password, user.password)){
        resolve(user);
      }else{
        reject();
      }
    })
  })
};

UserSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull:{
      tokens:{
        token:token
      }
    }
  });
};

UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
     user.password =hash;
     next();
  }else{
    next();
  }
});

var User =mongoose.model('User',UserSchema);

module.exports ={User};