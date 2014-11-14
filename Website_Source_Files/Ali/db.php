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
		case "Get_States": Get_States();
		break;
		case "Get_Districts": Get_Districts();
		break;
		case "Get_Schools": Get_Schools();
		break;
		case "Get_BusStops": Get_BusStops();
		break;
		case "Log_In": LogIn();
		break;
		case "Read_Coordinates": Read_Coordinates();
		break;
		case "Write_Coordinates": Write_Coordinates();
		break;
		case "Delete_Coordinates": Delete_Coordinates();
		break;
	}
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
?>