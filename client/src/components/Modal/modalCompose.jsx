import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ServerRoutes from '../ServerRoutes.js';
function ModalCompose(props){
  const [search, setSearch] = React.useState({ text: '' });
  const [search_results,setResults]=React.useState(null);
  const [otherUser,setOtherUser]=React.useState(null);
  const [url,setUrl]=React.useState(null);
  const [postData,setPostData]=React.useState({title:"",message:""});
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
  function changePostData(event){
    const {value,name}=event.target;
    setPostData(prev=>{return({...prev,[name]:value})});
  }
  async function postPvtMessage(event){
    event.preventDefault();
    if(!otherUser){
      alert('Please select a valid user');
      return;
    }
    var body=postData;
    body.otherUser=otherUser.username;
    body=JSON.stringify(body);
    const response=await fetch(ServerRoutes.createPrivateTopic,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    });
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
        alert(res.message);
        window.location.reload();
      }else{
        alert(res.message);
      }
    }else{
      alert('Error '+status);
    }
    setPostData({title:"",message:""});
    setOtherUser(props.otherUser);
  }
  React.useEffect(()=>{
    if(otherUser){
      setSearch({text:''});
    }
  },[otherUser]);
  React.useEffect(()=>{
    setOtherUser(props.otherUser);
    setUrl(props.url);
  },[]);
  return (<div class="modal fade" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Create New Private Message</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{setOtherUser(props.otherUser)}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={postPvtMessage}>
        <div class="modal-body">
        <input className="form-control" type="text" name="title" required autoComplete="off" placeholder="Title" value={postData.title} onChange={changePostData}/>
        <br/>
        <textarea className="form-control" name="message" required autoComplete="off" placeholder="message" value={postData.message} onChange={changePostData}></textarea>
        <br/>
        <form className="form-inline my-2 my-lg-0">
        <div className="dropdown">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search.text} onChange={changeSearch} aria-haspopup="true"/>
            {search_results&&search_results.users&&search_results.groups?<div className="dropdown-menu" aria-labelledby="Search" style={search_results.users.length>0||search_results.groups.length>0?{display:"block",maxWidth:'180%'}:{display:"none"}}>
              {
                search_results.users&&search_results.users.length>0?<div><h6 className="dropdown-header">Users</h6>
                  {
                    search_results.users.map((user,index)=>{
                      return (<div key={user.username} id={index} onClick={()=>{setOtherUser(user)}} className="dropdown-item">{user.avatar_template?<img style={{height:'20px',width:'20px',borderRadius:'100px',marginRight:'3px'}} src={search_results.url.substring(0,search_results.url.length-1)+user.avatar_template.replace('{size}','40')} alt="user img"/>:null}{user.name} (@{user.username})</div>);
                    })
                  }

                <div className="dropdown-divider"></div>
                </div>:null
              }
            </div>:null}
        </div>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="button" ><SearchIcon style = {{display: "inline",verticalAlign:"middle"}}/></button>
      </form>
      {otherUser&&url?<div class="card" style={{width: "20rem",marginLeft:'0px'}}>
      {otherUser.avatar_template?<img class="card-img-top" style={{height:'100px',width:'100px'}} src={url.substring(0,url.length-1)+otherUser.avatar_template.replace('{size}','40')} alt="user img"/>:null}
        <div class="card-body">
          <h5 class="card-title">Message To {otherUser.name}</h5>
          <a href={"/u/"+otherUser.username} class="btn btn-primary">@{otherUser.username}</a>
        </div>
      </div>:null}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{setOtherUser(props.otherUser)}}>Close</button>
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
        </form>
      </div>
    </div>
  </div>);
}
export default ModalCompose;
