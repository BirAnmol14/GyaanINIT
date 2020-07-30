import React from 'react';
import Navbar from './navbar.jsx';
import './login.css';
import queryString from 'query-string';
import ServerRoutes from './ServerRoutes.js';

function Login(props){
    const [login,resetLogin]=React.useState({email:'',password:''});
    const [reg,setReg]=React.useState({email:'',password:'',name:''});
    const [strength,setStrength]=React.useState(0);
    function getNextUrl(){
      const obj=queryString.parse(props.location.search);
      if(obj && obj.type && (obj.type==='join'||obj.type==='create')){
        return '/'+obj.type;
      }
      return '/';
    }
    function loginChange(event){
      const {value,name}=event.target;
      resetLogin(prev=>{return ({...prev,[name]:value});});
    }
    async function loginSub(event){
      event.preventDefault();
      const res=await loginApi();
      if(res.status===true){
        alert(res.message);
        alert(JSON.stringify(res.user));
        const url=getNextUrl();
        window.location.href=url;
      }else{
          alert(JSON.stringify(res));
          if(res.message==='User not registered'){
            document.getElementById('pills-register-tab').click();
          }
      }
      resetLogin({email:'',password:''});
    }
    async function loginApi(){
      const body=JSON.stringify({email:login.email,password:login.password});
      const response = await fetch(ServerRoutes.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    })
      const status=await response.status;
      if(status===200){
        const res=await response.json();
        return res;
      }else{
        alert('Error '+status);
        return {status:false,message:'Error Occurred'}
      }
    }
    function regChange(event){
      const {value,name}=event.target;
      setReg(prev=>{return ({...prev,[name]:value});});
    }


    React.useEffect(() => {
      async function PasswordStrength(){
        const body=JSON.stringify({password:reg.password});
        try{
          const response=await fetch(ServerRoutes.pass_strength,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: body
          })
          let status=await response.status;
          if(status === 200){
            let res=await response.json();
            setStrength(res.strength);
          }else{
            alert('Error Occurred '+status);
            setStrength(0);
          }
        }catch(e){
          console.error(e);
        }
      }
      PasswordStrength();    
    },[reg.password]);

    function regSubmit(event){
      event.preventDefault();
      if(strength>66){
        registerApi();
      }
      else{
        alert('Password strength too low, try a better password');
      }
      setReg({email:'',password:'',name:''});
    }
    async function registerApi(){
      const body=JSON.stringify({name: reg.name,email:reg.email,password:reg.password});
      const response = await fetch(ServerRoutes.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body
    })
      const status=await response.status;
      if(status===200){
        var res=await response.json();
        if(res.status){
          alert(res.message+'\n Kindly Login');
          document.getElementById('pills-login-tab').click();
        }
        else{
          alert(JSON.stringify(res));
        }
      }else{
        alert('Error '+status);
      }
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
            <div className="col">
              <div className="progress" style={{marginTop:'10px'}}>
                <div className=  { strength>0?strength<=33 ?"progress-bar bg-danger":strength<=66?"progress-bar bg-warning":"progress-bar bg-success":'"progress-bar'} role="progressbar" style={{width:strength+'%'}} aria-valuenow={strength} aria-valuemin="0" aria-valuemax="100">
                  { strength>0?strength<=33 ?'Weak':strength<=66?'Moderate':'Strong':' '}
                </div>
              </div>
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
