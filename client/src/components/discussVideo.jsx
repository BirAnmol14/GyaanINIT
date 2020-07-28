import React from 'react';
import Navbar from './navbar.jsx';
import SideNavbar from './sidenav.jsx';
import Videoshow from './present.jsx';
import ServerRoutes from './ServerRoutes.js';
function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-2],url:window.location.href}
}

function DiscussVideo(){

    var [logged,setLogged]=React.useState('false');
  

    async function loggedStatus(){
      
      
      const response=await fetch(ServerRoutes.loggedIn,{
        method: 'GET',
        credentials: 'include'
      })
      const status=await response.status;
      if(status===200){
        const res=await response.json();
        if(res.status===true){
        
          setLogged('true');
          return;
          
          
        }else{
            setLogged('false');
            return;
        }
      }else{
        alert('Error '+status);
      }
    
    }
      
    React.useEffect(() => {
      loggedStatus();
    });
    return(
        <div>
            <Navbar links={{active:getActive(),other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/login?type=join'},{name:'Create Meet',url:'/login?type=create'}]}} brand='true' discuss='true' search='true' login={logged}/>
            <div style={{marginTop:"90px"}}>
            <SideNavbar links={{active:{name:'Videos'},other:[{name:'Posts',url:'/discuss/'+getActive().name},{name:'Videos',url:'/discuss/'+getActive().name+'/videolectures'},{name:'eBooks',url:'/discuss/'+getActive().name+'/ebooks'},{name:'Articles',url:'/discuss/'+getActive().name+'/articles'},{name:'Presentations',url:'/discuss/'+getActive().name+'/presentations'}]}}/>
            <div style={{marginLeft:"100px"}}>
            <Videoshow />
            <Videoshow />
            </div>
</div>
        </div>
    );

}


export default DiscussVideo;
