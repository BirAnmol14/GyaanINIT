import React from 'react';
import "./discuss.css"
import logo from '../components/logo.png';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-3],url:window.location.href}
}

function Articlepage(){
    return(
        <div>
          <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login'},{name:'Create Meet',url:'/login'}]}} brand='true' discuss='true' search='true'/>
            <SideNavbar />
            <div style={{width:"60%",height:"60%",marginLeft:"30%",marginRight:"25%"}} class="card">
             <div class="col-md-10 blogShort">
                     <h1>Title 1</h1>
                     <img src = {logo} alt="post img" class="pull-left img-responsive postImg img-thumbnail margin10" />
                     <article>
                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                         ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                         of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                         Lorem Ipsum.
                         </p>
                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                         ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                         of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                         Lorem Ipsum.
                         </p>
                           <h2>It is so easy</h2>
                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                         ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                         of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                         Lorem Ipsum.
                         </p>
                         <h3>How to lose 20 pounds in 1 week!</h3>
                          <br/>
                         <iframe width="100%" height="480" src="//www.youtube.com/embed/Bn_d-ghQ5HA" frameborder="0" allowfullscreen title='demo'></iframe>

                         <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                         ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                         of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                         Lorem Ipsum.
                         </p>
                        <h4>It is so easy</h4>
                        <p>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                         ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                         of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
                         Lorem Ipsum.
                         </p>
                     </article>
                 </div>
	    </div>
        </div>
    );
}

export default Articlepage;
