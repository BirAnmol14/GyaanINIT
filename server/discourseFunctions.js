const https = require('https');
const querystring = require('querystring');
const secrets = require('./secrets.js');
const fetch = require('node-fetch');
module.exports = {
  register: register,
  login: login,
  getUserInfo: getUserInfo
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
