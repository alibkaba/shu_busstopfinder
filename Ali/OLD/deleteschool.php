<?php
//http://www.w3schools.com/php/php_ajax_database.asp
include('db.php');
// Gets the value from the URL (will change to POST later on)
$Delete_School_ID_Value = $_GET["schoolid"];

// DB Query (create stored procedure)
$getDistrict = $PDOconn->prepare('DELETE FROM SCHOOLS WHERE SCHOOL_ID = :Delete_School_ID_Value');
$getDistrict->bindParam(':Delete_School_ID_Value', $Delete_School_ID_Value, PDO::PARAM_INT);
$getDistrict->execute();

// Notification delete was a success
echo "The school was delete.";

// Closes DB connection
$PDOconn = null;
?>