<!--Projektuppgift CV adminsida, av Rebecka Högström VT-20 -->
<!DOCTYPE html>
<html lang="sv-SE">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" type="text/css"  href="css/style.css">

    <title>Administration</title>
</head>
<?php
    include("includes/config.php");
    
    //Kontroll för användarnamn och lösenord.
    if(isset($_POST['username'])) { 
        //Lagrar username och password i variabler
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        //Kontroll om username är admin och password är password
        if($username == "admin" && $password == "password") {
            //En session för "secret" skapas
            $_SESSION['username'] = $username;
            header("location: secret.php"); //Skickas till inloggad sida
        } else {
            //Skriver ut felmeddelande
            $message = "<p class='error_message'>Felaktigt användarnamn/lösenord!</p>";
        }
    }
?>
    <body>

    <h2>Inloggning</h2>

    <div class="container">

        <!--Formulär för inloggnin-->
        <div class="login">
        <form method="post" action="login.php">
            <label for="username">Användarnamn:</label><br>
            <input type="text" id="username" name="username"><br>
            <label for="password">Lösenord:</label><br>
            <input type="text" id="password" name="password"><br><br>
            <input type="submit" value="Submit">
        </form> 
    </div>
    </div><!--Slut på container-->  
 
</body>
</html>