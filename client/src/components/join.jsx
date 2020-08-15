import React from 'react';
import Navbar from './navbar.jsx';
import ServerRoutes from './ServerRoutes.js';
function Join(props){
  const [meetDetails,setDetails]=React.useState({meetUrl:'',meetPass:''});
  function detailsChange(event){
    const {name,value}=event.target;
    setDetails(prev=>{return({...prev,[name]:value})});
  }
  async function submitDetails(event){
    event.preventDefault();
    const body=JSON.stringify({meetUrl:meetDetails.meetUrl,password:meetDetails.meetPass,user_email:props.logged.user.email});
    const response=await fetch(ServerRoutes.joinCall,{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body:body
    });
    const status=await response.status;
    if(status === 200){
      const res=await response.json();
      if(res.status===true){
        alert(res.message);
        window.location.href=window.location.href.substr(0,window.location.href.indexOf(window.location.pathname))+'/videoCall/'+res.url;
      }else{
        alert(res.message);
      }
    }else{
      alert('Error: '+status+'\nTry Again');
    }
    setDetails({meetUrl:'',meetPass:''});
  }
  return(props.logged.status===true?
    <div>
    <Navbar  links={{active:{name:'Join Meet',url:'/join'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>

    <form onSubmit={submitDetails} style={{marginTop:'140px',backgroundColor:'#343A40',color:'white',padding:'2em',border:'solid 2px white',borderRadius:'10px'}}>
    <div className="row">
      <div className="col">
        <label htmlFor="meet-nick-name">Meet Nick Name</label>
        <input type="text" className="form-control" id='meet-nick-name' name='meetUrl' required value={meetDetails.meetUrl} onChange={detailsChange}/>
      </div>
      <div className="col">
        <label htmlFor="meet-pass">Meet password</label>
        <input type="password" className="form-control" id='meet-pass' name='meetPass' required value={meetDetails.meetPass} onChange={detailsChange}/>
      </div>
    </div>
    <div className="row">
      <div className='col'>
        <button type="submit" className="btn btn-danger" style={{marginTop:'1em',backgroundColor:'#007bff',borderColor:'white'}} name='join'>JOIN</button>
      </div>
    </div>
    </form>
    </div>
    :
    <div/>
  );
}

export default Join;
