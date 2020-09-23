const func=require('./functions.js');

module.exports={
  removeFromCall:removeFromCall,
  getCallUserList:getCallUserList,
  getCallMessages:getCallMessages,
  postMessage:postMessage
}
function removeFromCall(url,username){
  var callInfo=func.getCallUserList(url);
  if(callInfo.validUrl===true){
      var userList=callInfo.users;
      var found=false;
      for(var j=0;j<userList.length;j++){
        if(userList[j].username===username){
          found=true;
          break;
        }
      }
      if(!found){
        return {status:false,message:'Current user not in this call'}
      }
    for(var i=0;i<func.calls.length;i++){
      if(func.calls[i].url===url){
        func.calls[i].users=func.calls[i].users.filter(user=>user.username!==username);
        if(func.calls[i].users.length===0){
          func.calls[i].chats=[];
        }
        return {status:true,message:"User removed successfully from the call"}
      }
    }
    return {status:false,message:"No Such Call exists"}
  }else{
    return {status:false,message:"No Such Call exists"}
  }
}
function getCallUserList(url){
  return func.getCallUserList(url);
}

function getCallMessages(url){
  var calls=func.calls;

  var found=-1;
  for(var i=0;i<calls.length;i++){
    if(calls[i].url===url){
      found=i;break;
    }
  }
  if(found!==-1){
    var chats=calls[found].chats;
    chats.sort(function (a,b){return a.time.getTime()-b.time.getTime()});
    var chatList=[]
    for(var i=0;i<chats.length;i++){
      chatList.push({user: chats[i].user,message:chats[i].message,time:chats[i].time});
    }
    return {chats:chatList,status:true,message:"Successfully retrieved"}
  }else{
    return {chats:[],status:false,message:"Call not found"}
  }
}
function postMessage(callUrl,user,message){
  var calls=func.calls;

  var found=-1;
  for(var i=0;i<calls.length;i++){
    if(calls[i].url===callUrl){
      found=i;break;
    }
  }
  if(found!==-1){
    func.calls[found].chats.push({user:user,message:message,time:new Date()});
    return {
      status: true,
      message: "Message Successfully Posted"
    }

  }else{
    return {
      status: false,
      message: "No such call exists"
    }
  }
}
