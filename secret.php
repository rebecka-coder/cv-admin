<?php
    include("includes/config.php");
    include("includes/header.php");

    //Hämta användare om den finns
    if(isset($_SESSION['username'])) {
        $id = $_SESSION['username'];
        } else {
        header("Location: login.php"); //Annars skickas man tillbaka till loginsidan
        }
?>
        <h2>Administration CV</h2>
        
    </div><!--Slut på container-->
</body>
</html>


