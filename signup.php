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


    <title>Stealth Gaming Lounge : Login</title>
</head>

<body class="blue">
    <script>
        $(document).ready(function () {

            $('#loginBtn').click(function () {
                var username = $("#name").val();
                var password = $.md5($("#password").val());
                var contact=$("#contact").val();
                var email=$("#email").val();


                $.ajax({
                    type: "POST",
                    url: "newuser.php",
                    data: "number=" + contact + "&pwd=" + password + "&name=" + username + "&email=" + email + "&type=1",
                    async:false,

                    success: function (html) {
                        
                              Materialize.toast('New user created', 4000);
                        
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

                    <span class="card-title black-text">Sign Up</span>
                    <form id="loginForm" class="col s12" method="post" action="#">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" name="name" required>
                                <label for="name">Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="contact" type="text" name="contact" required>
                                <label for="contact">Contact</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" type="text" name="email" required>
                                <label for="email">Email</label>
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
                    <div class="row"><div class="col offset-s2">Already a member?<a href="index.php">Sign In</a></div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <!-- <script type="text/javascript" src="js/prism.js"></script>-->
    <script type="text/javascript" src="js/materialize.js"></script>
</body>



</html>
