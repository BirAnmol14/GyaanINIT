import React from 'react';
import logo from './logo.png';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>:null}

      </div>
    </nav>
  );
}

export default Navbar;
