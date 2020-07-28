import React from 'react';
import ServerRoutes from './ServerRoutes.js';

function Join(){
  async function logout(event){
    let body=sessionStorage.getItem('gyaan-session');
    alert(body);
    const response=await fetch(ServerRoutes.logout,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
        alert(res.message);
        sessionStorage.removeItem('gyaan-session');
        window.location.href='/';
      }else{
          alert(JSON.stringify(res));
      }
    }else{
      alert('Error '+status);
    }
  }
  return(<div>
  <h1>Join Meet</h1>
  <button onClick={logout}>Logout</button>
    </div>);
}

export default Join;
