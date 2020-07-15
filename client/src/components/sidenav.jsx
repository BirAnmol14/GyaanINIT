import React from 'react';
import "./discuss.css";

function SideNavbar(props){
  return(
     <div>
        <div class="sidenav">
        <a href='/discuss/Engineering'>Discussion</a>
          <a href="/discuss/Engineering/videolectures">Videos Lectures</a>
          <a href="/discuss/Engineering/ebooks">Ebooks</a>
          <a href="/discuss/Engineering/articles">Articles</a>
          <a href="/discuss/Engineering/presentations">Presentations</a>
        </div>

        <div class="main">
          ...
        </div>
    </div>);
}

export default SideNavbar;
