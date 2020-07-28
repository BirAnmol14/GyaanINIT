
  const login_endpoint='http://localhost:8080/api/account/login';
  const register_endpoint='http://localhost:8080/api/account/register';
  const logout_endpoint='http://localhost:8080/api/account/logout';
  const verifyLogin_endpoint="http://localhost:8080/api/account/verifyLoginStatus";
  module.exports={
    login: login_endpoint,
    register: register_endpoint,
    logout: logout_endpoint,
    loggedIn:verifyLogin_endpoint
   }
