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
  fetchGroup:fetchGroup,
  fetchCategories:fetchCategories,
  search:search,
  fetchBadges:fetchBadges,
  createPrivateTopic:createPrivateTopic,
  makePrivatePost:makePrivatePost,
  createTopicForCall:createTopicForCall,
  postToTopic:postToTopic
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
    //console.log(res.user.id);
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
  let user=req.session.user;
  if(!user){
    return{
      status: false,
      message: 'Kindly Login'
    }
  }
  var title = req.body.title;
  var category = req.body.categoryId;
  var desc = req.body.description;
  var url = secrets.discourse_url + '/posts.json';
  var data = {
    "title": title,
    "raw": desc,
    "category": Number(category),
    "archetype": "regular",
  };
  data=JSON.stringify(data);
  var options = {
    method: "POST",
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': user.username,
      'Content-Type': 'application/json'
    },
    body:data
  };
  const response=await fetch(url,options);
  const status=await response.status;
  if(status===200){
   const result=await response.json();
   return {
     status: true,
     message: 'Topic Created successfully',
     topic_id:result.topic_id,
     topic_slug:result.topic_slug
   };
  }
  else{
    return{
      status: false,
      message: 'Failed to create Topic'
    }

  }
}


async function createPrivateTopic(req) {
  let user=req.session.user;
  if(!user){
    return{
      status: false,
      message: 'Kindly Login'
    }
  }
  var title = req.body.title;
  var desc = req.body.message;
  var target= req.body.otherUser;
  var url = secrets.discourse_url + '/posts.json';
  var data = {
    "title": title,
    "raw": desc,
    "target_recipients":target,
    "archetype": "private_message",
  };
  data=JSON.stringify(data);
  var options = {
    method: "POST",
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': user.username,
      'Content-Type': 'application/json'
    },
    body:data
  };
  const response=await fetch(url,options);
  const status=await response.status;
  if(status===200){
   const result=await response.json();
   return {
     status: true,
     message: 'Topic Created successfully'
   };
  }
  else{
    return{
      status: false,
      message: 'Failed to create Topic'
    }

  }
}

//posting inside topic
async function makePost(req){
  let user=req.session.user;
  if(!user){
    return{
      status: false,
      message: 'Kindly Login'
    }
  }
  var topic_id = Number(req.body.topicId);
  var raw = req.body.description;      //read from req when passed from client
  var url = secrets.discourse_url + '/posts.json';
  var data={
    "topic_id": topic_id,
    "raw": raw,
    "archetype": "regular"
  };
data=JSON.stringify(data);
  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': user.username,             //to be changed at delivery
      'Content-Type': 'application/json'
    },
    body:data
  };

const response=await fetch(url,options);
  const status=await response.status;
  if(status===200){
   const result=await response.json();
   return {
     status: true,
     message: "Successfully posted"
   };

  }
  else{
    return{
      status: false,
      message: 'Failed to post'
    }
  }
}

async function makePrivatePost(req){
  let user=req.session.user;
  if(!user){
    return{
      status: false,
      message: 'Kindly Login'
    }
  }
  var topic_id = Number(req.body.topicId);
  var raw = req.body.message;      //read from req when passed from client
  var target= req.body.otherUser;
  var url = secrets.discourse_url + '/posts.json';
  var data={
    "topic_id": topic_id,
    "raw": raw,
    "target_recipients":target,
    "archetype": "regular"
  };
data=JSON.stringify(data);

  var options = {
    method: 'POST',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': user.username,
      'Content-Type': 'application/json'
    },
    body:data
  };

