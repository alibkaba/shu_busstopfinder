<?php
// Start: Database Connection Unit Test
$dsn = "mysql:host=localhost;dbname=djkabau1_BUSTOP";
$u = "djkabau1_busstop";
$p = "-E&805Wzy&@b";
$PDOconn = new PDO($dsn, $u, $p);
try {
    $PDOconn = new PDO($dsn, $u, $p);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
// End: Database Connection Unit Test

function Incoming_Ajax() {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if (Incoming_Ajax()) {
	if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
		$action = $_POST["action"];
		switch($action) {
			case "ReadCoordinates": ReadCoordinates();
			break;
		switch($action) {
			case "WriteCoordinates": WriteCoordinates();
			break;
		switch($action) {
			case "UpdateCoordinates": UpdateCoordinates();
			break;
		switch($action) {
			case "DeleteCoordinates": DeleteCoordinates();
			break;
		}
	}
}

function ReadCoordinates(){
	global $PDOconn;
}

function WriteCoordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);
	$Latitude = stripslashes($_POST["Latitude"]);
	$Longitude = stripslashes($_POST["Longitude"]);

	$Query = 'CALL WRITE_COORDINATES (:Address, :Latitude, :Longitude)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Address', $Address, PDO::PARAM_STR, 100);
	$Statement->bindParam(':Latitude', $Latitude, PDO::PARAM_STR, 100);
	$Statement->bindParam(':Longitude', $Longitude, PDO::PARAM_STR, 100);
	$Statement->execute();
}

function UpdateCoordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);
	$Latitude = stripslashes($_POST["Latitude"]);
	$Longitude = stripslashes($_POST["Longitude"]);
}

function DeleteCoordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);
	$Latitude = stripslashes($_POST["Latitude"]);
	$Longitude = stripslashes($_POST["Longitude"]);
}

?>