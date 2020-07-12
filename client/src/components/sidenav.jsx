import React from 'react';
import "./discuss.css";

function SideNavbar(props){
  return(
     <div>
        <div class="sidenav">
        <a href="/discuss/engineering">Discussion</a>
          <a href="/discuss/engineering/videolectures">Videos Lectures</a>
          <a href="/discuss/engineering/ebooks">Ebooks</a>
          <a href="/discuss/engineering/articles">Articles</a>
          <a href="/discuss/engineering/presentations">Presentations</a>
        </div>

        <div class="main">
          ...
        </div>
    </div>);
}

export default SideNavbar;