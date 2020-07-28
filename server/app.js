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


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.REACT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT,(req,res)=>{
  console.log('Server Started on localhost: '+ process.env.PORT);
});

app.get('/',(req,res)=>{
  res.send('Server Running');
});

app.post('/register',(req,res)=>{
  func.register_user(req.body,res);
});

app.post('/login',(req,res)=>{
  res.json(func.login(req.body,res));
});

app.get('/getinfo',(req,res)=>{
  if(req.query.email){res.json(func.getUserInfo(req.query.email));}
  else{
    res.statusCode=400;
    res.json({message:'bad query, email query missing in url'});
  }
});

app.post('/verifyLoginStatus',(req,res)=>{
  if(req.body && req.body.email){
    res.json(func.isLoggedIn(req.body.email));
  }else{
    res.status(400).json('Bad query');
  }
});

app.post('/logout',(req,res)=>{
  if(req.body && req.body.email){
    res.json(func.logout(req.body.email));
  }else{
    res.status(400).json('Bad query');
  }
});
