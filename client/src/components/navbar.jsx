import React from 'react';
import logo from './logo.png';
import profile from './profile.png';
function Navbar(props){
  const [search,setSearch]=React.useState({text:''});
  function changeSearch(event){
    setSearch({text:event.target.value});
  }
  function submitSearch(e){
    e.preventDefault();
    alert('Trying to search: '+search.text);
    setSearch({text:''});
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {props.brand?<a className="navbar-brand" href="/"><img src={logo} alt='logo' style={{borderRadius:'60px'}}/></a>:null}

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

        {props.links.active?<li className="nav-item active">
          <a className="nav-link" href={props.links.active.url}>{props.links.active.name}<span className="sr-only">(current)</span></a>
        </li>:null}

          {
            props.links.other.map(link=>{return (<li className="nav-item">
            <a className="nav-link" href={link.url}>{link.name}</a>
          </li>)})
          }


          {props.discuss?<li className="nav-item dropdown">
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
          
          </li>:null}

        </ul>

        {props.search?<form className="form-inline my-2 my-lg-0" onSubmit={submitSearch}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search.text} onChange={changeSearch}/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" >Search</button>
        </form>:null}


        {(props.login !== 'true')?<form class="nav navbar-nav navbar-right">
          <h5><a href="#"><span class="glyphicon glyphicon-log-in" style={{margin:'10px'}}></span> Login</a></h5>
        </form>:<form class="dropdown pmd-dropdown pmd-user-info" style={{margin:'10px'}}>
              <a href="javascript:void(0);" class="btn-user dropdown-toggle media align-items-center" data-toggle="dropdown" data-sidebar="true" aria-expanded="false">
                  <img class="mr-2" src={profile} width="40" height="40" alt="avatar" />
                  <div class="media-body">
                      <h5>Username</h5>
                  </div>
                  
              </a>
              <ul class="dropdown-menu dropdown-menu-right" role="menu">
                  <a class="dropdown-item" href="/profile/edit">Edit Profile</a>
                  <a class="dropdown-item" href="javascript:void(0);">Logout</a>
              </ul>
          </form>}

      </div>
    </nav>
  );
}

export default Navbar;
