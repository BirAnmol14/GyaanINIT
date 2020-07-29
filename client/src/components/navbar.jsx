
import React from 'react';
import logo from './logo.png';
import ServerRoutes from './ServerRoutes.js';

import profile from './profile.png';
function Navbar(props) {
  const [search, setSearch] = React.useState({ text: '' });
  function changeSearch(event) {
    setSearch({ text: event.target.value });
  }
  function submitSearch(e) {
    e.preventDefault();
    alert('Trying to search: ' + search.text);
    setSearch({ text: '' });
  }
  async function logout(event){
    const response=await fetch(ServerRoutes.logout,{
      method: 'GET',
      credentials: 'include'
    })
    const status=await response.status;
    if(status===200){
      const res=await response.json();
      if(res.status===true){
        alert(res.message);
        window.location.href='/';
      }else{
          alert(JSON.stringify(res));
      }
    }else{
      alert('Error '+status);
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {props.brand ? <a className="navbar-brand" href="/"><img src={logo} alt='logo' style={{ borderRadius: '60px' }} /></a> : null}

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

          {/* {props.links.active?<li className="nav-item active" key={props.links.active.name}>
          <a className="nav-link" href={props.links.active.url}>{props.links.active.name}<span className="sr-only">(current)</span></a>
        </li>:null} */}

          {
            props.links.other.map(link => {
              return (<li className="nav-item" key={link.name}>
                {props.links.active.name === link.name ? <a className="nav-link active" href={link.url} id={link.name}>{link.name}</a> : <a className="nav-link" href={link.url} id={link.name}>{link.name}</a>}
              </li>)
            })
          }


          {props.discuss ? window.location.href.split('/').indexOf("discuss") !== -1 ? <li className="nav-item dropdown">
            <a className="nav-link active dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Discuss
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

              <a className="dropdown-item" href="/discuss/Engineering">Engineering</a>
              <a className="dropdown-item" href="/discuss/Medical">Medical</a>
              <a className="dropdown-item" href="/discuss/JEE">JEE</a>
              <a className="dropdown-item" href="/discuss/NEET">NEET</a>
              <a className="dropdown-item" href="/discuss/School">School</a>

            </div>

          </li> : <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Discuss
            </a>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                <a className="dropdown-item" href="/discuss/Engineering">Engineering</a>
                <a className="dropdown-item" href="/discuss/Medical">Medical</a>
                <a className="dropdown-item" href="/discuss/JEE">JEE</a>
                <a className="dropdown-item" href="/discuss/NEET">NEET</a>
                <a className="dropdown-item" href="/discuss/School">School</a>

              </div>

            </li> : null}
          {(props.login === 'true') ? (props.links.active.name === 'Dashboard' || window.location.href.split('/').indexOf("Dashboard") !== -1) ? <a className="nav-link active" href="/Dashboard" >
            My Courses
         </a> : <a className="nav-link" href="/Dashboard" >
              My Courses
   </a>

            : null}

        </ul>

        {props.search ? <form className="form-inline my-2 my-lg-0" onSubmit={submitSearch}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search.text} onChange={changeSearch} />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" >Search</button>
        </form> : null}

        
        {(props.login !== 'true') ? <form className="nav navbar-nav navbar-right">
        <p style={{textAlign:"right"}}>  <a href="/login">Login</a></p>
        </form> : <form className="dropdown pmd-dropdown pmd-user-info" style={{ margin: '10px' }}>
            <a href="javascript:void(0);" className="btn-user dropdown-toggle media align-items-center" data-toggle="dropdown" data-sidebar="true" aria-expanded="false">
            <a className="navbar-brand" href="/"><img src={profile} alt='logo' style={{ borderRadius: '60px' }} width="50" height="50" />
            
            </a>
            </a>
            <ul className="dropdown-menu dropdown-menu-right" role="menu">
              <a className="dropdown-item" href="/profile/">View Profile</a>
              <a  onClick={logout} className="dropdown-item" href="javascript:void(0);">Logout</a>
            </ul>
          </form>}

      </div>
    </nav>
  );
}

export default Navbar;
