const https = require('https');
const querystring = require('querystring');
const md5=require('md5');
const zxcvbn=require('zxcvbn');

const registered_users=[];

module.exports={
  register_user:register_user,
  login:login,
  getUserInfo:getUserInfo,
  isLoggedIn:isLoggedIn,
  logout:logout,
  getAllUsers:getAllUsers,
  search:search,
  check_strength:check_strength
}

function User(name,email,password){
  this.name=name;
  this.email=email.toLowerCase();
  this.password=md5(password);
  this.uid=this.email.split('@')[0];
}

function register_user(body,res){

  var newUser=new User(body.name,body.email,body.password);
  const found = registered_users.find(user=>user.email===newUser.email.toLowerCase());
  if(found){
    res.json({status:false,message:"User with same Email already present"});
  }else{
    //USE EMAIL VERIFYING API HERE
    registered_users.push(newUser);
    res.send({status:true,message:'Successfully registered'});
  }
}

function login(req,body,res){
  const present=isLoggedIn(req);
  if(present.status){
    return {status:true,message:'Already Logged In',user:present.user};
  }else{
    const found=registered_users.find(user=>user.email===body.email.toLowerCase());
    if(found && found.password===md5(body.password)){
      const data=getUserInfo(body.email).info;
      req.session.user=data;
      return {status:true,message:"successfully logged in",user:data};
    }
    else if (found && found.password!==md5(body.password)){
      return {status:false,message:"Incorrect Password"} ;
    }
    else{
      return {status:false,message:"User not registered"};
    }
  }
}

function getUserInfo(email){
  const found=registered_users.find(user=>user.email===email.toLowerCase());
  if(found){
    return {status:true,info:{name:found.name,email:found.email,uid:found.uid}};
  }
  else{
    return {status:false,info:{}};
  }
}

function isLoggedIn(req){
  var found=false;
  var user=null;
  if(req.session && req.session.user){
      found=true;
      user=req.session.user;
  }
  return {status:found,user:user};
}

function logout(req){
  if(req.session){
    let user=req.session.user;
    if(user){
      req.session.user=null;
      req.session.cookie.maxAge = -1;
      req.session.destroy();
      req.session = null;
      return {status:true,message:"User logged out successfully"}
    }else{
      return {status:false,message:"User was not logged in"}
    }
  }else{
    return {status:false,message:"User was not logged in"}
  }
}

function getAllUsers(){
  const users=[];
  for(var i=0;i<registered_users.length;i++){
    users.push(getUserInfo(registered_users[i].email).info);
  }
  return users;
}

function search(text){
  //Currently results will only have users
  const search_obj={users:[],articles:[],posts:[],videos:[]}
  const users=getAllUsers();
  for(var i=0;i<users.length;i++){
    if(users[i].name.toLowerCase().includes(text.toLowerCase())||users[i].uid.toLowerCase().includes(text.toLowerCase())){
      search_obj.users.push(users[i]);
    }
  }
  return search_obj;
}

function check_strength(password){
  var score= zxcvbn(password).score;
  if(score === 0){
    score+=0.5;
  }
  return {strength:score/4*100};
}
