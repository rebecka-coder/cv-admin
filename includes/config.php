<?php
    $site_title = "Projekt CV";
    $divider = " | ";
    $page_title = "Admin";

// Aktivera felrapportering
error_reporting(-1);
ini_set("display_errors", 1);

//DB-inställningar
define('DBHOST', "");
define('DBUSER', "");
define('DBPASS', "");
define('DBDATABASE', "");

//Start session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>