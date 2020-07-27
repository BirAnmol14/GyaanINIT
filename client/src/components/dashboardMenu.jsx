import React from 'react';
import "./dashboard.css"

function Menu() {
    return (
        <div className="mx-auto">
            <div class="container">

                <section>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-primary">

                                <div class="p-3 mb-2 bg-primary text-white">   <div class="panel-heading">
                                    <h2 class="panel-title d-flex justify-content-center font-weight-bolder text-monospace"><span class="glyphicon glyphicon-thumbs-up"></span>Dashboard</h2>
                                </div></div>
                                <div class="panel-body">
                                    <br />

                                    <h3 class="panel-heading panel-heading"><span class="bg-white  text-dark border-primary">Lectures Scheduled</span></h3>
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action">
                                            Cras justo odio
                                            </a>
                                        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                                        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                                        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                                        <a href="#" class="list-group-item list-group-item-action">Vestibulum at eros</a>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-info btn-lg m-2"><span class="glyphicon glyphicon-cog glyphsize red"></span>Join Lecture<span class="glyphicon glyphicon-cog black"></span></button>
                                        </div>
                                    </div>
                                    <br />

                                    <h3 class="panel-heading panel-heading"><span class="bg-white  text-dark border-primary">Your Networks</span></h3>


                                    <div class="row">

                                        <div class="col-md-12">
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <a class="nav-item nav-link active bg-dark text-white" id="nav-recentActivities-tab" data-toggle="tab" href="#nav-recentActivities" role="tab" aria-controls="nav-recentActivities" aria-selected="true">Recent Activities</a>
                                                    <a class="nav-item nav-link bg-dark text-white" id="nav-posts-tab" data-toggle="tab" href="#nav-posts" role="tab" aria-controls="nav-posts" aria-selected="false">Posts</a>

                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-recentActivities" role="tabpanel" aria-labelledby="nav-recentActivities-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Act 1</li>
                                                    <li class="list-group-item">Act 2</li>
                                                    <li class="list-group-item">Act 3</li>
                                                    <li class="list-group-item">Act 4</li>
                                                    <li class="list-group-item">Act 5</li>
                                                </ul></div>
                                                <div class="tab-pane fade" id="nav-posts" role="tabpanel" aria-labelledby="nav-posts-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Post 1</li>
                                                    <li class="list-group-item">Post 2</li>
                                                    <li class="list-group-item">Post 3</li>
                                                    <li class="list-group-item">Post 4</li>
                                                    <li class="list-group-item">Post 5</li>
                                                </ul></div>

                                            </div>
                                            {/* <button type="button" class="btn btn-success btn-lg m-2">Recent Activities</button>
                                            <button type="button" class="btn btn-success btn-lg m-2">Post</button> */}
                                        </div>
                                    </div>




                                    <br />
                                    <h3 class="panel-heading panel-heading"><span class="bg-white  text-dark border-primary">My Activities</span></h3>

                                    <div class="row">
                                        <div class="col-md-12">

                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-6x"></i>
                                                Slides <br />
                                            </a>
                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Video Lectures <br />
                                            </a>
                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Quizes <br />
                                            </a>
                                            <br />
                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                Class Schedule <br />
                                            </a>
                                            <a href="#" class="btn btn-lg btn-primary m-2">
                                                <i class="fa fa-user fa-5x"></i>
                                                My Progress <br />
                                            </a>
                                        </div>
                                    </div>

                                    <br />
                                    <h3 class="panel-heading panel-heading"><span class="bg-white  text-dark border-primary">Updates</span></h3>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div class="list-group">
                                                    <a href="#" class="list-group-item list-group-item-action">
                                                        <div class="d-flex w-100 justify-content-between">
                                                            <h5 class="mb-1">List group item heading</h5>
                                                            <small>3 days ago</small>
                                                        </div>
                                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small>Donec id elit non mi porta.</small>
                                                    </a>
                                                    <a href="#" class="list-group-item list-group-item-action">
                                                        <div class="d-flex w-100 justify-content-between">
                                                            <h5 class="mb-1">List group item heading</h5>
                                                            <small class="text-muted">3 days ago</small>
                                                        </div>
                                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small class="text-muted">Donec id elit non mi porta.</small>
                                                    </a>
                                                    <a href="#" class="list-group-item list-group-item-action">
                                                        <div class="d-flex w-100 justify-content-between">
                                                            <h5 class="mb-1">List group item heading</h5>
                                                            <small class="text-muted">3 days ago</small>
                                                        </div>
                                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                        <small class="text-muted">Donec id elit non mi porta.</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );

}

export default Menu;
