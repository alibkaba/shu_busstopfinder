<?php
// Start: Database Connection
// Put this in a function/class of some sort
$dsn = "mysql:host=localhost;dbname=djkabau1_BUSTOP";
$u = "djkabau1_busstop";
$p = "-E&805Wzy&@b";
$PDOconn = new PDO($dsn, $u, $p);
try {
    $PDOconn = new PDO($dsn, $u, $p);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
// End: Database Connection

Validate_Ajax_Request();

function Validate_Ajax_Request() {
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
		Validate_action();
	}	
}

function Validate_action(){
	if (isset($_POST["action"]) && !empty($_POST["action"])) {
		$action = $_POST["action"];
		DB_Operation($action);
	}
}

function DB_Operation($action){
	switch($action) {
		case "GetStates": GetStates();
		break;
		case "GetDistricts": GetDistricts();
		break;
		case "GetSchools": GetSchools();
		break;
		case "GetBusStops": GetBusStops();
		break;
		case "LogIn": LogIn();
		break;
		case "ReadCoordinates": ReadCoordinates();
		break;
		case "WriteCoordinates": WriteCoordinates();
		break;
		case "DeleteCoordinates": DeleteCoordinates();
		break;
	}
}

function ReadCoordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);

	$Query = 'CALL READ_COORDINATES (:Address)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Address', $Address, PDO::PARAM_STR, 100);
	$Statement->execute();
}

function WriteCoordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);
	$Latitude = stripslashes($_POST["Latitude"]);
	$Longitude = stripslashes($_POST["Longitude"]);

	$Query = 'CALL WRITE_COORDINATES (:Address, :Latitude, :Longitude)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Address', $Address, PDO::PARAM_STR, 100);
	$Statement->bindParam(':Latitude', $Latitude, PDO::PARAM_INT, 100);
	$Statement->bindParam(':Longitude', $Longitude, PDO::PARAM_INT, 100);
	$Statement->execute();
}

function DeleteCoordinates(){
	global $PDOconn;
	$Coordinates_ID = stripslashes($_POST["Coordinates_ID"]);

	$Query = 'CALL DELETE_COORDINATES (:Coordinates_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Coordinates_ID', $Coordinates_ID, PDO::PARAM_STR, 100);
	$Statement->execute();
}
?>