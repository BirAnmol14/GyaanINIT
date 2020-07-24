import React from 'react';
import './login.css'

function getActive(){
  var url=window.location.href.split('/');
  return {name:url[url.length-1],url:window.location.href}
}

function EditProfile(){
    return(
      <div >
            <div class="container">
                <div class = "d-flex justify-content-center"><h1>Edit Profile</h1></div>
               
                <div class="row">
             
                <div class="col-md-3">
                    <div class="text-center">
                    <img src="//placehold.it/100" class="avatar img-circle" alt="avatar" />
                    <h6>Upload a different photo...</h6>
                    
                    <input type="file" class="form-control" />
                    </div>
                </div>
                
              
                <div class="col-md-9 personal-info">
                    <div class="alert alert-info alert-dismissable">
                    <a class="panel-close close" data-dismiss="alert">×</a> 
                    <i class="fa fa-coffee"></i>
                    This is an <strong>.alert</strong>. Use this to show important messages to the user.
                    </div>
                    <h3>Personal info</h3>
                    
                    <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-lg-3 control-label">First Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="form-control" value="User" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Middle Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Last Name:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="Name" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Email:</label>
                        <div class="col-lg-8">
                        <input class="input" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Country</label>
                        <div class="col-lg-8">
                        <div class="ui-select">
                            <select id="user_time_zone" class="input">
                            <option value="India">India</option>
                            <option value="US">US</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Username:</label>
                        <div class="col-md-8">
                        <input class="input" type="text" value="" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Password:</label>
                        <div class="col-md-8">
                        <input class="input" type="password" value="" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">Confirm password:</label>
                        <div class="col-md-8">
                        <input class="input" type="password" value="" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div class="col-md-8">
                        <input type="button" class="btn btn-primary" value="Save Changes" />
                        <span></span>
                        <input type="reset" class="btn btn-default" value="Cancel" /> 
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            
      </div>
    );

}



export default EditProfile;