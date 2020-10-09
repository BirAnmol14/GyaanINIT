import React from 'react';
import Navbar from './navbar.jsx';
import ServerRoutes from './ServerRoutes.js';
import AddUser from './addUser.jsx';
function Create(props){
  const [meetDetails,setDetails]=React.useState({meetUrl:'',meetPass:''});
  const [generatedUrl,setUrl]=React.useState('');
  const [pass,setPass]=React.useState('');
  const [participants,setParticipants]=React.useState([]);
  const [cat,setCat]=React.useState([]);
  const [pub,setPublic]=React.useState(false);
  async function getCategories(){
    const response = await fetch(ServerRoutes.getCategories, {
    method: 'GET',
    credentials: 'include'
  });
  const status=await response.status;
    if(status===200){
      const data = await response.json();
      if(data.status===true){
        setCat(data.categories);
      }else{
        alert(data.message);
      }
    }else{
      alert("Error "+status);
    }
  }
  function addParticipant(participant){
    setParticipants([...participants,participant]);
  }
  function removeParticipant(index){
    setParticipants(participants.filter((p,i)=>{return i!==index;}));
  }
  function detailsChange(event){
    const {name,value}=event.target;
    setDetails(prev=>{return({...prev,[name]:value})});
  }
  async function submitDetails(event){
    event.preventDefault();
    const body=JSON.stringify({meetUrl:meetDetails.meetUrl,password:meetDetails.meetPass,admin_username:props.logged.user.username});
    const response=await fetch(ServerRoutes.generateCall,{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body:body
    });
    const status=await response.status;
    if(status === 200){
      const res=await response.json();
      if(res.status===true){
        alert('URL: '+res.url);
        setUrl(window.location.href.substr(0,window.location.href.indexOf(window.location.pathname))+'/videoCall/'+res.url);
        setPass(meetDetails.meetPass);
      }else{
        window.location.href='/create';
      }
    }else{
      alert('Error: '+status+'\nTry Again');
    }
    setDetails({meetUrl:'',meetPass:''});
  }
  React.useEffect(()=>{getCategories();},[]);
  function joinCall(){
    window.location.href='/join';
  }
  return(
    props.logged.status===true?
    <div>
      <Navbar  links={{active:{name:'Create Meet',url:'/create'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>
      {generatedUrl.length===0?
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
        <div className="col">
          <label htmlFor = "category">Category</label>
          <select className="form-control" id = "multi-role" name='category' required placeholder='Select a Category' style={{overflowY:'scroll'}}>
              <option value="" disabled selected>Select your Category</option>
              {
                cat.map((category,index)=>{return(<option key={category.id} id={index} value={category.id}>{category.name}</option>)})
              }
          </select>
        </div>
        <div className="col">
          <label htmlFor="details">Meet Details</label>
          <input type="text" className="form-control" id='detials' name='details' placeholder="Please Enter Reason for the meeting"/>
        </div>
      </div>
      <div className="row">
      <div className="col">
      <div className="form-check" style={{marginLeft:'0px',marginTop:"10px",padding:'0px'}}>
      <input className="form-check-input" type="checkbox" value={pub} id="defaultCheck1" onChange={()=>{setPublic(!pub);setParticipants([])}}/>
      <label className="form-check-label" for="defaultCheck1">Make Public?</label>
      </div>
        {!pub?<AddUser participants={participants} addParticipant={addParticipant} removeParticipant={removeParticipant} />:null}
        </div>
      </div>
      <div className="row">
        <div className='col'>
          <button type="submit" className="btn btn-danger" style={{marginTop:'1em',backgroundColor:'#007bff',borderColor:'white'}} name='create'>Create</button>
        </div>
      </div>
      </form>
    :
      <div style={{marginTop:'140px'}}><h1>Meet Details</h1><h2>Url: {generatedUrl}</h2><h2>Password: {pass}</h2>
      <h4>For joining call, nickname is enough</h4>
      <button type='button'  className="btn btn-danger" onClick={joinCall}>JOIN</button>
      </div>
    }
    </div>
    :
    <div/>
  );
}

export default Create;
