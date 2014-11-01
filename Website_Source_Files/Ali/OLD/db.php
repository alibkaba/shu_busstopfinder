<?php
/* error_reporting(E_ALL); */
/* ini_set('display_errors', '1'); */
$h = "localhost";
$u = "djkabau1_admin";
$p = "k?h4F=g4Ra{O";
$db = "djkabau1_BUSTOP";
$mysqliconn = new mysqli($h, $u, $p, $db);
$PDOconn = new PDO('mysql:host=localhost;dbname=djkabau1_BUSTOP', $u, $p);
$PDOconn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
if ($mysqliconn->connect_errno) {
    echo "Oops some thing went wrong, failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
?>