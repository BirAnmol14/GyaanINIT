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

app.get('/api/account/verifyLoginStatus',(req,res)=>{
  res.json(func.isLoggedIn(req));
});


app.get('/api/users/getAllUsers',(req,res)=>{
    res.json(func.getAllUsers());
});

app.get('/api/account/logout', (req,res)=>{
  res.json(func.logout(req));
});

app.get('/api/tools/search',(req,res)=>{
  if(req.query && req.query.find){
    res.json(func.search(req.query.find));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.get('/api/tools/getCallUserList',async (req,res)=>{
  if(req.query.url){res.json(await func.getCallUserList(req.query.url));}
  else{
    res.statusCode=400;
    res.json({message:'bad query, url query parameter missing in url'});
  }
});

app.get('/api/call/getCallChat',async (req,res)=>{
  if(req.query.url){res.json(await func.getCallChat(req,req.query.url));}
  else{
    res.statusCode=400;
    res.json({message:'bad query, url query parameter missing in url'});
  }
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

app.post('/api/call/generateCall',(req,res)=>{
  if(req.body && req.body.meetUrl && req.body.password && req.body.admin_username){
    res.json(func.generateCall(req.body.meetUrl,req.body.password,req.body.admin_username,req));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/joinCall',(req,res)=>{
  if(req.body && req.body.meetUrl && req.body.password && req.body.user_name){
    res.json(func.joinCall(req.body.meetUrl,req.body.password,req.body.user_name,req));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/endCall',async (req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(await func.endCall(req,req.body.callUrl));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/verifyUserInCall',async (req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(await func.verifyInCall(req,req.body.callUrl));
  }else{
    res.status(400).send('Bad Query');
  }
});

app.post('/api/call/postMessage',async (req,res)=>{
  if(req.body && req.body.callUrl){
    res.json(await func.postMessageInCall(req,req.body.callUrl,req.body.message));
  }else{
    res.status(400).send('Bad Query');
  }
});


//Socket namespace for videoCall
var map=new Map();
var nsp = io.of('/api/videoCallSocket');
nsp.on('connection', function(socket) {
   socket.on('join',async (object)=>{
     map.set(socket.id,object);
     socket.join(object.callUrl);
     nsp.to(object.callUrl).emit('userList',await videoCallFunc.getCallUserList(object.callUrl));
     socket.emit('chatList',await videoCallFunc.getCallMessages(object.callUrl));
     socket.broadcast.to(object.callUrl).emit('join',{message:(await func.getUserInfo(object.user)).info.name+" has joined"});
   });
   socket.on('messagePosted',async ()=>{
     var obj=map.get(socket.id);
     nsp.to(obj.callUrl).emit('chatList',videoCallFunc.getCallMessages(obj.callUrl));
   });
   socket.on('disconnect',async ()=>{
     var obj=map.get(socket.id);
     if(obj){
       videoCallFunc.removeFromCall(obj.callUrl,obj.user);
       nsp.to(obj.callUrl).emit('userList',videoCallFunc.getCallUserList(obj.callUrl));
       nsp.to(obj.callUrl).emit('left',{message:(await func.getUserInfo(obj.user)).info.name+" has left"});
   }
     map.delete(socket.id);
   })
});
