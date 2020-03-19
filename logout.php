<?php
    //Logga ut och komma tillbaka till inloggningssidan
        session_unset();
        header("location:../admin/login.php");  

    //Rensar bort cookies
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
?>