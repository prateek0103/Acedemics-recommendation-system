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


    <title>Academics Recommendation System : Login</title>
</head>

<body class="blue">
    <script>
        $(document).ready(function () {

            $('#loginBtn').click(function () {
                var username = $("#user_name").val();
                var password = $.md5($("#password").val());


                $.ajax({
                    type: "POST",
                    url: "login.php",
                    data: "number=" + username + "&pwd=" + password + "&system=PC",

                    success: function (html) {
                            
                            if(html==1){
                            window.location.href="user.php";
                            }
                            
                            if(html==2){
                            window.location.href="admin.php"
                            }
                            
                            if(html==3){
                            window.location.href="index.php"
                            }
                    
                    }
                });


                return false;
            });

        });
    </script>
    <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row">&nbsp;</div>
        <div class="row">&nbsp;</div>
        <div class="row">&nbsp;</div>

        <div class="row" id="loginrow">

            <div id="loginCard" class="col s4 offset-s4 card animated fadeInDown">

                <div class="card-content">

                    <span class="card-title black-text">Log In</span>
                    <form id="loginForm" class="col s12" method="post" action="#">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="user_name" type="text" name="user_name" required>
                                <label for="username">Contact Number</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" name="password" required>
                                <label for="password">Password</label>
                            </div>
                        </div>

                        <div class="row">
                            <div id="error">
                            </div>
                        </div>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light" id="loginBtn" type="button">Submit
                        <i class="mdi-content-send right"></i>
                    </button>
                    <div class="row"><div class="col offset-s2">Not a member? <a href="signup.php">Sign Up</a></div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <!-- <script type="text/javascript" src="js/prism.js"></script>-->
    <script type="text/javascript" src="js/materialize.js"></script>
</body>



</html>
