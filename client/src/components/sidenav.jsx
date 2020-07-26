import React from 'react';
import "./discuss.css";


function SideNavbar(props){


  return(
     <div>
        <div className="sidenav">
        {
            props.links.other.map(link=>{return (<li className="nav-item" key={link.name} >
            {props.links.active.name===link.name?<a className="nav-link active" key={link.name} id={link.name}  href={link.url}>{link.name}</a>:<a className="nav-link" key={link.name} id={link.name}  href={link.url}>{link.name}</a>}
          </li>)})
          }

        </div>

        <div className="main">
          ...
        </div>
    </div>);
}

export default SideNavbar;
