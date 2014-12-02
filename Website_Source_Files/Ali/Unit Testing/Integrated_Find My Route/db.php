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
		case "Create": Create();
			break;
		case "Write": Write();
			break;
		case "Update": Update();
			break;
		case "Delete": Delete();
			break;
		case "Get_States": Get_States();
			break;
		case "Get_Districts": Get_Districts();
			break;
		case "Get_Schools": Get_Schools();
			break;
		case "Get_View_All_Buses": Get_View_All_Buses();
			break;
		case "Get_Bus_Stop_Numbers": Get_Bus_Stop_Numbers();
			break;
		case "Get_Bus_Stop_Details": Get_Bus_Stop_Details();
			break;
		case "Geocode_PHP": Geocode_PHP();
			break;
		case "Cal_Distance_PHP": Cal_Distance_PHP();
			break;
		case "Get_Login": Get_Login();
			break;
		case "Create_State": Create_State();
			break;
		case "Create_District": Create_District();
			break;
		case "Create_School": Create_School();
			break;
		case "Create_Bus_Stop_Number": Create_Bus_Stop_Number();
			break;
		case "Create_Bus_Stop_Detail": Create_Bus_Stop_Detail();
			break;
		case "Get_State_Data": Get_State_Data();
			break;
		case "Get_District_Data": Get_District_Data();
			break;
		case "Get_School_Data": Get_School_Data();
			break;
		case "Get_Bus_Stop_Number_Data": Get_Bus_Stop_Number_Data();
			break;
		case "Get_Bus_Stop_Detail_Data": Get_Bus_Stop_Detail_Data();
			break;
		case "Update_State": Update_State();
			break;
		case "Update_District": Update_District();
			break;
		case "Update_School": Update_School();
			break;
		case "Update_Bus_Stop_Number": Update_Bus_Stop_Number();
			break;
		case "Update_Bus_Stop_Detail": Update_Bus_Stop_Detail();
			break;
		case "Delete_State": Delete_State();
			break;
		case "Delete_District": Delete_District();
			break;
		case "Delete_School": Delete_School();
			break;
		case "Delete_Bus_Stop_Number": Delete_Bus_Stop_Number();
			break;
		case "Delete_Bus_Stop_Detail": Delete_Bus_Stop_Detail();
			break;
	}
}