const response=await fetch(url,options);
  const status=await response.status;

  if(status===200){
   const result=await response.json();

   return {
     status: true,
     message: "Successfully posted"
   };

  }
  else{
    return{
      status: false,
      message: 'Failed to post'
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

async function fetchCategories(){
    var url = secrets.discourse_url + 'categories.json';
    var options = {
      method: 'GET',
      headers: {
        'Api-Key': secrets.discourse_key,
        'Api-Username': 'system'
      }
    };
    const res=await fetch(url,options);
    if(await res.status === 200){
      const data=await res.json();
      return {
        status:true,message:"success",categories:data.category_list.categories
      }
    }else{
      return {
        status:false,message:"failed to fetch categories",categories:[]
      }
    }
}

async function search(text){
  var url = secrets.discourse_url + "/search/query?term=" + text + "&include_blurbs=true";
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Discourse-Visible': true,
      'DNT': 1,
      'Referer': secrets.url,
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Mobile Safari/537.36',
      'X-CSRF-Token': 'undefined',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  const res=await fetch(url,options);
  if(await res.status===200){
    const result=await res.json();
    if(result.grouped_search_result){
      return {
        users: result.users,
        posts: result.posts,
        groups: result.categories,
        topics: result.topics,
        url:secrets.discourse_url
      }
    }
  }
  return {
    users: [],
    posts: [],
    groups: [],
    topics: [],
    url:secrets.discourse_url
  }
}

async function fetchBadges(username){
  var url = secrets.discourse_url + 'user-badges/' +username + '.json';
  var options = {
    method: 'GET',
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system'
    }
  };
  const res=await fetch(url,options);
  if(await res.status===200){
    const result=await res.json();
    return {status:true,badges:result.badges}
  }else{
    return {status:false,badges:[]}
  }
}

async function createTopicForCall(url, password, admin_name,category,categoryName,details,public,members,req){
  let user=req.session.user;
  if(!user){
    return{
      status: false,
      message: 'Kindly Login'
    }
  }
    var url1 = secrets.discourse_url + '/posts.json';
  if(!public){
    var title1 = "Invite for Meet by "+admin_name+", created on "+new Date().toLocaleDateString();
    var desc2=  "Meet Nickname: "+url;
    desc2+="\nMeet Password: "+password;
    desc2+="\n<a href='/join?url="+url+"&pass="+password+"'>Link</a>"
    desc2+="\nMeet Details: "+details;
    desc2+="\nMeet Category: "+categoryName;
    var target=user.username+',';
    for(var i=0;i<members.length;i++){
      target+=members[i]+",";
    }
    var data2 = {
      "title": title1,
      "raw": desc2,
      "target_recipients":target,
      "archetype": "private_message",
    };
    data2=JSON.stringify(data2);
    var options2 = {
      method: "POST",
      headers: {
        'Api-Key': secrets.discourse_key,
        'Api-Username': 'system',
        'Content-Type': 'application/json'
      },
      body:data2
    };
    //console.log(data2);
    const response2=await fetch(url1,options2);
    const status2=await response2.status;
    if(status2===200){
      const result2=await response2.json();
      //console.log(result2);
      return {
        status: true,
        message: 'Topic Created successfully',
        topic_id:result2.topic_id,
        topic_slug:result2.topic_slug
      };
     }
     else{
       return{
         status: false,
         message: 'Failed to create Topic'
       }
     }
   }
  if(public){
  var title = "Meet-"+url+" by "+admin_name+", created on "+new Date().toLocaleDateString();
  var desc = "Meet Nickname: "+url;
  desc+="\nMeet Password: "+password;
  desc+="\n<a href='/join?url="+url+"&pass="+password+"'>Link</a>"
  desc+="\nMeet Details: "+details;
  desc+="\nMeet Category: "+categoryName;

  var data = {
    "title": title,
    "raw": desc,
    "category":Number(category),
    "archetype": "regular",
  };
  data=JSON.stringify(data);
  var options = {
    method: "POST",
    headers: {
      'Api-Key': secrets.discourse_key,
      'Api-Username': 'system',
      'Content-Type': 'application/json'
    },
    body:data
  };
  const response=await fetch(url1,options);
  const status=await response.status;
  if(status===200){
   const result=await response.json();
   return {
     status: true,
     message: 'Topic Created successfully',
     topic_id:result.topic_id,
     topic_slug:result.topic_slug
   };
  }
  else{
    return{
      status: false,
      message: 'Failed to create Topic'
    }
  }
}
}
async function postToTopic(call,username,message){
  if(call.public){
    var topic_id = Number(call.topic_id);
    var raw = message;
    var url = secrets.discourse_url + '/posts.json';
    var data={
      "topic_id": topic_id,
      "raw": raw,
      "archetype": "regular"
    };
  data=JSON.stringify(data);
    var options = {
      method: 'POST',
      headers: {
        'Api-Key': secrets.discourse_key,
        'Api-Username': username,
        'Content-Type': 'application/json'
      },
      body:data
    };

  const response=await fetch(url,options);
    const status=await response.status;
    if(status===200){
     const result=await response.json();
    }
  }else{
    var topic_id = Number(call.topic_id);
    var raw = message;
    var target= username+",";
    for(var i=0;i<call.members.length;i++){
      target+=call.members[i]+",";
    }
    var url = secrets.discourse_url + '/posts.json';
    var data={
      "topic_id": topic_id,
      "raw": raw,
      "target_recipients":target,
      "archetype": "regular"
    };
  data=JSON.stringify(data);

    var options = {
      method: 'POST',
      headers: {
        'Api-Key': secrets.discourse_key,
        'Api-Username': username,
        'Content-Type': 'application/json'
      },
      body:data
    };

  const response=await fetch(url,options);
    const status=await response.status;
    if(status===200){
     const result=await response.json();
   }
  }
}
