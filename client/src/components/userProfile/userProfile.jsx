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
import parse from 'html-react-parser';
import ChatBox from '../chatBox/chatBox.jsx';
function UserProfile(props){
  const [profileData,setProfileData]=React.useState(null);
  const [badges,setBagdes]=React.useState(null);
  const [url,setUrl]=React.useState('');
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
  React.useEffect(()=>{
    async function runner(){
      await getProfileData();
      await getBadges();
    }
    runner();
  },[]);
  return(
    <div>
      <Navbar  links={{active:{},other:[{name:'Home',url:'/'},{name:'Past Meets',url:'/pastmeets'},{name:'Join Meet',url:'/join'},{name:'Create Meet',url:'/create'}]}}  brand='true' discuss='true' search='true' login={props.logged.status} pic={props.logged.status?props.logged.user.profilePic:null}/>
      <div style={{marginTop:'100px'}}>
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{width:"10%",height:"855px",float:"left",backgroundColor:"#343a40",border:"0.5px solid white",padding:'5px'}}>
              <a className="nav-link active" style={{color:"white",borderRadius:"30px"}} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true"><PersonIcon style={{ display: "inline", verticalAlign: "middle",marginRight:'3px'}}/> Profile</a>
              <a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-badges-tab" data-toggle="pill" href="#v-pills-badges" role="tab" aria-controls="v-pills-badges" aria-selected="false"><EmojiEventsIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Badges</a>
              {props.logged.status?<a className="nav-link" style={{color:"white",borderRadius:"30px"}} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><SendIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Messages</a>:null}
            </div>
          <div className="tab-content" id="v-pills-tabContent" style={{height:"100%", width:"89.9%",marginLeft:"10%",marginTop:"0%",padding:"5px",border:"0.5px solid white",color:"white",backgroundColor:"#343a40"}}>
            <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              {
                profileData?<div>
                  <h3> <img src={url.substring(0,url.length-1)+profileData.avatar_template.replace('{size}','80')} alt="profile pic round" id='uimg'style={{height:'80px',width:'80px',margin:'5px',borderRadius:'200px'}}/><span>{profileData.name} (@{profileData.username})<br/><PersonPinIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{profileData.user_fields['1']}</span></h3>
                  {profileData.bio_raw?<h6><InfoIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{parse(profileData.bio_raw)}</h6>:null}
                  <hr style={{display: 'block',backgroundColor:"white"}}/>
                  {
                    profileData.location? <h6><LocationOnIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>From: {profileData.location}</h6>:null
                  }
                  {
                    profileData.website && profileData.website_name?<h6><LanguageIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Website: <a href={profileData.website}><CallMadeIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> (@{profileData.website_name})</a> </h6>:null
                  }
                  <h6>Created: {profileData.created_at.split('T').join(', ').split('.')[0]}</h6>
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
              profileData?<div>
                <h3> <img src={url.substring(0,url.length-1)+profileData.avatar_template.replace('{size}','80')} alt="profile pic round" id='uimg'style={{height:'80px',width:'80px',margin:'5px',borderRadius:'200px'}}/><span>{profileData.name} (@{profileData.username})<br/><PersonPinIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{profileData.user_fields['1']}</span></h3>
                {profileData.bio_raw?<h6><InfoIcon style={{ display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>{parse(profileData.bio_raw)}</h6>:null}
                <hr style={{display: 'block',backgroundColor:"white"}}/>
                {
                  profileData.location? <h6><LocationOnIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/>From: {profileData.location}</h6>:null
                }
                {
                  profileData.website && profileData.website_name?<h6><LanguageIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Website: <a href={profileData.website}><CallMadeIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> (@{profileData.website_name})</a> </h6>:null
                }
                <h6>Created: {profileData.created_at.split('T').join(', ').split('.')[0]}</h6>
                <hr style={{display: 'block',backgroundColor:"white"}}/>
                <h6><EmojiEventsIcon style={{display: "inline", verticalAlign: "middle" ,marginRight:'3px'}}/> Badges</h6>
                <h6>Badge Count: {profileData.badge_count}</h6>
                {
                  badges?<ul>{badges.map((badge,index)=>{return (
                    <li key={badge.id}>
                    <h6 style={{display:"inline"}}><img src={badge.image} alt="badge_img" style={{height:'80px',width:'80px',margin:'5px',borderRadius:'200px'}}/>
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
              {props.logged.user&&profileData&&props.logged.user.username===profileData.username?<ChatBox allChats={true} of="logged in user username"/>:<ChatBox allChats={false} from="logged in user username" to="profile data user username"/>}
            </div>:null}

          </div>
      </div>
    </div>
  );
}
export default UserProfile;
