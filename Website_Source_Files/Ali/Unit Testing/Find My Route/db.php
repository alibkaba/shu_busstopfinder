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
		case "Validate_Login": Validate_Login();
		break;
		case "Read_Accounts": Read_Accounts();
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

	$Query = 'CALL READ_DISTRICTS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $State_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Districts_Data = $Statement->fetchAll();
	echo json_encode($Districts_Data);
}

function Read_Schools(){
	global $PDOconn;
	$District_ID = stripslashes($_POST["District_ID"]);

	$Query = 'CALL READ_SCHOOLS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $District_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Schools_Data = $Statement->fetchAll();
	echo json_encode($Schools_Data);
}

function Read_Bus_Stops(){
	global $PDOconn;
	$School_ID = stripslashes($_POST["School_ID"]);

	$Query = 'CALL READ_BUS_STOPS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $School_ID, PDO::PARAM_INT);
	$Statement->execute();
	$Bus_Stops_Data = $Statement->fetchAll();
	echo json_encode($Bus_Stops_Data);
}

function Validate_Login(){
	global $PDOconn;
	$Email = stripslashes($_POST["Email"]);
	$Encrypted_Password = stripslashes($_POST["Encrypted_Password"]);
	
	$Query = 'CALL VALIDATE_LOGIN (?, ?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Email, PDO::PARAM_STR, 50);
	$Statement->bindParam(2, $Encrypted_Password, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Login_Data  = $Statement->rowCount();
	echo $Login_Data;
}

function Read_Accounts(){
	global $PDOconn;
	$Email = stripslashes($_POST["Email"]);
	
	$Query = 'CALL READ_ACCOUNTS (?)';
	$Statement = $PDOconn->prepare($Query);
	$Statement->bindParam(1, $Email, PDO::PARAM_STR, 50);
	$Statement->execute();
	$Accounts_Data = $Statement->rowCount();
	//echo Accounts_Data;
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