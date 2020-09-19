const https = require('https');
const querystring = require('querystring');
const secrets = require('./secrets.js');
const fetch = require('node-fetch');
module.exports = {
  register: register,
  login: login,
  getUserInfo: getUserInfo,
  fetchPosts:fetchPosts,
  createTopic:createTopic,
  makePost:makePost,
  fetchGroups:fetchGroups,
  fetchGroup:fetchGroup
}

function TruncateUser(body) {
  this.name = body.name;
  this.username = body.username;
  if (body.avatar_template.includes('letter_avatar_proxy')) {
    if (this.name) {
      this.profilePic = 'https://ui-avatars.com/api/?rounded=true&name=' + this.name.split(' ').join('+'); //Default profile pic
    } else {
      this.profilePic = 'https://ui-avatars.com/api/?rounded=true&name=' + this.username.split(' ').join('+'); //Default profile pic
    }
  } else {
    this.profilePic = body.avatar_template;
  }
}

async function register(name, email, password, userName, identity) {
  const url = secrets.discourse_url + 'users';
  const options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  var data = {
    "name": name,
    "email": email,
    "password": password,
    "username": userName,
    "active": true,
    "approved": true,
    "user_fields[1]": identity
  };
  data = querystring.stringify(data);
  function doRequest(options, data) {
    return new Promise((resolve, reject) => {
      var request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
          var body = '';
          response.on('data', function(chunk) {
            body += chunk;
          });
          response.on('end', function() {
            var result = JSON.parse(body);
            if (result.success === true && result.active === true) {
              resolve(
                 {
                  status: true,
                  message: 'Successfuly Registered, Kindly Login'
                });
            } else {
              resolve({
                status: false,
                message: result.message
              });
            }
          });
          response.on('error', function() {

            resolve( {
              status: false,
              message: 'Error while registering, try again'
            });
          });
        } else {
          resolve({
            status: false,
            message: 'Error while registering, try again'
          });
        }
      });
      request.write(data);
      request.end();
    });
  }
return await doRequest(options,data);
}

async function login(req, userName, password) {
  const url = secrets.discourse_url + 'session/';
  var data = {
    'login': userName,
    'password': password,
    'second_factor_method': 1
  };
  data = JSON.stringify(data);
  const options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system',
      'Content-Type': 'application/json'
    },
    body: data
  };
  const response = await fetch(url, options);
  const status = await response.status;
  if (status === 200) {
    const result = await response.json();
    if (result.error === 'Incorrect username, email or password') {
      return {
        status: false,
        message: result.error
      }
    } else {
      const user = await SetCurrUserInfo(req, userName);
      if (user) {
        return {
          status: true,
          message: "successfully logged in",
          user: user
        };
      } else {
        console.log('error in session');
        return {
          status: true,
          message: "successfully logged in",
          user: user
        };
      }
    }
  } else {
    return {
      status: false,
      message: "User not registered"
    }
  }

}

async function SetCurrUserInfo(req, userName) {
  var url = secrets.discourse_url + 'users/' + userName + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const response = await fetch(url, options);
  const status = await response.status;
  if (status === 200) {
    const body = await response.json();
    req.session.user = new TruncateUser(body.user); //storing Basic user info
    return {
      user: req.session.user
    }
  } else {
    return {
      user: null
    }
  }
}

