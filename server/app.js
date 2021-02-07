const express=require('express');
const app=express();
const parser=require('body-parser');
const https=require('https');
const secrets=require('./secrets.js');
const func=require('./functions.js');
const videoCallFunc=require('./videoCallSocketFunctions.js');
const session = require('express-session');
const { verify } = require('crypto');
const socketIo = require("socket.io");
const server =require('http').createServer(app);
const io = socketIo(server);
const {spawn} = require('child_process');
require('dotenv').config();

app.use(express.json());
app.use(parser.urlencoded({
  extended: true
}));

app.use(session({
  secret: secrets.string,
  resave: false,
  saveUninitialized: false,
  //Remeber to initialise a session store
  cookie: {
    maxAge:24*60*60*1000,
    httpOnly:true,
    secure:false //Make true once https compliant
  }
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.REACT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials" , true);
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS");
  next();
});

server.listen(process.env.PORT,(req,res)=>{
  console.log('Server Started on localhost: '+ process.env.PORT);
});

//GET requests
app.get('/api/',(req,res)=>{
  res.send('Server Running');
});

app.get('/api/users/getinfo',async (req,res)=>{
  if(req.query.username){
    if(req.query.short){
      res.json(await func.getUserInfo(req.query.username));
    }else{
        res.json(await func.getDetailedUserInfo(req.query.username));
    }
  }
  else{
    res.statusCode=400;
    res.json({message:'bad query, email query missing in url'});
  }
});

app.get('/api/users/getBadges',async (req,res)=>{
  if(req.query.username){
    res.json(await func.getBadges(req.query.username));
  }
  else{
    res.statusCode=400;
    res.json({message:'bad query, email query missing in url'});
  }
});
app.get('/api/account/verifyLoginStatus',(req,res)=>{
  res.json(func.isLoggedIn(req));
});


app.get('/api/users/getAllUsers',(req,res)=>{
    res.json(func.getAllUsers());
});

app.get('/api/account/logout', (req,res)=>{
  res.json(func.logout(req));
});

app.get('/api/tools/search',async (req,res)=>{
  if(req.query && req.query.find){
    res.json(await func.search(req.query.find));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.get('/api/tools/getCallUserList',(req,res)=>{
  if(req.query.url){res.json(func.getCallUserList(req.query.url));}
  else{
    res.statusCode=400;
    res.json({message:'bad query, url query parameter missing in url'});
  }
});

app.get('/api/call/getCallChat',(req,res)=>{
  if(req.query.url){res.json(func.getCallChat(req,req.query.url));}
  else{
    res.statusCode=400;
    res.json({message:'bad query, url query parameter missing in url'});
  }
});
 ////////
  //////
  /////
  //////
  ///////
app.get('/api/groups',async (req,res)=>{
  res.json(await func.getGroups());
});

app.get("/api/groups/group/:topic/:id", async  (req, res)=> {
  var topic = req.params.topic;
  var id = req.params.id;
  res.json(await func.getGroup(topic,id));
});
app.get('/api/categories.json',async(req,res)=>{
  res.json(await func.getCategories());
})
app.get('/api/posts/:url1/:url2/:url3', async (req, res)=> {
  res.json( await func.getPosts(req.params.url1,req.params.url2,req.params.url3));
});


//POST requests
app.post('/api/account/register',async (req,res)=>{
  res.json(await func.register_user(req.body));
});

app.post('/api/account/login',async (req,res)=>{
  res.json(await func.login(req,req.body));
});

app.post('/api/tools/password_strength',(req,res)=>{
      if(req.body && req.body.password){
        res.json(func.check_strength(req.body.password));
      }else if(req.body && req.body.password===''){
        res.json({strength:0})
      }
      else{
        res.status(400).send('Bad Query');
      }
});

app.post('/api/call/generateCall',async (req,res)=>{
  if(req.body && req.body.meetUrl && req.body.password && req.body.admin_username && req.body.category && req.body.details  && req.body.members){
    res.json(await func.generateCall(req.body.meetUrl,req.body.password,req.body.admin_username,req.body.category, req.body.details, req.body.public,req.body.members,req));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/joinCall',async (req,res)=>{
  if(req.body && req.body.meetUrl && req.body.password && req.body.user_name){
    res.json(await func.joinCall(req.body.meetUrl,req.body.password,req.body.user_name,req));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/endCall', (req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(func.endCall(req,req.body.callUrl));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/verifyUserInCall',(req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(func.verifyInCall(req,req.body.callUrl));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/postMessage',(req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(func.postMessageInCall(req,req.body.callUrl,req.body.message));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/create/topic/', async (req, res)=> {
 res.json(await func.createTopic(req));
});
app.post('/api/create/topic/privateMessage', async (req, res)=> {
 res.json(await func.createPrivateTopic(req));
});
app.post('/api/makepost/', async (req, res)=> {
 res.json(await func.makePost(req, res));
});
app.post('/api/makepost/privateMessage', async (req, res)=> {
 res.json(await func.makePrivatePost(req, res));
});

//Socket namespace for videoCall
var map=new Map();
var map2=new Map();
var videos=[];
var nsp = io.of('/api/videoCallSocket');
nsp.on('connection', function(socket) {
   socket.on('join',(object)=>{
     map.set(socket.id,object);
     map2.set(object.user.username,socket.id);
     socket.join(object.callUrl);
     nsp.to(object.callUrl).emit('userList',videoCallFunc.getCallUserList(object.callUrl));
     nsp.to(object.callUrl).emit('incomingStream',{videos:videos});
     socket.emit('chatList',videoCallFunc.getCallMessages(object.callUrl));
     socket.broadcast.to(object.callUrl).emit('join',{message:object.user.name+" has joined"});
   });
   socket.on('messagePosted',()=>{
     var obj=map.get(socket.id);
     nsp.to(obj.callUrl).emit('chatList',videoCallFunc.getCallMessages(obj.callUrl));
   });
   socket.on('getPrivateMessage',(object)=>{
     socket.emit('getPrivateMessage',[]);
   });
   socket.on('sendPrivateMessage',(object)=>{
     let user2=object.to;
     let socketId=map2.get(user2.username);
     if(socketId){
        var messageObj={user:map.get(socket.id).user,message:object.message,time:new Date()}
        nsp.to(socketId).emit('getPrivateMessage',messageObj);
     }
   });
   socket.on('streamVideo',(object)=>{
     var obj=map.get(socket.id);
     videos.push({id:obj.user.username,name:obj.user.name,videoObj:object.videoObj});
     nsp.to(obj.callUrl).emit('incomingStream',{videos:videos});
   });
   socket.on('removeStream',()=>{
     var obj=map.get(socket.id);
     var videos1=videos.filter((video)=>video.id!==obj.user.username);
     videos=videos1;
     nsp.to(obj.callUrl).emit('incomingStream',{videos:videos1});
   });
   socket.on('disconnect',()=>{
     var obj=map.get(socket.id);
     if(obj){
       videoCallFunc.removeFromCall(obj.callUrl,obj.user.username);
       nsp.to(obj.callUrl).emit('userList',videoCallFunc.getCallUserList(obj.callUrl));
       nsp.to(obj.callUrl).emit('left',{message:obj.user.name+" has left"});
       map2.delete(obj.username);
   }
     map.delete(socket.id);
   })
});


var vmap=new Map();
var vmap1=new Map();
var ids=[];
var socketToPeer=new Map();
var nsp2=io.of('/api/videoCalls');
nsp2.on('connection', function(socket) {
  socket.on('join',(info)=>{
    vmap.set(socket.id,info);
    vmap1.set(info.user.username,socket.id);
    socket.join(info.callUrl);
  });
  socket.on('setId',(peer)=>{
    var info=vmap.get(socket.id);
    ids.push({socketId:socket.id,peerId:peer.peerId,userDetails:info.user});
    socketToPeer.set(socket.id,peer.peerId);
    nsp2.to(info.callUrl).emit('peer-list',{peers:ids});
    socket.broadcast.to(info.callUrl).emit('newUser',{peerId:peer.peerId});
  });
  socket.on('removeMyVideo',()=>{
    var object=vmap.get(socket.id);
    if(object){
      socket.broadcast.to(object.callUrl).emit('removeVideo',{socketId:socket.id,peerId:socketToPeer.get(socket.id)});
    }
  })
  socket.on('disconnect',()=>{
    var obj=vmap.get(socket.id);
    if(obj){
      ids=ids.filter(obj=>obj.socketId!==socket.id);
      nsp2.to(obj.callUrl).emit('peer-list',{peers:ids});
      socket.broadcast.to(obj.callUrl).emit('removeVideo',{socketId:socket.id,peerId:socketToPeer.get(socket.id)});
      vmap1.delete(obj.username);
      socketToPeer.delete(socket.id);
  }
    vmap.delete(socket.id);
  });
});

app.get('/api/download/:id',(req,res)=>{
	const id = req.params.id;
  if(id === null){
    res.status(400).send('Bad Query');
  }else{
    const file = `${__dirname}/`+'/Recordings/'+id;
    if(file){
      res.download(file);
    }else{
      res.status(404).send('File not found');
    }
  }
});

app.get('/api/record/',(req,res)=>{
	//This will be a function triigered once the bbb returns the recording link
  const python = spawn('python', ['logic.py','https://webinar.hbcse.tifr.res.in/recording/screenshare/1152c519a8b66332d287de7e22763f2ff631e28e-1597667170186/']);
  var dataToSend;
  python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
});
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  res.json({src:dataToSend.trim()});
  //Better will be to post the src via a system message in thread related to meet and on UI, link to /api/download/src
});
});
