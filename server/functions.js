const https = require('https');
const querystring = require('querystring');
const md5=require('md5');
const zxcvbn=require('zxcvbn');

const registered_users=[];//{email,name,uid,password,profilePic}
const calls=[];//{url,password,admin_email,users(only emails),chats}
//chats  -> [{user_email,message,time}]
module.exports={
  register_user:register_user,
  login:login,
  getUserInfo:getUserInfo,
  isLoggedIn:isLoggedIn,
  logout:logout,
  getAllUsers:getAllUsers,
  search:search,
  check_strength:check_strength,
  generateCall:generateCall,
  joinCall:joinCall,
  getCallUserList:getCallUserList,
  endCall:endCall,
  verifyInCall:verifyInCall,
  postMessageInCall:postMessageInCall,
  getCallChat:getCallChat,
  calls:calls
}

function User(name,email,password){
  this.name=name;
  this.email=email.toLowerCase();
  this.password=md5(password);
  this.uid=this.email.split('@')[0];
  this.profilePic='https://ui-avatars.com/api/?rounded=true&name='+this.name.split(' ').join('+');//Default profile pic
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
    return {status:true,info:{name:found.name,email:found.email,uid:found.uid,profilePic:found.profilePic}};
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

function generateCall(url,password,admin_email,req){
  if(isLoggedIn(req).status===true){
    const found=calls.find(call=>call.url===url);
    var temp=url;
    if(found){
      var count=0;
      for(var i=0;i<calls.length;i++){
        if(calls[i].url===temp){
          count++;
          temp=url+count;
        }
      }
      url+=(count);
      calls.push({url:url,password:md5(password),admin_email:admin_email,users:[],chats:[]});
      return {status:true,url:url}
    }else{
      calls.push({url:url,password:md5(password),admin_email:admin_email,users:[],chats:[]});
      return {status:true,url:url}
    }
  }
  else{
    return {status:false,url:null}
  }
}

function joinCall(url,password,user_email,req){
  if(isLoggedIn(req).status===true){
    var index=-1;
    for(var i=0;i<calls.length;i++){
      if(calls[i].url===url){
        index=i;
        break;
      }
    }
    if(index===-1){
      return {status:false,url:null,message:'No such call found'}
    }else{
      if(calls[index].password===md5(password)){
        var arr=calls[index].users.filter((email)=>(email!=user_email));
        arr.push(user_email);
        calls[index].users=arr;
       // console.log(calls[index]);
       // calls[index].users.push(user_email);
        return {status:true,url:url,message:'Successfully Joined'}
      }else{
        return {status:false,url:url,message:'Incorrect Password'}
      }
    }
  }
  else{
    return {status:false,url:null,message:'You are not logged in'}
  }
}

function getCallUserList(url){
  var urlValid=false;
  var admin_email='';
  var users=[];
  for(var i=0;i<calls.length;i++){
    if(calls[i].url===url){
      urlValid=true;
      admin_email=calls[i].admin_email;
      //console.log(calls[i].users);
      for(var j=0;j<calls[i].users.length;j++){
        var temp=getUserInfo(calls[i].users[j]);
        if(temp.status===true){
          users.push(temp.info);
        }
      }
      break;
    }
  }
    if(users.length!==0){
      users.sort(function(a,b){return a.name.toLowerCase().localeCompare(b.name.toLowerCase())});
    }
    return {validUrl:urlValid,admin_email:admin_email,users:users};
}

function endCall(req,callUrl){
  var callInfo=getCallUserList(callUrl);
  if(callInfo.validUrl===true){
      var userList=callInfo.users;
      let currUser=req.session.user;
      if(!currUser){
        return {status:false,currUser:"User not logged in"}
      }
      var found=false;
      for(var j=0;j<userList.length;j++){
        if(userList[j].email===currUser.email){
          found=true;
          break;
        }
      }
      if(!found){
        return {status:false,message:'Current user not in this call'}
      }
    for(var i=0;i<calls.length;i++){
      if(calls[i].url===callUrl){
        calls[i].users=calls[i].users.filter(user_email=>user_email!==currUser.email);
        if(calls[i].users.length===0){
          calls[i].chats=[];
        }
        return {status:true,message:"User removed successfully from the call"}
      }
    }
    return {status:false,message:"No Such Call exists"}
  }else{
    return {status:false,message:"No Such Call exists"}
  }
}

function verifyInCall(req,callUrl){
  var callInfo=getCallUserList(callUrl);
  if(callInfo.validUrl===true){
    var userList=callInfo.users;
    let currUser=req.session.user;
    if(!currUser){
      return {status:false,message:"User not logged in"}
    }
    var found=false;
    for(var j=0;j<userList.length;j++){
      if(userList[j].email===currUser.email){
        found=true;
        break;
      }
    }
    if(found===false){
      return {status:false,message:'Current user not in this call'};
    }
    else{
      return {status:true,message:"User can access the call"};

    }
  }
  else{
    return {status:false,message:"No Such Call exists"};
  }
}

function postMessageInCall(req,callUrl,message){
  var test=verifyInCall(req,callUrl);
  if(test.status===false){
    return {status:false,message:test.message}
  }else{
    let user=req.session.user;
    if(!user){
      return {status:false,message:"User not Logged in"}
    }
    else{
      var found=-1;
      for(var i=0;i<calls.length;i++){
        if(calls[i].url===callUrl){
          found=i;
          break;
        }
      }
      if(found===-1){
        return {status:false,message:"No Such Call exists"}
      }else{
        calls[found].chats.push({user_email:user.email,message:message,time: new Date()});
        return {status:true, message:"Message Successfully Posted"}
      }
    }
  }
}

function getCallChat(req,url){
  let test=verifyInCall(req,url);
  if(test.status===false){
    return {status:false,chats:[],message:test.message}
  }
  else{
    var found=-1;
    for(var i=0;i<calls.length;i++){
      if(calls[i].url===url){
        found=i;
        break;
      }
    }
    if(found===-1){
      return {status:false,chats:[],message:"No Such Call exists"}
    }else{
      var chats=calls[found].chats;
      chats.sort(function (a,b){return a.time.getTime()-b.time.getTime()});
      var chatList=[]
      for(var i=0;i<chats.length;i++){
        chatList.push({user:getUserInfo(chats[i].user_email).info,message:chats[i].message,time:chats[i].time});
      }
      return {status:true, message:"success",chats:chatList}
    }
  }
}
