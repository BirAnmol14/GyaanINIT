import React from 'react';
import logo from './logo.png';
function Navbar(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {props.brand?<a className="navbar-brand" href="/"><img src={logo} alt='logo' style={{borderRadius:'60px'}}/></a>:null}
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
          </li>
          {props.create?<li className="nav-item">
            <a className="nav-link" href="/login">Create Meet</a>
          </li>:null}
          {props.join?<li className="nav-item">
            <a className="nav-link" href="/login">Join Meet</a>
          </li>:null}
          {props.discuss?<li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Discuss
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/discuss/engineering">Engineering</a>
              <a className="dropdown-item" href="/discuss/Medical">Medical</a>
              <a className="dropdown-item" href="/discuss/JEE">JEE</a>
              <a className="dropdown-item" href="/discuss/NEET">NEET</a>
              <a className="dropdown-item" href="/discuss/School">School</a>
            </div>
          </li>:null}
        </ul>
        {props.search?<form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>:null}
      </div>
    </nav>
  );
}

export default Navbar;
