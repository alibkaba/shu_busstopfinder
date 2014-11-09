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

function Connect_to_DB(){

}
// End: Database Connection Unit Test
function Validate_Ajax_Request() {
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
		Is_Action_Valid(return);
	}	
}

[0]
$action
$action {schoolid: "1" Address: "1111 strat", School: "bjach" schoolid: "2" Address: "1111 strat", School: "bjach" 
function Is_Action_Valid(){
	if (isset($_POST["action"]) && !empty($_POST["action"])){
		$action = $_POST["action"];
		DB_Operation($action);
	}
}

function DB_Operation($action){
	echo $action;
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
			case "UpdateCoordinates": UpdateCoordinates();
			break;
			case "DeleteCoordinates": DeleteCoordinates();
			break;
		}
}
/*
if (Incoming_Ajax()) {
	if (isset($_POST["action"]) && !empty($_POST["action"])) {
		$action = $_POST["action"];
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
			case "UpdateCoordinates": UpdateCoordinates();
			break;
			case "DeleteCoordinates": DeleteCoordinates();
			break;
		}
	}
}
*/
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
?>