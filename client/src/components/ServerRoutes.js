//jshint esversion:8
  const serverUrl='http://localhost:8080'
  const login_endpoint='/api/account/login';
  const register_endpoint='/api/account/register';
  const logout_endpoint='/api/account/logout';
  const verifyLogin_endpoint="/api/account/verifyLoginStatus";
  const search_endpoint="/api/tools/search";
  const password_strenght_endpoint="/api/tools/password_strength";
  const generate_meet_endpoint='/api/call/generateCall';
  const join_meet_endpoint='/api/call/joinCall';
  const getVideoCallUsers_endpoint='/api/tools/getCallUserList?url=';
  const endCall_Endpoint='/api/call/endCall';
  const verifyInCall_endpoint='/api/call/verifyUserInCall';
  const postCallMessage_endpoint='/api/call/postMessage';
  const getCallMessageList_endpoint='/api/call/getCallChat?url=';
  const socketVideoCall_Endpoint=serverUrl+'/api/videoCallSocket';
  module.exports={
    login: login_endpoint,
    register: register_endpoint,
    logout: logout_endpoint,
    loggedIn:verifyLogin_endpoint,
    search:search_endpoint,
    pass_strength:password_strenght_endpoint,
    generateCall:generate_meet_endpoint,
    joinCall:join_meet_endpoint,
    getVideoCallUsers:getVideoCallUsers_endpoint,
    endCall:endCall_Endpoint,
    verifyUserInCall:verifyInCall_endpoint,
    postChatMessage:postCallMessage_endpoint,
    getCallChat:getCallMessageList_endpoint,
    socketEndpoint:socketVideoCall_Endpoint
   }
