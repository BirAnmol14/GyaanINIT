const https = require('https');
const querystring = require('querystring');
const md5=require('md5');
const zxcvbn=require('zxcvbn');
const discourseFunctions=require('./discourseFunctions.js');
const registered_users=[];//{email,name,username,password,profilePic}
const calls=[];//{url,password,admin_username,users(only usernames),chats}
//chats  -> [{username,message,time}]
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
  calls:calls,
  getDetailedUserInfo:getDetailedUserInfo
}

function User(name,email,password,username,identity){
  this.name=name;
  this.email=email.toLowerCase();
  this.password=password;
  this.username=username;
  this.identity=identity;
  this.profilePic='https://ui-avatars.com/api/?rounded=true&name='+this.name.split(' ').join('+');//Default profile pic
}

async function register_user(body){
  return await discourseFunctions.register(body.name,body.email,body.password,body.username,body.identity);
}

async function login(req,body){
  const present=isLoggedIn(req);
  if(present.status){
    return {status:true,message:'Already Logged In',user:present.user};
  }else{
    return await discourseFunctions.login(req,body.username,body.password);
  }
}

async function getUserInfo(username){
  const user=await discourseFunctions.getUserInfo(username,0);
  if (user){
    return {status:true, info:user.user}
  }else{
    return {status:false, info:null}
  }
}

async function getDetailedUserInfo(username){
  const user=await discourseFunctions.getUserInfo(username,1);
  if (user){
    return {status:true, info:user.user}
  }else{
    return {status:false, info:null}
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
  //to be re coded
  const users=[];
  for(var i=0;i<registered_users.length;i++){
    users.push(getUserInfo(registered_users[i].username).info);
  }
  return users;
}

function search(text){
  //Currently results will only have users
  const search_obj={users:[],articles:[],posts:[],videos:[]}
  const users=getAllUsers();
  for(var i=0;i<users.length;i++){
    if(users[i].name.toLowerCase().includes(text.toLowerCase())||users[i].username.toLowerCase().includes(text.toLowerCase())){
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

function generateCall(url,password,admin_username,req){
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
      calls.push({url:url,password:md5(password),admin_username:admin_username,users:[],chats:[]});
      return {status:true,url:url}
    }else{
      calls.push({url:url,password:md5(password),admin_username:admin_username,users:[],chats:[]});
      return {status:true,url:url}
    }
  }
  else{
    return {status:false,url:null}
  }
}

function joinCall(url,password,user_name,req){
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
        var arr=calls[index].users.filter((username)=>(username!==user_name));
        calls[index].users=arr;
        calls[index].users.push(user_name);
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

async function getCallUserList(url){
  var urlValid=false;
  var admin_username='';
  var users=[];
  for(var i=0;i<calls.length;i++){
    if(calls[i].url===url){
      urlValid=true;
      admin_username=calls[i].admin_username;
      for(var j=0;j<calls[i].users.length;j++){
        var temp=await getUserInfo(calls[i].users[j]);
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
    return {validUrl:urlValid,admin_username:admin_username,users:users};
}

async function endCall(req,callUrl){
  var callInfo=await getCallUserList(callUrl);
  if(callInfo.validUrl===true){
      var userList=callInfo.users;
      let currUser=req.session.user;
      if(!currUser){
        return {status:false,currUser:"User not logged in"}
      }
      var found=false;
      for(var j=0;j<userList.length;j++){
        if(userList[j].username===currUser.username){
          found=true;
          break;
        }
      }
      if(!found){
        return {status:false,message:'Current user not in this call'}
      }
    for(var i=0;i<calls.length;i++){
      if(calls[i].url===callUrl){
        calls[i].users=calls[i].users.filter(user_name=>user_name!==currUser.username);
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

async function verifyInCall(req,callUrl){
  var callInfo=await getCallUserList(callUrl);
  if(callInfo.validUrl===true){
    var userList=callInfo.users;
    let currUser=req.session.user;
    if(!currUser){
      return {status:false,message:"User not logged in"}
    }
    var found=false;
    for(var j=0;j<userList.length;j++){
      if(userList[j].username===currUser.username){
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

async function postMessageInCall(req,callUrl,message){
  var test=await verifyInCall(req,callUrl);
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
        calls[found].chats.push({username:user.username,message:message,time: new Date()});
        return {status:true, message:"Message Successfully Posted"}
      }
    }
  }
}

async function getCallChat(req,url){
  let test=await verifyInCall(req,url);
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
        chatList.push({user:await getUserInfo(chats[i].username).info,message:chats[i].message,time:chats[i].time});
      }
      return {status:true, message:"success",chats:chatList}
    }
  }
}