async function getUserInfo(userName, mode) {
  var url = secrets.discourse_url + 'users/' + userName + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const response = await fetch(url, options);
  const status = await response.status;
  if (status === 200) {
    const res = await response.json();
    if (mode === 1) {
      return {
        user: res.user
      }
    } else {
      const user = new TruncateUser(res.user);
      return {
        user: user
      }
    }
  } else {
    return {
      status: false,
      user: null
    }
  }
}
async function fetchPosts(url1,url2,url3) {
   var url = secrets.discourse_url+url1+'/'+url2+'/'+url3+'.json';
   var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const response=await fetch(url,options);
  const status=await response.status;
  if(status===200){
     const res=await response.json();
     const cat_id=res.category_id;
     const res1= await fetch(secrets.discourse_url+'categories.json',options);
     if(await res1.status===200){
       const result=await res1.json();
       const categories=result.category_list.categories;
       var category={};
       for(var i=0;i<categories.length;i++){
         if(categories[i].id===cat_id){
           category=categories[i];break;
         }
       }
       return {
         status:true,
         message:"Success",
         body:res,
         category:category,
         url:secrets.discourse_url
       }
     }else{
       return {
         status:true,
         message:"Success",
         body:res,
         category:{},
         url:secrets.discourse_url
       }
     }
  }
  else {
    return {
      status: false,
      message: "Failed to fetch post",
      body:null,
      category:{},
      url:secrets.discourse_url
    }
  }
}

async function createTopic(req) {
 // console.log(req.session);             //currently sending pvt_messages.
  var title = "new_topic_testing";
  var category = "14";          //read from req when passed from client
  var desc = "read from req when passed from client";
 // var user="G_N";
  var url = secrets.discourse_url + '/posts.json';
 var data = {
    "title": title,
    "raw": desc,
    "category": Number(category),
    'target_recipients': "gyaanTester99",//recepirnt here
    "archetype": "regular",

  };
  data=JSON.stringify(data);
  var options = {
    method: "POST",
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system',             //to be changed at delivery
      'Content-Type': 'application/json'
    },
    body:data
  };
  const response=await fetch(url,options);
  const status=await response.status;
  console.log(status);
  console.log(options);
  if(status===200){
   const result=await response.json();
   return result;

  }
  else{
    return{
      status: false,
      message: null
    }

  }
}

//posting inside topic
async function makePost(req){
  var topic_id = 3324;
  var raw = "testing some random testing texts Gyaan_init";          //read from req when passed from client
  var url = secrets.discourse_url + '/posts.json';
  var data={
    "topic_id": topic_id,
    "raw": raw,
   'target_recipients':'system',
    "archetype": "regular",
  };
data=JSON.stringify(data);
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system',             //to be changed at delivery
      'Content-Type': 'application/json'
    },
    body:data
  };

const response=await fetch(url,options);
  const status=await response.status;
  if(status===200){
   const result=await response.json();
   return result;

  }
  else{
    return{
      status: false,
      message: null
    }

  }

}

async function fetchGroups() {
  var body = '';
  var url1=secrets.discourse_url + 'latest.json';
  var url2 = secrets.discourse_url + 'categories.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const res1=await fetch(url1,options);
  const status1= await res1.status;
  if(status1===200){
    const result1=await res1.json();
    if(result1 && result1.topic_list && result1.topic_list.topics){
    var topics = result1.topic_list.topics;
    const res2=await fetch(url2,options);
    const status2= await res2.status;
    if(status2===200){
      const result2=await res2.json();
      var groups = [];
      groups = result2.category_list.categories;
      return {
        status:true,
        message: "success",
        topics: topics,
        groups:groups,
        url:secrets.discourse_url
        }
      }
    }
  }
  return {
    status:false,
    message:"error",
    topics: [],
    groups:[],
    url:secrets.discourse_url
  }
}

async function fetchGroup(topic,id) {
  var topic_head = '';
  var url = secrets.discourse_url + 'categories.json';
  var url3 = secrets.discourse_url + 'c/' + topic + "/" + id + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const res1= await fetch(url,options);
  const status1=await res1.status;
  if(status1===200){
    const result1=await res1.json();
    var list = result1.category_list.categories;
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === topic) {
        topic_head = list[i];
        break;
      }
    }
    const res2=await fetch(url3,options);
    const status2 = await res2.status;
    if(status2===200){
      const result2=await res2.json();
      return {
        status:true,
        message:'Success',
        topic_head:topic_head,
        body:result2,
        url:secrets.discourse_url
      }
    }
  }
  return {
    status:false,
    message:'Failed to fetch data',
    topic_head:'',
    body:'',
    url:secrets.discourse_url
  }
}
