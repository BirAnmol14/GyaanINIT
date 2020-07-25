import React from 'react';
import "./discuss.css";
import { useState } from 'react';

function SideNavbar(props){


  return(
     <div>
        <div class="sidenav">
        {
            props.links.other.map(link=>{return (<li className="nav-item">
            {props.links.active.name===link.name?<a className="nav-link active" id={link.name}  href={link.url}>{link.name}</a>:<a className="nav-link" id={link.name}  href={link.url}>{link.name}</a>}
          </li>)})
          }
        
        </div>

        <div class="main">
          ...
        </div>
    </div>);
}

export default SideNavbar;
