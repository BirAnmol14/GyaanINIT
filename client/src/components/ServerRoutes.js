//jshint esversion:8
  const login_endpoint='/api/account/login';
  const register_endpoint='/api/account/register';
  const logout_endpoint='/api/account/logout';
  const verifyLogin_endpoint="/api/account/verifyLoginStatus";
  const search_endpoint="/api/tools/search";
  const password_strenght_endpoint="/api/tools/password_strength";
  
  module.exports={
    login: login_endpoint,
    register: register_endpoint,
    logout: logout_endpoint,
    loggedIn:verifyLogin_endpoint,
    search:search_endpoint,
    pass_strength:password_strenght_endpoint
   }
