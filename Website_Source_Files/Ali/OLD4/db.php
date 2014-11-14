<?php
$dsn = "mysql:host=localhost;dbname=djkabau1_BUSTOP";
$u = "djkabau1_busstop";
$p = ",&O%9{A3d0*v";
//$u = "djkabau1_admin";
//$p = "E!o0)nd?5)B2";
$PDOconn = new PDO($dsn, $u, $p);
try {
    $PDOconn = new PDO($dsn, $u, $p);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

function Incoming_Ajax() {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if (Incoming_Ajax()) {
	if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
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