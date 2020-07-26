const https = require('https');
const querystring = require('querystring');
const md5=require('md5');

const registered_users=[];
const logged_in_users=[];

module.exports={
  register_user:register_user,
  login:login,
  getUserInfo:getUserInfo
}

function User(name,email,password){
  this.name=name;
  this.email=email;
  this.password=md5(password);
}

function register_user(body,res){

  var newUser=new User(body.name,body.email,body.password);
  const found = registered_users.find(user=>user.email===newUser.email);
  if(found){
    res.json({status:false,message:"User with same Email already present"});
  }else{
    //USE EMAIL VERIFYING API HERE
    registered_users.push(newUser);
    res.send({status:true,message:'Successfully registered'});
  }
}

function login(body,res){
  const found=registered_users.find(user=>user.email===body.email);
  if(found && found.password===md5(body.password)){
    logged_in_users.push(found);
    res.json({status:true,message:"successfully logged in"});
  }
  else if (found && found.password!==md5(body.password)){
    res.json({status:false,message:"Incorrect Password"});
  }
  else{
    res.json({status:false,message:"User not registered"});
  }
}

function getUserInfo(email,res){
  const found=registered_users.find(user=>user.email===email);
  if(found){
    res.json({status:true,info:{name:found.name,email:found.email}});
  }
  else{
    res.json({status:false,info:{}});
  }
}
