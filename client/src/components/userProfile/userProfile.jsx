import React from 'react';
import Navbar from '../navbar.jsx';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ServerRoutes from '../ServerRoutes.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import CallMadeIcon from '@material-ui/icons/CallMade';
import GroupIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
import parse from 'html-react-parser';
import ChatBox from '../chatBox/chatBox.jsx';
import ModalCompose from '../Modal/modalCompose.jsx';
import './userProfile.css';
function UserProfile(props){
  const [profileData,setProfileData]=React.useState(null);
  const [badges,setBagdes]=React.useState(null);
  const [url,setUrl]=React.useState('');
  const [hide,setHide]=React.useState(false);
  async function getProfileData(){
    const loc=window.location.pathname.split('/');
    if(loc.length!==3||loc[loc.length-1].length<0){
      window.location.href='/';
    }
    const url=ServerRoutes.getUserProfile+loc[loc.length-1];
    const res=await fetch(url,{
    method: 'GET',
    credentials: 'include'
    });
    if(await res.status===200){
      const result=await res.json();
      if(result.status){
        setProfileData(result.info);
        setUrl(result.url);
      }
    }else{
      alert('Error '+await res.status);
      window.location.href='/';
    }
  }
  async function getBadges(){
    const loc=window.location.pathname.split('/');
    if(loc.length!==3||loc[loc.length-1].length<0){
      window.location.href='/';
    }
    const url=ServerRoutes.getBadges+loc[loc.length-1];
    const res=await fetch(url,{
    method: 'GET',
    credentials: 'include'
    });
    if(await res.status===200){
      const result=await res.json();
      if(result.status){
        setBagdes(result.badges);
      }
    }else{
      alert('Error '+await res.status);
      window.location.href='/';
    }
  }
  function hideNav(event){
    if(event.target.id==='v-pills-messages-tab'){
      setHide(prev=>{return !prev});
    }
    else{
      setHide(false);
    }
  }
  React.useEffect(()=>{
    async function runner(){
      await getProfileData();
      await getBadges();
    }
    runner();
  },[]);
  return(
    <div>

    <div className="bottomNav">
    <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
    <li className="nav-item" role="presentation">
    <a className="nav-link active" style={{color:"white",borderRadius:"30px"}} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true" onClick={hideNav}><PersonIcon style={{ display: "inline", verticalAlign: "middle",margin:'0em 0.3em',pointerEvents:'none'}}/> </a>
    </li>
    <li className="nav-item" role="presentation">
      <a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-badges-tab" data-toggle="pill" href="#v-pills-badges" role="tab" aria-controls="v-pills-badges" aria-selected="false" onClick={hideNav}><EmojiEventsIcon style={{ display: "inline", verticalAlign: "middle",margin:'0em 0.3em',pointerEvents:'none'}}/></a>
    </li>
    <li className="nav-item" role="presentation">
    {props.logged.status?<a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick={hideNav}><MailIcon style={{ display: "inline", verticalAlign: "middle",margin:'0em 0.3em',pointerEvents:'none'}}/></a>:null}
    </li>
    <li className="nav-item" role="presentation">
    {props.logged.status?<a className="nav-link" style={{color:"white",borderRadius:"30px"}} href="#ModalCenter" aria-label="add" data-toggle="modal" data-target="#ModalCenter"><SendIcon style={{ display: "inline", verticalAlign: "middle",margin:'0em 0.3em',pointerEvents:'none'}}/></a>:null}
    </li>
  </ul>
    </div>
      {!hide?<Navbar links={{active:{},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>:null}
      <div style={!hide?{marginTop:'100px'}:{marginTop:"5px"}}>
          <div className="nav flex-column nav-pills sideNav1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link active" style={{color:"white",borderRadius:"30px"}} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true" onClick={hideNav}><PersonIcon style={{ display: "inline", verticalAlign: "middle",marginRight:'3px'}}/> Profile</a>
              <a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-badges-tab" data-toggle="pill" href="#v-pills-badges" role="tab" aria-controls="v-pills-badges" aria-selected="false" onClick={hideNav}><EmojiEventsIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Badges</a>
              {props.logged.status?<a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick={hideNav}><MailIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Messages</a>:null}
              {props.logged.status?<a className="nav-link" style={{color:"white",borderRadius:"30px"}} href="#ModalCenter" aria-label="add" data-toggle="modal" data-target="#ModalCenter"><SendIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Compose</a>:null}
            </div>
          <div className="tab-content dataHolder" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              {
                profileData&&url?<div>
                  <h3> <img src={url.substring(0,url.length-1)+profileData.avatar_template.replace('{size}','80')} alt="profile pic round" id='uimg'/><span>{profileData.name} (@{profileData.username})<br/><PersonPinIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{profileData.user_fields['1']}</span></h3>
                  {profileData.bio_raw?<h6><InfoIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{parse(profileData.bio_raw)}</h6>:null}
                  <hr style={{display: 'block',backgroundColor:"white"}}/>
                  {
                    profileData.location? <h6><LocationOnIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>From: {profileData.location}</h6>:null
                  }
                  {
                    profileData.website && profileData.website_name?<h6><LanguageIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Website: <a href={profileData.website}><CallMadeIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> (@{profileData.website_name})</a> </h6>:null
                  }
                  <h6>Created: {new Date(profileData.created_at).toLocaleString()}</h6>
                  <hr style={{display: 'block',backgroundColor:"white"}}/>
                  <h6><GroupIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Groups Joined</h6>
                  {
                    profileData.groups?<ul>{profileData.groups.map((group,index)=>{return (

                        !group.name.includes('trust')?<li key={group.id}>
                        <h6 style={{display:"inline"}}>
                        <span>{group.name.split('_').join(' ')}
                        <p style={{fontSize:'10px'}}>
                        {group.bio_raw?" "+group.bio_raw:null}
                        </p>
                        </span>
                        </h6>
                        </li>:null


                    );
                  })
                  }
                  </ul>:null
                  }
                </div>:null
              }
            </div>
            <div className="tab-pane fade" id="v-pills-badges" role="tabpanel" aria-labelledby="v-pills-badges-tab">
            {
              profileData&&url?<div>
                <h3> <img src={url.substring(0,url.length-1)+profileData.avatar_template.replace('{size}','80')} alt="profile pic round" id='uimg'/><span>{profileData.name} (@{profileData.username})<br/><PersonPinIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{profileData.user_fields['1']}</span></h3>
                {profileData.bio_raw?<h6><InfoIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{parse(profileData.bio_raw)}</h6>:null}
                <hr style={{display: 'block',backgroundColor:"white"}}/>
                {
                  profileData.location? <h6><LocationOnIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>From: {profileData.location}</h6>:null
                }
                {
                  profileData.website && profileData.website_name?<h6><LanguageIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Website: <a href={profileData.website}><CallMadeIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> (@{profileData.website_name})</a> </h6>:null
                }
                <h6>Created: {new Date(profileData.created_at).toLocaleString()}</h6>
                <hr style={{display: 'block',backgroundColor:"white"}}/>
                <h6><EmojiEventsIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Badges</h6>
                <h6>Badge Count: {profileData.badge_count}</h6>
                {
                  badges?<ul>{badges.map((badge,index)=>{return (
                    <li key={badge.id}>
                    <h6 style={{display:"inline"}}><img id='uimg' src={badge.image} alt="badge_img"/>
                    <span>{badge.name}
                    {badge.description?": "+badge.description.replace( /(<([^>]+)>)/ig, ''):null}
                    </span>
                    </h6>
                    </li>
                  );
                })
                }
                </ul>:null
                }
              </div>:null
            }
            </div>
            {props.logged.status?<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
              {props.logged.user&&profileData?props.logged.user.username===profileData.username?<ChatBox allChats={true} of={props.logged.user.username} />:<ChatBox allChats={false} from={props.logged.user.username} to={profileData.username} />:null}
            </div>:null}

          </div>
      </div>
      {props.logged.user&&profileData&&url?<ModalCompose otherUser={profileData.username!==props.logged.user.username?profileData:null} url={url}/>:null}
    </div>
  );
}
export default UserProfile;
