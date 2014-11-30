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
		case "Geocode_PHP": Geocode_PHP();
		break;
		case "Read_Login": Read_Login();
		break;
		case "Create_State": Create_State();
		break;
		case "Create_District": Create_District();
		break;
		case "Create_School": Create_School();
		break;
		case "Create_Bus_Stop": Create_Bus_Stop();
		break;
		case "Get_State_Data": Get_State_Data();
		break;
		case "Get_District_Data": Get_District_Data();
		break;
		case "Get_School_Data": Get_School_Data();
		break;
		case "Get_Bus_Stop_Data": Get_Bus_Stop_Data();
		break;
		case "Update_State": Update_State();
		break;
		case "Update_District": Update_District();
		break;
		case "Update_School": Update_School();
		break;
		case "Update_Bus_Stop": Update_Bus_Stop();
		break;
		case "Delete_State": Delete_State();
		break;
		case "Delete_District": Delete_District();
		break;
		case "Delete_School": Delete_School();
		break;
		case "Delete_Bus_Stop": Delete_Bus_Stop();
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
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Read_Districts(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'CALL READ_DISTRICTS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Read_Schools(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'CALL READ_SCHOOLS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Read_Bus_Stops(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL READ_BUS_STOPS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Read_Login(){
	global $PDOconn;
	$Email = stripslashes($_POST["Email"]);
	$Encrypted_Password = stripslashes($_POST["Encrypted_Password"]);
	
	$Query = 'CALL READ_LOGIN (?, ?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Email, PDO::PARAM_STR, 50);
	$Statement->bindParam(2, $Encrypted_Password, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response  = $Statement->rowCount();
	echo json_encode($Response);
}

function Create_State(){
	global $PDOconn;
	$State_Name = stripslashes($_POST["State_Name"]);

	$Query = 'CALL CREATE_STATE (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_Name, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Create_District(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);
	$District_Name = stripslashes($_POST["District_Name"]);

	$Query = 'CALL CREATE_DISTRICT (?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $District_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Create_School(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);
	$School_Name = stripslashes($_POST["School_Name"]);
	$School_Address = stripslashes($_POST["School_Address"]);

	$Query = 'CALL CREATE_SCHOOL (?,?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $School_Name, PDO::PARAM_STR, 50);
	$Statement->bindParam(3, $School_Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Create_Bus_Stop(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);
	$Bus_Stop_Number = stripslashes($_POST["Bus_Stop_Number"]);
	$Bus_Stop_Time = stripslashes($_POST["Bus_Stop_Time"]);
	$Bus_Stop_Address = stripslashes($_POST["Bus_Stop_Address"]);
	$Bus_Stop_Latitude = stripslashes($_POST["Bus_Stop_Latitude"]);
	$Bus_Stop_Longitude = stripslashes($_POST["Bus_Stop_Longitude"]);
	
	$Query = 'CALL CREATE_BUS_STOP (?,?,?,?,?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $Bus_Stop_Number, PDO::PARAM_INT);
	$Statement->bindParam(3, $Bus_Stop_Time, PDO::PARAM_STR, 50);
	$Statement->bindParam(4, $Bus_Stop_Address, PDO::PARAM_STR, 100);
	$Statement->bindParam(5, $Bus_Stop_Latitude, PDO::PARAM_STR, 100);
	$Statement->bindParam(6, $Bus_Stop_Longitude, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Get_State_Data(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'CALL GET_STATE_DATA (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Get_District_Data(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'CALL GET_DISTRICT_DATA (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Get_School_Data(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL GET_SCHOOL_DATA (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Get_Bus_Stop_Data(){
	global $PDOconn;
	$Bus_Stop_ID = stripslashes($_POST["Bus_Stop_ID"]);

	$Query = 'CALL GET_BUS_STOP_DATA (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Update_State(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);
	$New_State_Name = stripslashes($_POST["New_State_Name"]);

	$Query = 'CALL UPDATE_STATE (?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_State_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Update_District(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);
	$New_District_Name = stripslashes($_POST["New_District_Name"]);

	$Query = 'CALL UPDATE_DISTRICT (?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_District_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Update_School(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);
	$New_School_Name = stripslashes($_POST["New_School_Name"]);
	$New_School_Address = stripslashes($_POST["New_School_Address"]);

	$Query = 'CALL UPDATE_SCHOOL (?,?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_School_Name, PDO::PARAM_STR, 50);
	$Statement->bindParam(3, $New_School_Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Update_Bus_Stop(){
	global $PDOconn;
	$Bus_Stop_ID = stripslashes($_POST["Bus_Stop_ID"]);
	$New_Bus_Stop_Number = stripslashes($_POST["New_Bus_Stop_Number"]);
	$New_Bus_Stop_Time = stripslashes($_POST["New_Bus_Stop_Time"]);
	$New_Bus_Stop_Address = stripslashes($_POST["New_Bus_Stop_Address"]);
	$New_Bus_Stop_Latitude = stripslashes($_POST["New_Bus_Stop_Latitude"]);
	$New_Bus_Stop_Longitude = stripslashes($_POST["New_Bus_Stop_Longitude"]);

	$Query = 'CALL UPDATE_BUS_STOP (?,?,?,?,?,?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_Bus_Stop_Number, PDO::PARAM_INT);
	$Statement->bindParam(3, $New_Bus_Stop_Time, PDO::PARAM_STR, 50);
	$Statement->bindParam(4, $New_Bus_Stop_Address, PDO::PARAM_STR, 100);
	$Statement->bindParam(5, $New_Bus_Stop_Latitude, PDO::PARAM_STR, 100);
	$Statement->bindParam(6, $New_Bus_Stop_Longitude, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Delete_State(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'CALL DELETE_STATE (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Delete_District(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'CALL DELETE_DISTRICT (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Delete_School(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL DELETE_SCHOOL (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
}

function Delete_Bus_Stop(){
	global $PDOconn;
	$Bus_Stop_ID = stripslashes($_POST["Bus_Stop_ID"]);

	$Query = 'CALL DELETE_BUS_STOP (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
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