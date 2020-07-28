import React from 'react';
import "./dashboard.css"

function Menu() {
    return (
        <div className="mx-auto">
            <div class="container " style={{opacity:"0.99"}}>

                <section>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-primary">

                                <div class="p-3 mb-2 bg-dark text-white">   <div class="panel-heading">
                                    <h2 class="panel-title d-flex justify-content-center font-weight-bolder text-monospace"><span class="glyphicon glyphicon-thumbs-up"></span>Dashboard</h2>
                                </div></div>
                                <div class="panel-body">

                                    <br />
                                    <h3 class="panel-heading panel-heading"><span class="bg-light  text-dark border-primary">Updates</span></h3>

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

                                    <h3 class="panel-heading panel-heading"><span class="bg-light  text-dark border-primary">Lectures Scheduled</span></h3>
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
                                            <button type="button" class="btn btn-dark btn-lg m-2"><span class="glyphicon glyphicon-cog glyphsize red"></span>Join Lecture<span class="glyphicon glyphicon-cog black"></span></button>
                                        </div>
                                    </div>





                                    <br />
                                    <h3 class="panel-heading panel-heading"><span class="bg-light  text-dark border-primary">My Courses</span></h3>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <nav>
                                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <a class="nav-item nav-link active bg-dark text-white" id="nav-slides-tab" data-toggle="tab" href="#nav-slides" role="tab" aria-controls="nav-slides" aria-selected="true">Slides</a>
                                                    <a class="nav-item nav-link bg-dark text-white" id="nav-Recorded_Lectures-tab" data-toggle="tab" href="#nav-Recorded_Lectures" role="tab" aria-controls="nav-Recorded_Lectures" aria-selected="false">Recorded Lectures</a>
                                                    <a class="nav-item nav-link  bg-dark text-white" id="nav-quiz-tab" data-toggle="tab" href="#nav-quiz" role="tab" aria-controls="nav-quiz" aria-selected="false">Quizes</a>
                                                    <a class="nav-item nav-link bg-dark text-white" id="nav-schedule-tab" data-toggle="tab" href="#nav-schedule" role="tab" aria-controls="nav-schedule" aria-selected="false">Class Schedule</a>
                                                    <a class="nav-item nav-link  bg-dark text-white" id="nav-progress-tab" data-toggle="tab" href="#nav-progress" role="tab" aria-controls="nav-progress" aria-selected="false">My Progress</a>


                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-slides" role="tabpanel" aria-labelledby="nav-slides-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Slide 1</li>
                                                    <li class="list-group-item">Slide 2</li>
                                                    <li class="list-group-item">Slide 3</li>
                                                    <li class="list-group-item">Slide 4</li>
                                                    <li class="list-group-item">Slide 5</li>
                                                </ul></div>
                                                <div class="tab-pane fade show " id="nav-Recorded_Lectures" role="tabpanel" aria-labelledby="nav-Recorded_Lectures-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Lecture 1</li>
                                                    <li class="list-group-item">Lecture 2</li>
                                                    <li class="list-group-item">Lecture 3</li>
                                                    <li class="list-group-item">Lecture 4</li>
                                                    <li class="list-group-item">Lecture 5</li>
                                                </ul></div>
                                                <div class="tab-pane fade show " id="nav-quiz" role="tabpanel" aria-labelledby="nav-quiz-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">quiz 1</li>
                                                    <li class="list-group-item">quiz 2</li>
                                                    <li class="list-group-item">quiz 3</li>
                                                    <li class="list-group-item">quiz 4</li>
                                                    <li class="list-group-item">quiz 5</li>
                                                </ul></div>
                                                <div class="tab-pane fade show " id="nav-schedule" role="tabpanel" aria-labelledby="nav-schedule-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">schedule 1</li>
                                                    <li class="list-group-item">schedule 2</li>
                                                    <li class="list-group-item">schedule 3</li>
                                                    <li class="list-group-item">schedule 4</li>
                                                    <li class="list-group-item">schedule 5</li>
                                                </ul></div>
                                                <div class="tab-pane fade show " id="nav-progress" role="tabpanel" aria-labelledby="nav-progress-tab"><ul class="list-group list-group-flush">
                                                    <li class="list-group-item">progress 1</li>
                                                    <li class="list-group-item">progress 2</li>
                                                    <li class="list-group-item">progress 3</li>
                                                    <li class="list-group-item">progress 4</li>
                                                    <li class="list-group-item">progress 5</li>
                                                </ul></div>


                                            </div>
                                            <br />

                                            <h3 class="panel-heading panel-heading"><span class="bg-light  text-dark border-primary">My Networks</span></h3>


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
