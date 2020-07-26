const express=require('express');
const app=express();
const parser=require('body-parser');
const https=require('https');
const func=require('./functions.js');
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
  func.login(req.body,res);
});

app.get('/getinfo',(req,res)=>{
  if(req.query.email){func.getUserInfo(req.query.email,res);}
  else{
    res.statusCode=400;
    res.json({message:'bad query, email query missing in url'});
  }

});
