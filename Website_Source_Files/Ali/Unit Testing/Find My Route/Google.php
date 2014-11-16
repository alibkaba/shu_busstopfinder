<?php

Validate_Ajax_Request();

function Validate_Ajax_Request() {
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
		Validate_action();
	}	
}

function Validate_action(){
	if (isset($_POST["action"]) && !empty($_POST["action"])) {
		$action = $_POST["action"];
		Operation($action);
	}
}

function Operation($action){
	switch($action) {
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


function Geocode_PHP(){

	
	
	$Address1 = stripslashes($_POST["Address"]);
   $string = str_replace (" ", "+", urlencode($Address1));
   $details_url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$string."&sensor=false";
 
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $details_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $response = json_decode(curl_exec($ch), true);
 
   // If Status Code is ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED or INVALID_REQUEST
   if ($response['status'] != 'OK') {
		return null;
   }
 
	//print_r($response);
   $geometry = $response['results'][0]['geometry'];
 
    $longitude = $geometry['location']['lat'];
    $latitude = $geometry['location']['lng'];
 
    $array = array(
        'Latitude' => $geometry['location']['lat'],
        'Longitude' => $geometry['location']['lng'],
    );
 
    echo json_encode($array);
 
}
 
?>