//create object for each. name the class what the strings are.
//classes instead of cases.
function Create(){
	global $PDOconn;

	$Query = 'DROP TABLE IF EXISTS `djkabau1_BUSTOP`.`SEASONS` ;
CREATE TABLE IF NOT EXISTS `djkabau1_BUSTOP`.`SEASONS` (
  `SEASONS_ID` INT NOT NULL AUTO_INCREMENT,
  `SEASONS` VARCHAR(45) NULL,
  PRIMARY KEY (`SEASONS_ID`))
ENGINE = InnoDB;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Write(){
	global $PDOconn;
	$New_Season = stripslashes($_POST["New_Season"]);

	$Query = 'INSERT INTO USERS (SEASONS) VALUES (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $New_Season, PDO::PARAM_STR, 45);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update(){
	global $PDOconn;
	$New_Season = stripslashes($_POST["New_Season"]);
	$Old_Season = stripslashes($_POST["Old_Season"]);

	$Query = 'UPDATE SEASONS SET SEASONS = (?) WHERE SEASONS = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $New_Season, PDO::PARAM_STR, 45);
	$Statement->bindParam(2, $Old_Season, PDO::PARAM_STR, 45);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Delete(){
	global $PDOconn;

	$Query = 'DROP TABLE IF EXISTS `djkabau1_BUSTOP`.`SEASONS` ;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_States(){
	global $PDOconn;

	$Query = 'SELECT * FROM STATES ORDER BY STATE_NAME;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Districts(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'SELECT * FROM DISTRICTS WHERE STATE_ID = (?) ORDER BY DISTRICT_NAME;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Schools(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'SELECT * FROM SCHOOLS WHERE DISTRICT_ID = (?) ORDER BY SCHOOL_NAME;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_View_All_Buses(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'SELECT x.BUS_STOP_NUMBER, y.BUS_STOP_TIME, y.BUS_STOP_ADDRESS FROM BUS_STOPS_NUMBERS x INNER JOIN BUS_STOPS_DETAILS y on y.BUS_STOP_NUMBER_ID = x.BUS_STOP_NUMBER_ID and x.SCHOOL_ID = (?) ORDER BY x.BUS_STOP_NUMBER;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Bus_Stop_Numbers(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'SELECT * FROM BUS_STOPS_NUMBERS WHERE SCHOOL_ID = (?) ORDER BY BUS_STOP_NUMBER;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Bus_Stop_Details(){
	global $PDOconn;
	$Bus_Stop_Number_ID = stripslashes($_POST["Bus_Stop_Number_ID"]);

	$Query = 'SELECT * FROM BUS_STOPS_DETAILS WHERE BUS_STOP_NUMBER_ID = (?) ORDER BY BUS_STOP_ADDRESS;';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Number_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Login(){
	global $PDOconn;
	$Email = stripslashes($_POST["Email"]);
	$Encrypted_Password = stripslashes($_POST["Encrypted_Password"]);

	$Query = 'SELECT * FROM USERS WHERE EMAIL = (?) AND ACC_PASS = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Email, PDO::PARAM_STR, 50);
	$Statement->bindParam(2, $Encrypted_Password, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response  = $Statement->rowCount();
	echo json_encode($Response);
	$PDOconn = null;
}

function Create_State(){
	global $PDOconn;
	$State_Name = stripslashes($_POST["State_Name"]);

	$Query = 'INSERT INTO STATES (STATE_NAME) VALUES (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_Name, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Create_District(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);
	$District_Name = stripslashes($_POST["District_Name"]);

	$Query = 'INSERT INTO DISTRICTS (STATE_ID,DISTRICT_NAME) VALUES  (?,?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $District_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Create_School(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);
	$School_Name = stripslashes($_POST["School_Name"]);
	$School_Address = stripslashes($_POST["School_Address"]);

	$Query = 'INSERT INTO SCHOOLS (DISTRICT_ID,SCHOOL_NAME,SCHOOL_ADDRESS) VALUES (?,?,?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $School_Name, PDO::PARAM_STR, 50);
	$Statement->bindParam(3, $School_Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Create_Bus_Stop_Number(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);
	$Bus_Stop_Number = stripslashes($_POST["Bus_Stop_Number"]);

	$Query = 'INSERT INTO BUS_STOPS_NUMBERS (SCHOOL_ID,BUS_STOP_NUMBER) VALUES (?,?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $Bus_Stop_Number, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Create_Bus_Stop_Detail(){
	global $PDOconn;
	$Bus_Stop_Number_ID = stripslashes($_POST["Bus_Stop_Number_ID"]);
	$Bus_Stop_Time = stripslashes($_POST["Bus_Stop_Time"]);
	$Bus_Stop_Address = stripslashes($_POST["Bus_Stop_Address"]);
	$Bus_Stop_Latitude = stripslashes($_POST["Bus_Stop_Latitude"]);
	$Bus_Stop_Longitude = stripslashes($_POST["Bus_Stop_Longitude"]);

	$Query = 'INSERT INTO BUS_STOPS_DETAILS (BUS_STOP_NUMBER_ID,BUS_STOP_TIME,BUS_STOP_ADDRESS,BUS_STOP_LATITUDE,BUS_STOP_LONGITUDE) VALUES (?,?,?,?,?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Number_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $Bus_Stop_Time, PDO::PARAM_STR, 50);
	$Statement->bindParam(3, $Bus_Stop_Address, PDO::PARAM_STR, 100);
	$Statement->bindParam(4, $Bus_Stop_Latitude, PDO::PARAM_STR, 100);
	$Statement->bindParam(5, $Bus_Stop_Longitude, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_State_Data(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'SELECT * FROM STATES WHERE STATE_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_District_Data(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'SELECT * FROM DISTRICTS WHERE DISTRICT_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_School_Data(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'SELECT * FROM SCHOOLS WHERE SCHOOL_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Bus_Stop_Number_Data(){
	global $PDOconn;
	$Bus_Stop_Number_ID = stripslashes($_POST["Bus_Stop_Number_ID"]);

	$Query = 'SELECT * FROM BUS_STOPS_NUMBERS WHERE BUS_STOP_NUMBER_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Number_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Get_Bus_Stop_Detail_Data(){
	global $PDOconn;
	$Bus_Stop_Detail_ID = stripslashes($_POST["Bus_Stop_Detail_ID"]);

	$Query = 'SELECT * FROM BUS_STOPS_DETAILS WHERE BUS_STOP_DETAIL_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Detail_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update_State(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);
	$New_State_Name = stripslashes($_POST["New_State_Name"]);

	$Query = 'UPDATE STATES SET STATE_NAME = (?) WHERE STATE_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_State_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update_District(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);
	$New_District_Name = stripslashes($_POST["New_District_Name"]);

	$Query = 'UPDATE DISTRICTS SET DISTRICT_NAME = (?) WHERE DISTRICT_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_District_Name, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update_School(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);
	$New_School_Name = stripslashes($_POST["New_School_Name"]);
	$New_School_Address = stripslashes($_POST["New_School_Address"]);

	$Query = 'UPDATE SCHOOLS SET SCHOOL_NAME = (?), SCHOOL_ADDRESS = (?) WHERE SCHOOL_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_School_Name, PDO::PARAM_STR, 50);
	$Statement->bindParam(3, $New_School_Address, PDO::PARAM_STR, 100);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update_Bus_Stop_Number(){
	global $PDOconn;
	$Bus_Stop_Number_ID = stripslashes($_POST["Bus_Stop_Number_ID"]);
	$New_Bus_Stop_Number = stripslashes($_POST["New_Bus_Stop_Number"]);

	$Query = 'UPDATE BUS_STOPS SET BUS_STOP_NUMBER = (?) WHERE BUS_STOP_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Number_ID, PDO::PARAM_INT);
	$Statement->bindParam(2, $New_Bus_Stop_Number, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Update_Bus_Stop_Detail(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);
	$Bus_Stop_Number = stripslashes($_POST["Bus_Stop_Number"]);
	$Bus_Stop_Time = stripslashes($_POST["Bus_Stop_Time"]);
	$Bus_Stop_Address = stripslashes($_POST["Bus_Stop_Address"]);
	$Bus_Stop_Latitude = stripslashes($_POST["Bus_Stop_Latitude"]);
	$Bus_Stop_Longitude = stripslashes($_POST["Bus_Stop_Longitude"]);

	$Query = 'CALL UPDATE_BUS_STOP_DETAIL (?,?,?,?,?,?)';
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
	$PDOconn = null;
}

function Delete_State(){
	global $PDOconn;
	$State_ID = stripslashes($_POST["State_ID"]);

	$Query = 'DELETE FROM STATES WHERE STATE_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Delete_District(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'DELETE FROM DISTRICTS WHERE DISTRICT_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Delete_School(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'DELETE FROM SCHOOLS WHERE SCHOOL_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Delete_Bus_Stop_Number(){
	global $PDOconn;
	$Bus_Stop_Number_ID = stripslashes($_POST["Bus_Stop_Number_ID"]);

	$Query = 'DELETE FROM BUS_STOPS_NUMBERS WHERE BUS_STOP_NUMBER_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Number_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
}

function Delete_Bus_Stop_Detail(){
	global $PDOconn;
	$Bus_Stop_Detail_ID = stripslashes($_POST["Bus_Stop_Detail_ID"]);

	$Query = 'DELETE FROM BUS_STOPS_DETAILS WHERE BUS_STOP_DETAIL_ID = (?);';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Bus_Stop_Detail_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Response = $Statement->fetchAll();
	echo json_encode($Response);
	$PDOconn = null;
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
        echo json_encode($response['status']);
    }
}

function Cal_Distance_PHP(){
	$API_KEY =AIzaSyBHummubX5vjuFy_QwzcXfDHzuOtmk3xUU;
	$mode = walking;
	
    $User_Address = stripslashes($_POST["User_Address"]);
    $start = urlencode($User_Address);
	$Bus_Stop_Address = stripslashes($_POST["Bus_Stop_Address"]);
    $end = urlencode($Bus_Stop_Address);
	
    $url = "https://maps.googleapis.com/maps/api/distancematrix/json?sensor=false&origins=$start&destinations=$end&mode=$mode&units=imperial";
    $resp_json = file_get_contents($url);
    $response = json_decode($resp_json, true);

    if($response['status']='OK'){
		$distance = $response['rows'][0]['elements'][0]['distance']['text'];
        echo json_encode($distance);
        /*if($distance){

			 echo json_encode($distance);
             
        }else{
            echo json_encode("Distance not returned properly?");
        }*/
         
    }else{
        echo json_encode($response['status']);
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