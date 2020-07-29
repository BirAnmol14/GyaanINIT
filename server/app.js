const express=require('express');
const app=express();
const parser=require('body-parser');
const https=require('https');
const secrets=require('./secrets.js');
const func=require('./functions.js');
const session = require('express-session');
require('dotenv').config();

app.use(parser.json());
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

app.listen(process.env.PORT,(req,res)=>{
  console.log('Server Started on localhost: '+ process.env.PORT);
});

//GET requests
app.get('/api/',(req,res)=>{
  res.send('Server Running');
});

app.get('/api/users/getinfo',(req,res)=>{
  if(req.query.email){res.json(func.getUserInfo(req.query.email));}
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

app.get('/api/account/logout',(req,res)=>{
  res.json(func.logout(req));
});

//POST requests
app.post('/api/account/register',(req,res)=>{
  func.register_user(req.body,res);
});

app.post('/api/account/login',(req,res)=>{
  res.json(func.login(req,req.body,res));
});
