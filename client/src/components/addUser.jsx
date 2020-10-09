import React from 'react';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import ServerRoutes from './ServerRoutes.js';
function AddUsers(props){
  const [search, setSearch] = React.useState({ text: '' });
  const [search_results,setResults]=React.useState(null);
  const [url,setUrl]=React.useState(null);
  const [user,setUser]=React.useState(null);
  const [showAll,setShowAll]=React.useState(false);
  function changeSearch(event) {
    setSearch({ text: event.target.value });
  }
  React.useEffect(()=>{
    if(search.text.length>0){
      async function runner(){
        await fetchResults();
      }
      runner();
    }else{
      setResults(null);
    }
  },[search.text.length]);
  async function fetchResults(){
    const url=ServerRoutes.search+"?find="+search.text;
    const response=await fetch(url,{
      method:'GET',
      credentials:'include'
    });
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      setResults(res);//Actually sets the state, can be tested by using react dev tools and viewing state of navbar
      setUrl(res.url);
    }else{
      alert('Error Occurred '+ status);
    }
  }
  React.useEffect(()=>{
    if(user!==null){
      props.addParticipant(user);
    }
  },[user]);
  return(
  <div style={{marginTop:'20px',marginBottom:'20px'}}>
        <form className="form-inline my-2 my-lg-0" onSubmit={()=>{return}}>
        <div className="dropdown">
        <input className="form-control mr-sm-2" type="search" placeholder="Add users" aria-label="Search" value={search.text} onChange={changeSearch} aria-haspopup="true"/>
            {search_results&&search_results.users&&search_results.groups?<div className="dropdown-menu" aria-labelledby="Search" style={search_results.users.length>0||search_results.groups.length>0?{display:"block",maxWidth:'180%'}:{display:"none"}}>
              {
                search_results.users&&search_results.users.length>0?<div><h6 className="dropdown-header">Users</h6>
                  {
                    search_results.users.map((user,index)=>{
                      return (<div key={user.username} id={user.username} onClick={()=>{setUser(user);setSearch({text:''});}} className="dropdown-item">{user.avatar_template?<img style={{height:'20px',width:'20px',borderRadius:'100px',marginRight:'3px'}} src={search_results.url.substring(0,search_results.url.length-1)+user.avatar_template.replace('{size}','40')} alt="user img"/>:null}{user.name} (@{user.username})</div>);
                    })
                  }

                <div className="dropdown-divider"></div>
                </div>:null
              }
            </div>:null}
        </div>
      </form>
      <div className="row">
      <div ClassName="col">
      <div className="card-deck" style={{marginLeft:"15px"}}>
      {props.participants&&url?props.participants.map((user,index)=>{return(index<5||showAll?<div className="card" style={{height:"25em",width: "15em",marginLeft:'0px',color:'black',zIndex:5,boxShadow:'10px 15px black'}}>
      <div className="card-header bg-transparent"><button type="button" className="close" onClick={()=>{props.removeParticipant(index)}} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button></div>
      {user.avatar_template?<img className="card-img-top" style={{height:'50px',width:'50px',margin:'0px'}} src={url.substring(0,url.length-1)+user.avatar_template.replace('{size}','40')} alt="user img"/>:null}
        <div className="card-body" style={{padding:'0px'}}>
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">@{user.username}</p>
          <a href={"/u/"+user.username} target="_blank" className="btn btn-primary"><CallMadeIcon style={{display: "inline", verticalAlign: "middle"}}/></a>
        </div>
      </div>:null);}):null}
      {props.participants.length>5?<div className="card" style={{height:"25em",width: "15em",marginLeft:'0px',color:'black',zIndex:5,boxShadow:'10px 15px black'}}>
        <div className="card-body" style={{padding:'0px',alignSelf:'center'}}>
          <div style={{verticalAlign:'middle'}}>{!showAll?<h5 className="card-title">+{props.participants.length-5} more</h5>:<h5 className="card-title">See Less</h5> }{!showAll?<button type="button" className="btn btn-primary" onClick={()=>{setShowAll(true)}}><CallMadeIcon style={{display: "inline", verticalAlign: "middle"}}/>View All</button>:<button type="button" className="btn btn-primary" onClick={()=>{setShowAll(false)}}><CallReceivedIcon style={{display: "inline", verticalAlign: "middle"}}/>Minimize</button>}</div>
        </div>
      </div>:null}
      </div>
      </div>
      </div>
    </div>
  );
}
export default  AddUsers;
