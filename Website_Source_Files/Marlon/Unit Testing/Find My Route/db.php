<?php
// ------------------------------------------Ali coded items BELOW --------------------------------//

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
		case "Read_States": Read_States();
		break;
		case "Read_Districts": Read_Districts();
		break;
		case "Read_Schools": Read_Schools();
		break;
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
		case "Geocode_PHP": Geocode_PHP();
		break;
	}
}

//create object for each. name the class what the strings are.
//classes instead of cases.


function Read_States(){
	global $PDOconn;

	$Query = 'CALL READ_STATES';
	$Statement = $PDOconn->prepare($Query);
	$Statement->execute();
	$States_Data = $Statement->fetchAll();
	echo json_encode($States_Data);
}

function Read_Districts(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'CALL READ_DISTRICTS (:State_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':State_ID', $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Districts_Data = $Statement->fetchAll();
	echo json_encode($Districts_Data);
}

function Read_Schools(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'CALL READ_SCHOOLS (:District_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':District_ID', $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Schools_Data = $Statement->fetchAll();
	echo json_encode($Schools_Data);
}

function Read_Bus_Stops(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL READ_BUS_STOPS (:School_ID)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(':School_ID', $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Bus_Stops_Data = $Statement->fetchAll();
	echo json_encode($Bus_Stops_Data);
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
	$Statement->bindParam(':Coordinates_ID', $Coordinates_ID, PDO::PARAM_INT);
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
	$Statement->bindParam(':Distances_ID', $Distances_ID, PDO::PARAM_INT);
	$Statement->execute();
}

// ------------------------------------------Ali coded items ABOVE --------------------------------//

// ------------------------------------------Marlon coded items BELOW --------------------------------//

function Geocode_PHP(){
 
    $Address1 = stripslashes($_POST["Address"]);
    $address = urlencode($Address1);
    $url = "http://maps.google.com/maps/api/geocode/json?sensor=false&address={$address}";
     $resp_json = file_get_contents($url);
    $response = json_decode($resp_json, true);

    if($response['status']='OK'){
        $latitude = $response['results'][0]['geometry']['location']['lat'];
        $longitude = $response['results'][0]['geometry']['location']['lng'];
        $formatted_address = $response['results'][0]['formatted_address'];
         
        if($latitude && $longitude && $formatted_address){
         	$array = array(
				'Latitude' => $latitude,
				'Longitude' => $longitude,
				'Status' => $response['status'],
			);
			 echo json_encode($array);
             
        }else{
            return false;
        }
         
    }else{
        echo json_encode($resp['status']);
    }
}

function Geocode_PHP1(){
	$Address1 = stripslashes($_POST["Address"]);
   $string = str_replace (" ", "+", urlencode($Address1));
   $details_url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$string."&sensor=false";
 
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $details_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $response = json_decode(curl_exec($ch), true);
 
   // If Status Code is ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED or INVALID_REQUEST
   if ($response['status'] != 'OK') {
     $array = array('Status' => $response['status'],
    );
		echo json_encode($array);
   }
    $geometry = $response['results'][0]['geometry'];
    $longitude = $geometry['location']['lat'];
    $latitude = $geometry['location']['lng'];
    $array = array(
        'Latitude' => $latitude,
        'Longitude' => $longitude,
		'Status' => $response['status'],
    );
     echo json_encode($array);
 }





// ------------------------------------------Marlon coded items ABOVE --------------------------------//


?>