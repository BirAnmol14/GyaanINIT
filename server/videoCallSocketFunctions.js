const func=require('./functions.js');
module.exports={
  removeFromCall:removeFromCall,
  getCallUserList:getCallUserList,
  getCallMessages:getCallMessages
}
async function removeFromCall(url,username){
  var callInfo=await func.getCallUserList(url);
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
        func.calls[i].users=func.calls[i].users.filter(user_name=>user_name!==username);
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
async function getCallUserList(url){
  return await func.getCallUserList(url);
}

async function getCallMessages(url){
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
      chatList.push({user: (await func.getUserInfo(chats[i].username)).info,message:chats[i].message,time:chats[i].time});
    }
    return {chats:chatList,status:true,message:"Successfully retrieved"}
  }else{
    return {chats:[],status:false,message:"Call not found"}
  }
}
