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
		case "Read_Bus_Stops": Read_Bus_Stops();
		break;
		case "Read_Coordinates": Read_Coordinates();
		break;
		case "Write_Coordinates": Write_Coordinates();
		break;
		case "Delete_Coordinates": Delete_Coordinates();
		break;
		case "Read_Distances": Read_Distances();
		break;
		case "Write_Distances": Write_Distances();
		break;
		case "Delete_Distances": Delete_Distances();
		break;
	}
}
function Read_Bus_Stops(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL READ_BUS_STOPS (:School_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':School_ID', School_ID, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Coordinates_Data = $Statement->fetchAll();
	echo json_encode($Coordinates_Data);
}

function Read_Coordinates(){
	global $PDOconn;
	$Address = stripslashes($_POST["Address"]);

	$Query = 'CALL READ_COORDINATES (:Address)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Address', $Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Coordinates_Data = $Statement->fetchAll();
	echo json_encode($Coordinates_Data);
}

function Write_Coordinates(){
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

function Delete_Coordinates(){
	global $PDOconn;
	$Coordinates_ID = stripslashes($_POST["Coordinates_ID"]);

	$Query = 'CALL DELETE_COORDINATES (:Coordinates_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Coordinates_ID', $Coordinates_ID, PDO::PARAM_STR, 100);
	$Statement->execute();
}

function Read_Distances(){
	global $PDOconn;
	$User_Address = stripslashes($_POST["User_Address"]);

	$Query = 'CALL READ_DISTANCES (:User_Address)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':User_Address', $User_Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Distances_Data = $Statement->fetchAll();
	echo json_encode($Distances_Data);
}

function Write_Distances(){
	global $PDOconn;
	$Bus_Number = stripslashes($_POST["Bus_Number"]);
	$Bus_Stop_Time = stripslashes($_POST["Bus_Stop_Time"]);
	$Bus_Stop_Address = stripslashes($_POST["Bus_Stop_Address"]);
	$User_Address = stripslashes($_POST["User_Address"]);
	$Distances = stripslashes($_POST["Distances"]);

	$Query = 'CALL WRITE_DISTANCES (:Bus_Number, :Bus_Stop_Time, :Bus_Stop_Address, :User_Address, :Distances)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Bus_Number', $Bus_Number, PDO::PARAM_STR, 100);
	$Statement->bindParam(':Bus_Stop_Time', $Bus_Stop_Time, PDO::PARAM_INT, 50);
	$Statement->bindParam(':Bus_Stop_Address', $Bus_Stop_Address, PDO::PARAM_INT, 100);
	$Statement->bindParam(':User_Address', $User_Address, PDO::PARAM_INT, 100);
	$Statement->bindParam(':Distances', $Distances, PDO::PARAM_INT, 100);
	$Statement->execute();
}

function Delete_Distances(){
	global $PDOconn;
	$Distances_ID = stripslashes($_POST["Distances_ID"]);

	$Query = 'CALL DELETE_DISTANCES (:Distances_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':Distances_ID', $Distances_ID, PDO::PARAM_STR, 100);
	$Statement->execute();
}
?>