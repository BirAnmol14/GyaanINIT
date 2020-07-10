const express=require('express');
const app=express();
const parser=require('body-parser');
const https=require('https');
require('dotenv').config();

app.use(parser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT,(req,res)=>{
  console.log('Server Started on localhost: '+ process.env.PORT);
});

app.get('/',(req,res)=>{
  res.send('Server Running');
});
