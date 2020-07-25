import React from 'react';
import Navbar from './navbar.jsx';
import './login.css'

function Login(){
    const [login,resetLogin]=React.useState({email:'',password:''});
    const [reg,setReg]=React.useState({email:'',password:'',name:''});
    function loginChange(event){
      const {value,name}=event.target;
      resetLogin(prev=>{return ({...prev,[name]:value});});
    }
    function loginSub(event){
      event.preventDefault();
      alert('login attempt\n'+login.email+'\n'+login.password);
      resetLogin({email:'',password:''});
    }
    function regChange(event){
      const {value,name}=event.target;
      setReg(prev=>{return ({...prev,[name]:value});});
    }
    function regSubmit(event){
      event.preventDefault();
      alert('Register attempt\n'+reg.name+"\n"+reg.email+'\n'+reg.password);
      setReg({email:'',password:'',name:''});
    }
    return(
      <div>

        <Navbar brand='true' links={{active:{name:'Login',url:'/login'},other:[{name:'Home',url:'/'}]}}/>
       <div style={{marginTop:"140px"}}>
        <div style={{backgroundColor:'#343A40',margin:'4em',padding:'2em',borderRadius:'20px',marginLeft: '30%',
    marginRight: '30%', width: '40%'}}>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{backgroundColor:'#343A40'}}>
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
          <form onSubmit={loginSub} style={{backgroundColor:'#343A40',color:'white',padding:'2em',border:'solid 2px white',borderRadius:'20px'}}>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" style={{borderRadius:'10px'}} required value={login.email} onChange={loginChange} name='email'/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" style={{borderRadius:'10px'}} required value={login.password} onChange={loginChange} name='password'/>
            </div>
          </div>
          <div className="row">
            <div className='col'>
              <button type="submit" className="btn btn-danger" style={{marginTop:'1em',backgroundColor:'#007bff',borderColor:'white'}} name='login'>Login</button>
            </div>
          </div>
          </form>
          </div>
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
            <form onSubmit={regSubmit} style={{backgroundColor:'#343A40',color:'white',padding:'2em',border:'solid 2px white',borderRadius:'20px'}}>
            <div className="row">
            <div className="col">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" style={{borderRadius:'10px'}} required name='name' value={reg.name} onChange={regChange}/>
            </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="InputEmail1">Email</label>
                <input type="email" className="form-control" id="InputEmail1" style={{borderRadius:'10px'}} required name='email' value={reg.email} onChange={regChange}/>
              </div>
              </div>
              <div className="row">
              <div className="col">
                <label htmlFor="InputPassword1">Password</label>
                <input type="password" className="form-control" id="InputPassword1" style={{borderRadius:'10px'}} required name='password' value={reg.password} onChange={regChange}/>
              </div>
            </div>
            <div className="row">
              <div className='col'>
                <button type="submit" className="btn btn-danger" style={{marginTop:'1em',backgroundColor:'#007bff',borderColor:'white'}} name='register'>Submit</button>
              </div>
            </div>
            </form>
          </div>
        </div>
        </div>
        </div>
      </div>
    );

}

export default Login;
