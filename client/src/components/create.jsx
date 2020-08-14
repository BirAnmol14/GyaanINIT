import React from 'react';
import Navbar from './navbar.jsx';
import ServerRoutes from './ServerRoutes.js';
function Create(props){
  const [meetDetails,setDetails]=React.useState({meetUrl:'',meetPass:''});
  const [generatedUrl,setUrl]=React.useState('');
  const [pass,setPass]=React.useState('');
  function detailsChange(event){
    const {name,value}=event.target;
    setDetails(prev=>{return({...prev,[name]:value})});
  }
  async function submitDetails(event){
    event.preventDefault();
    const body=JSON.stringify({meetUrl:meetDetails.meetUrl,password:meetDetails.meetPass,admin_email:props.logged.user.email});
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
  function joinCall(){
    window.location.href='/join';
  }
  return(
    props.logged.status===true?
    <div>
      <Navbar  links={{active:{name:'Create Meet',url:'/create'},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status}/>
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
          <label htmlFor = "content">Content</label>
          <select class = "form-control">
            <option>Content</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="upload-file">Upload</label>
          <input type="file" className="form-control" id='upload-file' name='uploadFile' />
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
