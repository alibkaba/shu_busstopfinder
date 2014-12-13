<?php
//http://www.w3schools.com/php/php_ajax_database.asp
include('db.php');
// Gets the value from the URL (will change to POST later on)
$School_ID_Value = $_GET["schoolid"];

// DB Query (create stored procedure)
$getBusstop = $PDOconn->prepare('SELECT BUS_NUMBER, BUS_STOP_ADDRESS, BUS_STOP_TIME FROM BUSSTOPS where SCHOOL_ID = :School_ID_Value');
$getBusstop->bindParam(':School_ID_Value', $School_ID_Value, PDO::PARAM_INT);
$getBusstop->execute();

// Bus list
$bus_detail = array();
$rows = $getBusstop->fetchAll();
foreach ($rows as $row){
	$bus_detail[] = "Bus Number: {$row['BUS_NUMBER']}<br>Bus Stop Address: {$row['BUS_STOP_ADDRESS']}<br>Bus Stop Time: {$row['BUS_STOP_TIME']}<br><br>";
}
echo implode("", $bus_detail);

// Closes DB connection
$PDOconn = null;
?>