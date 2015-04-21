<?php session_start();?>

<!DOCTYPE html>
<html>

<head>
    <link type="text/css" rel=stylesheet href="css/materialize.css" media="screen,projection">

    <link type="text/css" rel="stylesheet" href="css/animate.css">
    <link type="text/css" rel="stylesheet" href="css/style.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.ui.shake.js"></script>
    <script src="js/jquery.md5.js"></script>


    <title>Academics Recommendation System : Admin</title>
</head>

<body class="blue">
 <script>
        $(document).ready(function () {

            $('#loginBtn').click(function () {
                var code = $("#code").val();
                var name = $("#name").val();
                var desc=$("#desc").val();


                $.ajax({
                    type: "POST",
                    url: "newcourse.php",
                    data: "code=" + code + "&name=" + name + "&desc=" + desc,

                    success: function (html) {
                        
                              toast('New course added', 4000);
                        
}
                });


                return false;
            });
            
            $('#Btn2').click(function () {
                var code = $("#code").val();

                $.ajax({
                    type: "POST",
                    url: "deletecourse.php",
                    data: "code=" + code,

                    success: function (html) {
                        
                              toast('Course deleted', 4000);
                        
}
                });


                return false;
            });

        });
    </script>
    <div class="container">
        <div class="row animated fadeIn">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s3"><a href="#test1">Add course</a>
                    </li>
                    <li class="tab col s3"><a href="#test2">Delete course</a>
                    </li>
                    <li class="tab col s3"><a href="#test3">View courses</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div id="test1" class="col s12 animated fadeInUp">


                <div id="loginCard" class="col s8 offset-s2 card animated fadeInDown">

                    <div class="card-content">

                        <span class="card-title black-text">New Course</span>
                        <form id="loginForm" class="col s12" method="post" action="#">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="code" type="text" name="code" required>
                                    <label for="code">Course code</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="name" type="text" name="name" required>
                                    <label for="name">Course name</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <textarea id="desc" class="materialize-textarea"></textarea>
                                    <label for="desc">Course description</label>
                                </div>
                            </div>
                    </div>
                    <div class="card-action">
                        <button class="btn waves-effect waves-light" id="loginBtn" type="button">Submit
                            <i class="mdi-content-send right"></i>
                        </button>
                    </div>
                    </form>
                </div>
            </div>




            <div id="test2" class="col s12 animated fadeInUp">

<div id="loginCard" class="col s8 offset-s2 card animated fadeInDown">

                    <div class="card-content">

                        <span class="card-title black-text">Delete course</span>
                        <form id="loginForm" class="col s12" method="post" action="#">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="code" type="text" name="code" required>
                                    <label for="code">Course code</label>
                                </div>
                            </div>
                    </div>
                    <div class="card-action">
                        <button class="btn waves-effect waves-light" id="Btn2" type="button">Submit
                            <i class="mdi-content-send right"></i>
                        </button>
                    </div>
                    </form>
                </div>

            </div>


            <div id="test3" class="col s12 animated fadeInUp">

            </div>



        </div>


    </div>
    <script type="text/javascript" src="js/materialize.js"></script>
    <!--script type="text/javascript" src="js/Chart.js"></script-->
    <script>
        $(document).ready(function () {
            $('.collapsible').collapsible();
            $('ul.tabs').tabs();

            $('select').material_select();
        });
    </script>
</body>



</html>